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

/**
 *
 * Написать бандл, который реализует общение с контроллерам через веб сокет
 * TODO: Должна быть возможность обойти авторизацию, т.е коннекте мы должны сразу авторизовать
 * TODO: либо долден быть определенный запрос, который авторизует, и авторизованный пользователь будет подставляться для всех запросов этого коннекта
 * TODO: обработать все ошибки подключения
 * TODO: написать сlient для js
 * TODO: при авторизации запоминать время жизни токена +
 *
 * Class StartServerCommand
 * @package App\Command
 */
class HttpServerCommand extends Command
{
    use LoggerAwareTrait;
    use HttpServerHandlerTrait;
    use WorkermanCommandTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'raketman:async-http-server';

    protected function configure()
    {
        $this
            ->setDescription('запуск http сервера')
            ->setHelp('Команда запускает http сервер')
            ->configureParameters()
            ->addOption('port', null, InputOption::VALUE_OPTIONAL, 'Порт, который слушает вебсервер', '9502')
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
        $this->init();
        // #### http worker ####
        $httpWorker = new WorkerAdapter(sprintf('http://%s:%s', $input->getOption('host'), $input->getOption('port')));
        $httpWorker->count = $input->getOption('worker-count');

        // TODO: check TcpConnection::$maxPackageSize = 1024000;
        // TODO: непонтяно как ограничииь количество обраьоток одним воркером, разобраться
        // TODO: попробовать ROADRUNNER на имеюмся интерафес

        // TOOD NGINX + this server для обработки статики

        $httpWorker->onWorkerStart = function(WorkerAdapter $worker)
        {
            // Иницилизируем обработчик
            $handler = clone $this->handler;
            $handler->init();
            self::$handlers[$worker->id]  = $handler;
        };

        // Обработка запроса
        $httpWorker->onMessage = function(TcpConnection $connection, $data)
        {
            try {
                $connection->send($this->getHandler($connection->worker)->handle($this->createConnection($connection), $data));
            } catch (\Throwable $throwable) {
                $exception = new OnMessageServerException($throwable->getMessage(), $throwable->getCode(), $throwable);
                $this->getHandler($connection->worker)->error($this->createConnection($connection), $exception);
            }
        };

        $httpWorker->onError = function(TcpConnection $connection, $code, $msg)
        {
            $exception = new ServerException($msg, $code);

            $this->getHandler($connection->worker)->error($this->createConnection($connection), $exception);
        };

        $this->start($input);
    }
}