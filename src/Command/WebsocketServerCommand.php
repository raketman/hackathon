<?php

namespace App\Command;

use App\Exception\OnCloseServerException;
use App\Exception\OnConnectServerException;
use App\Exception\OnMessageServerException;
use App\Exception\ServerException;
use App\Helper\WebsocketServerHandlerTrait;
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
class WebsocketServerCommand extends Command
{
    use LoggerAwareTrait;
    use WebsocketServerHandlerTrait;
    use WorkermanCommandTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'raketman:async-websocket-server';

    protected function configure()
    {
        $this
            ->setDescription('запуск websocket сервера')
            ->setHelp('Команда запускает websocket сервер')
            ->configureParameters()
            ->addOption('port', null, InputOption::VALUE_OPTIONAL, 'Порт, который слушает вебсервер', '9501')
        ;
    }
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->init();

        // #### http worker ####
        $httpWorker = new WorkerAdapter(sprintf('websocket://%s:%s', $input->getOption('host'), $input->getOption('port')));
        $httpWorker->count = $input->getOption('worker-count');


        $httpWorker->onWorkerStart = function(WorkerAdapter $worker)
        {
            // Иницилизируем обработчик
            $handler = clone $this->handler;
            $handler->init();
            self::$handlers[$worker->id]  = $handler;
        };

        $httpWorker->onConnect = function (TcpConnection $connection) {
            try {
                $this->getHandler($connection->worker)->connect($this->createConnection($connection));
            } catch (\Throwable $throwable) {
                $exception = new OnConnectServerException($throwable->getMessage(), $throwable->getCode(), $throwable);
                $this->getHandler($connection->worker)->error($this->createConnection($connection), $exception);
            }
        };

        $httpWorker->onMessage = function (TcpConnection $connection, $data) {
            try {
                $connection->send($this->getHandler($connection->worker)->handle($this->createConnection($connection), $data));
            } catch (\Throwable $throwable) {
                $exception = new OnMessageServerException($throwable->getMessage(), $throwable->getCode(), $throwable);
                $this->getHandler($connection->worker)->error($this->createConnection($connection), $exception);
            }
        };

        $httpWorker->onClose  = function (TcpConnection $connection) {
            try {
                $this->getHandler($connection->worker)->close($this->createConnection($connection));
            } catch (\Throwable $throwable) {
                $exception = new OnCloseServerException($throwable->getMessage(), $throwable->getCode(), $throwable);
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