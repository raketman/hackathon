<?php

namespace App\Helper;

use App\Handler\HttpHandlerInterface;

trait HttpServerHandlerTrait
{
    /** @var HttpHandlerInterface */
    protected $handler;

    /**
     * @param HttpHandlerInterface $handler
     */
    public function setHandler(HttpHandlerInterface $handler): void
    {
        $this->handler = $handler;
    }
}