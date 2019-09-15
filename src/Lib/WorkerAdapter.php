<?php

namespace App\Lib;

use Psr\Log\LoggerInterface;
use Workerman\Lib\Timer;
use Workerman\Worker;

class WorkerAdapter extends Worker
{
    /** @var LoggerInterface */
    public static $logger;

    public static $runDir;

    protected static function init()
    {
        \set_error_handler(function($code, $msg, $file, $line){
            self::log("$msg in file $file on line $line");
        });

        $unique_prefix = \str_replace(':', '_',  $GLOBALS['argv'][0]);


        // Pid file.
        static::$_startFile = self::$runDir . "$unique_prefix.start";
        static::$pidFile = self::$runDir . "$unique_prefix.pid";

        print_r([static::$_startFile, $unique_prefix, static::$pidFile]);

        if (!\is_file(static::$_startFile)) {
            \touch(static::$_startFile);
            \chmod(static::$_startFile, 0622);
        }
        if (!\is_file(static::$pidFile)) {
            \touch(static::$pidFile);
            \chmod(static::$pidFile, 0622);
        }


        // State.
        static::$_status = static::STATUS_STARTING;

        // For statistics.
        static::$_globalStatistics['start_timestamp'] = \time();
        static::$_statisticsFile                      = \sys_get_temp_dir() . "/$unique_prefix.status";

        // Process title.
        static::setProcessTitle('WorkerMan: master process  start_file=' . static::$_startFile);

        // Init data for worker id.
        static::initId();

        // Timer init.
        Timer::init();
    }


    /**
     * Log.
     *
     * @param string $msg
     * @return void
     */
    public static function log($msg)
    {
        if (!static::$daemonize) {
            static::safeEcho($msg . PHP_EOL);
        }
        self::$logger->error($GLOBALS['argv'][0], ['message' => $msg]);
    }
}