<?php

namespace App\Handler;

use App\Exception\ServerException;
use App\Helper\Connection;

interface HttpHandlerInterface
{
    /**
     * Инициализация сервер
     * @return mixed
     * @throws \Throwable
     */
    public function init();

    /**
     * Обработка запроса
     * @param Connection $connection
     * @param mixed $data
     * @return mixed
     * @throws \Throwable
     */
    public function handle(Connection $connection, $data);

    /**
     * @param ServerException $exception
     * @return mixed
     * @throws \Throwable
     */
    public function error(Connection $connection, ServerException $exception);
}