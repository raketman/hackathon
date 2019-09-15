<?php

namespace App\Command;

use App\Kernel;
use Psr\Log\LoggerAwareTrait;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Request;

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
class StartServerCommand extends Command
{
    use LoggerAwareTrait;

    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:create-server';

    protected function configure()
    {
        $this
            // the short description shown while running "php bin/console list"
            ->setDescription('Start a new server.')

            // the full command description shown when running the command with
            // the "--help" option
            ->setHelp('This command allows you to create a user...');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);

        $server = new \swoole_http_server("localhost", 9501);

        $server->set(['worker_num' => 5]);

        $server->on('request', function ($request, $response) use ($kernel) {

            $starttime = microtime(true);
            $this->log('start', [$request->fd]);

            $this->log('process', [$request->fd]);
            $response->end($this->processRequest($kernel, $request));
            $this->log('end', ['exec_time' => round(microtime(true) - $starttime, 4), 'connect' => 'con' .$request->fd]);
        });

        echo 'READY';

        @$server->start();
    }


    function processRequest($kernel, $request)
    {
        $request = Request::create($request->server['request_uri'], $request->server['request_method'], $request->get ?? []);
        $response = $kernel->handle($request);

        $kernel->terminate($request, $response);

        return $response->getContent();
    }

    function log($mesage, $context = [])
    {
        $this->logger->info('swoole-' . $mesage, array_merge($context, [
            'memory'    => round( memory_get_usage()/ 1024 /1024, 5),
            'time'      => microtime(true)
        ]));
    }
}