<?php
namespace App\Test;

use Raketman\Bundle\ServiceVersioningBundle\Resolver\VersionResolverInterface;

class Resolver implements VersionResolverInterface
{
    protected $version;

    /**
     * @return mixed
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * @param mixed $version
     */
    public function setVersion($version): void
    {
        $this->version = $version;
    }


}