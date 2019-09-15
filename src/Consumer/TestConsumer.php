<?php
namespace App\Consumer;

use App\Test\IService;
use App\Test\Resolver;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Psr\Container\ContainerInterface;
use Symfony\Component\DependencyInjection\Container;

class TestConsumer implements ConsumerInterface
{
    protected $container;
    protected $resolver;

    public function __construct(ContainerInterface $container, Resolver $resolver)
    {
        $this->container = $container;
        $this->resolver = $resolver;
    }

    public function execute(AMQPMessage $msg)
    {
        //Process picture upload.
        //$msg will be an instance of `PhpAmqpLib\Message\AMQPMessage` with the $msg->body being the data sent over RabbitMQ.

            try {
                $data = json_decode($msg->getBody(), true);

                $this->resolver->setVersion($data['version']);

                print_r($data);

                $this->container->get('old_sound_rabbit_mq.testgo_producer')->publish($data['answer_route']. rand(1, 100));

                print_r([$this->resolver->getVersion(), get_class($this->container->get('App\Test\IService'))]);
            } catch (\Throwable $e) {
                echo $e->getMessage() . "\n\n";
            }

//        $isUploadSuccess = someUploadPictureMethod();
//        if (!$isUploadSuccess) {
//            // If your image upload failed due to a temporary error you can return false
//            // from your callback so the message will be rejected by the consumer and
//            // requeued by RabbitMQ.
//            // Any other value not equal to false will acknowledge the message and remove it
//            // from the queue
//            return false;
//        }
    }
}