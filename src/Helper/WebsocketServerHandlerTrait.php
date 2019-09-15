<?php

namespace App\Helper;

use App\Handler\WebsocketHandlerInterface;

trait WebsocketServerHandlerTrait
{
    /** @var WebsocketHandlerInterface */
    protected $handler;

    /**
     * @param WebsocketHandlerInterface $handler
     */
    public function setHandler(WebsocketHandlerInterface $handler): void
    {
        $this->handler = $handler;
    }
}