<?php

namespace App\Helper;

use App\Exception\ServerException;
use App\Handler\HttpHandlerInterface;
use App\Handler\WebsocketHandlerInterface;
use App\Lib\WorkerAdapter;
use Psr\Log\NullLogger;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Workerman\Connection\TcpConnection;
use Workerman\Worker;

/**
 * Trait WorkermanCommandTrait
 * @package App\Helper
 *
 */
trait WorkermanCommandTrait
{
    /**
     * @var HttpHandlerInterface|WebsocketHandlerInterface
     */
    static $handlers = [];

    /**
     * @throws ServerException
     */
    protected function init()
    {
        if (!$this->handler) {
            throw new ServerException('Не определен обработчик', 500);
        }

        try {
            $this->handler->init();
        } catch (\Throwable $throwable) {
            $exception = new ServerException($throwable->getMessage(), $throwable->getCode(), $throwable);
            $this->handler->error($exception);
        }
    }

    /**
     * @return $this
     */
    protected function configureParameters()
    {
        $this
            ->addArgument('action',InputArgument::REQUIRED,  'start/stop')
            ->addOption('host', null, InputOption::VALUE_OPTIONAL, 'Хост, который слушает вебсервер', '0.0.0.0')
            ->addOption('debug', null, InputOption::VALUE_OPTIONAL, 'Режим отладки', '0')
            ->addOption('worker-count', null, InputOption::VALUE_OPTIONAL, 'Количество воркеров', 4)
            ->addOption('run-dir', null, InputOption::VALUE_REQUIRED, 'Путь до run-файлов');

        if ($this->logger) {
            $this->setLogger(new NullLogger());
        }

        return $this;

    }

    /**
     * @param InputInterface $input
     */
    protected function start(InputInterface $input)
    {
        //TODO: доработать режимы запуска https://github.com/walkor/workerman-manual/blob/master/english/src/SUMMARY.md

        // Определяем режим запуска
        if ($input->getArgument('action') === 'start') {
            // Переопределим команды
            $GLOBALS['argv'][0] = self::$defaultName;
            $GLOBALS['argv'][1] = 'start';

            // Режим отдлаки
            if (!$input->getOption('debug')) {
                $GLOBALS['argv'][2] = '-d';
            } else {
                unset($GLOBALS['argv'][2]);
            }
        } else {
            $GLOBALS['argv'][0] = self::$defaultName;
            $GLOBALS['argv'][1] = 'stop';
        }

        // Проверим директорию
        if(!is_dir($input->getOption('run-dir')) && !mkdir($input->getOption('run-dir'), 0755, true) && !is_dir($input->getOption('run-dir'))) {
            throw new ServerException('Не удалось проверить директортию запуска: ' . error_get_last()['message'], 500);
        }

        // запускаем
        WorkerAdapter::$logger = $this->logger;
        WorkerAdapter::$runDir = $input->getOption('run-dir');
        WorkerAdapter::runAll();
    }


    protected function createConnection(TcpConnection $connection)
    {
        // TODO: metadata, попробоывать получить
        return new Connection($connection->id, $connection->worker->id, []);
    }


    /**
     * @param Worker $worker
     * @return HttpHandlerInterface|WebsocketHandlerInterface
     */
    protected function getHandler(Worker $worker)
    {
        return self::$handlers[$worker->id];
    }
}