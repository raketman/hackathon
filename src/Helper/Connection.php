<?php

namespace App\Helper;

/**
 * Class Connection
 * @package App\Helper
 */
class Connection
{
    /** @var mixed */
    private $connectId;

    /** @var mixed */
    private $metadata;

    private $workerId;


    public function __construct($connectId, $workerId, $metadata)
    {
        $this->connectId = $connectId;
        $this->workerId = $workerId;
        $this->metadata = $metadata;
    }

    /**
     * @return mixed
     */
    public function getConnectId()
    {
        return $this->connectId;
    }

    /**
     * @return mixed
     */
    public function getMetadata()
    {
        return $this->metadata;
    }

    /**
     * @return mixed
     */
    public function getWorkerId()
    {
        return $this->workerId;
    }


}