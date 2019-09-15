<?php

namespace App\Handler;


use App\Helper\Connection;

interface WebsocketHandlerInterface extends  HttpHandlerInterface
{
    /**
     * Обработка подключения к серверу
     * @param Connection $connection
     */
    public function connect(Connection $connection);

    /**
     * Обработка закрытия соединения
     * @param Connection $connection
     */
    public function close(Connection $connection);
}