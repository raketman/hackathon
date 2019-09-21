<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation as SRLZ;

/**
 * @ORM\Entity
 * @ORM\Table
 */
class Test
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @SRLZ\Groups({"full"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @SRLZ\Groups({"full"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * @SRLZ\Groups({"full"})
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return self;
     */
    public function setName($name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreated()
    {
        return $this->created;
    }

}