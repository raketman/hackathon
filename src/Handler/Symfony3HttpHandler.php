<?php

namespace App\Handler;

use App\Exception\HttpServerException;
use App\Exception\ServerException;
use App\Helper\Connection;
use App\Kernel;

class Symfony3HttpHandler implements HttpHandlerInterface
{
    /** @var Kernel|null  */
    private static $kernel = null;

    public function init()
    {
        self::$kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
    }

    public function handle(Connection $connection, $data)
    {

    }

    public function error(Connection $connection, ServerException $exception)
    {

    }
}