<?php

namespace App\Handler;

use App\Exception\ServerException;
use App\Kernel;
use Symfony\Component\HttpFoundation\Request;
use App\Helper\Connection;


class Symfony4HttpHandler implements HttpHandlerInterface
{
    /** @var Kernel|null  */
    protected static $kernel = null;

    public function init()
    {
        self::$kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
    }

    public function handle(Connection $connection, $data)
    {
        $request = Request::createFromGlobals();
        $response = self::$kernel->handle($request);

        self::$kernel->terminate($request, $response);

        return $response->getContent();
    }


    public function error(Connection $connection, ServerException $exception)
    {
        throw $exception;
    }
}