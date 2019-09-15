<?php

namespace App\Handler;

use App\Helper\Connection;
use App\Kernel;
use Symfony\Component\HttpFoundation\Request;


class Symfony4WebsocketHandler extends Symfony4HttpHandler implements WebsocketHandlerInterface
{
    // TODO: писать в базу, что есть коннект
    // Поплисаться на redis, ждать событий, чтоюы отправить клиенты
    // Приложеие  же видит, что есть коннект и может сразу отсылать клиенту , что хочет
    public function connect(Connection $connection)
    {
        // TODO: Implement connect() method.
    }

    // TODO: передавать номер соединения в виде отдельного объекта
    public function handle(Connection $connection, $data)
    {
        // TODO: воссоздать из $data REQUEST
        $data = json_decode($data, true);

        $request = Request::create($data['uri'], $data['method']);
        $response = self::$kernel->handle($request);

        self::$kernel->terminate($request, $response);
        return $response->getContent();
    }


    public function close(Connection $connection)
    {
        // TODO: Implement close() method.
    }

}