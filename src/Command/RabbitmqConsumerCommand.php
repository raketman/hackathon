<?php

namespace App\Command;

use App\Exception\OnMessageServerException;
use App\Exception\ServerException;
use App\Helper\HttpServerHandlerTrait;
use App\Helper\WorkermanCommandTrait;
use App\Lib\WorkerAdapter;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Workerman\Connection\TcpConnection;
use Workerman\Worker;


class RabbitmqConsumerCommand extends Command
{
    use LoggerAwareTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'raketman:startr-abbitmq-consumer';

    protected function configure()
    {
        $this
            ->setDescription('запуск всех консумеров из конфиг файла')
            ->setHelp('Команда всех консумеров из конфиг файла')
            ->addOption('config', null, InputOption::VALUE_REQUIRED, 'Путь к конфигу')
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
        // TODO: что-то делаем
    }
}