<?php
require __DIR__ . '/../vendor/autoload.php';

use EasySwoole\Http\AbstractInterface\Controller;


$server = new swoole_websocket_server("localhost", 9501);

$server->on('open', function ($server, $req) {
    echo "connection open: {$req->fd}\n";
});

$server->on('message', function ($server, $frame) {
    echo "received message: {$frame->data}\n";
    $server->push($frame->fd, json_encode(["hello", "world"]));
});

$server->on('close', function ($server, $fd) {
    echo "connection close: {$fd}\n";
});

echo 'READY';

$server->start();


