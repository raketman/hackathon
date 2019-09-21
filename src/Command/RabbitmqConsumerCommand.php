<?php

namespace App\Command;

use App\Exception\OnMessageServerException;
use App\Exception\ServerException;
use App\Helper\HttpServerHandlerTrait;
use App\Helper\WorkermanCommandTrait;
use App\Lib\WorkerAdapter;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\Process\Process;
use Symfony\Component\Yaml\Yaml;
use Workerman\Connection\TcpConnection;
use Workerman\Worker;


class RabbitmqConsumerCommand extends Command
{
    use LoggerAwareTrait;
    use ContainerAwareTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:consumers';

    protected function configure()
    {
        $this
            ->setDescription('запуск всех консумеров из конфиг файла')
            ->setHelp('Команда всех консумеров из конфиг файла')
            ->addArgument('action', InputArgument::REQUIRED, 'start/stop')
            ->addOption('config', null, InputOption::VALUE_REQUIRED, 'Путь к конфигу')
            ->addOption('timeout', null, InputOption::VALUE_OPTIONAL, 'Время выполнения', '1h')
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|void|null
     * @throws \Throwable
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $runFile = $this->container->getParameter('kernel.run_dir') . '/' . self::$defaultName;

        if ($input->getArgument('action') === 'stop') {
            $checkPidProcess = new Process(sprintf('kill -9 %s', file_get_contents($runFile)));
            $checkPidProcess->run();
            return;
        }

        // Проверим что процесс уже не запущен
        if ($this->isPidFileExists($runFile, $output)) {
            $output->writeln('Процесс уже запущен');
            return;
        }

        // Пробуем создать pid-файл
        if ( ! $this->createPidFile($runFile, $output)) {
            return;
        }

        $consumers = Yaml::parseFile($input->getOption('config'));

        /** @var Process[] $processList */
        $processList = [];

        foreach ($consumers['consumers'] as $consumer) {
            for($i = 0; $i < $consumer['count']; $i++) {
                $processList[] = new Process(sprintf(
                    'timeout=%s php %s/../bin/console rabbitmq:consumer %s %s',
                    $input->getOption('timeout'),
                    $this->container->getParameter('kernel.root_dir'),
                    $consumer['name'],
                    implode(' ', $consumer['options'])
                ));
            }
        }
        // Стартуем
        foreach ($processList as $process) {
            $process->start();
        }

        while(true) {
            // Проверяем работоспособность
            foreach ($processList as $process) {
                if ($process->isTerminated() || $process->isSuccessful()) {
                    $process->start();
                }
            }

            usleep(1000);
        }
    }

    protected function isPidFileExists($runFile, OutputInterface $output)
    {
        if (!is_readable($runFile)) {
            return false;
        }

        $file   = fopen($runFile, 'r');
        $pid    = fread($file, 5);
        fclose($file);


        $sourceFile = "/proc/{$pid}/cmdline";
        if (!is_readable($sourceFile)) {
            return false;
        }

        $block = file_get_contents($sourceFile);

        if (!empty($block) && false !== strpos($block, self::$defaultName)) {
            // Блок файл запущен
            return true;
        }

        return false;
    }

    protected function createPidFile($runFile, OutputInterface $output)
    {
        $myPid = sprintf('%d', getmypid());

        if ($file = fopen($runFile, 'w')) {
            fwrite($file, $myPid, strlen($myPid));
            fclose($file);
        } else {
            $output->writeln('Не удалось создать файл процесса');
            return false;
        }

        chmod($runFile, 0664);
        return true;
    }
}