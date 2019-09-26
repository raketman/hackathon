<?php
namespace App\Controller;


use App\Entity\Test;
use App\Integrations\BpuimHttpClient;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Cache\Adapter\RedisAdapter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use VCR\Storage\Json;

/**
 * Class TestController
 * @package App\Controller
 *
 */
class TestController extends Controller
{
    /**
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     * @throws \Exception
     *
     * @Route(
     *     "/test/insert",
     * )
     */
    public function insert(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $test = new Test();

        $test->setName($request->get('name', mt_rand(100, 1000000)));

        $entityManager->persist($test);
        $entityManager->flush();

        return new JsonResponse($serializer->serialize($test, 'json', ['groups' => 'full']), 200, [], true);
    }

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/message",
     * )
     */
    public function websockettest(Request $request, LoggerInterface $logger)
    {
        try {
            //var_dump($_SERVER,getenv('LOG_SESSION_ID'));exit;
        } catch (\Throwable $e) {
            //var_dump($e);exit;
        }

        return new JsonResponse([
            $request->query->all() + ['dude' => (new \DateTimeImmutable())->format('Y-m-d H:i:s')]
        ]);

    }

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/rabbitmq/publish",
     * )
     */
    public function publish(Request $request, LoggerInterface $logger)
    {
        $msg = ['version' => $request->get('version', 1), 'answer_route' => uniqid(), 'get' => $request->query->all()];
        $producer = $this->get('old_sound_rabbit_mq.test_producer');
        // TODO: не хочет писать в файл при вебсокете
        //$producer->setLogger($logger);
        $result = $producer->publish(json_encode($msg));


        return new JsonResponse(['result' => $result]);

    }

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/redis/pubsub",
     * )
     */
    public function redis(Request $request, LoggerInterface $logger)
    {
        // TODO: Вынести в настройки сервиса
        $client = RedisAdapter::createConnection('redis://app-redis:6379');
        print_r([$client->get('test')]);

        $adapter = new \Superbalist\PubSub\Redis\RedisPubSubAdapter($client);

        // consume messages
        // note: this is a blocking call
        $adapter->subscribe('my_channel', function ($message) {
            var_dump($message);
        });


        return new JsonResponse();
    }


    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/redis/publish",
     * )
     */
    public function redispub(Request $request, LoggerInterface $logger)
    {
        // TODO: Вынести в настройки сервиса
        $client = RedisAdapter::createConnection('redis://app-redis:6379');
        print_r([$client->get('test')]);

        $client = new \Predis\Client('tcp://app-redis:6379');

        $adapter = new \Superbalist\PubSub\Redis\RedisPubSubAdapter($client);

        // publish messages
        $adapter->publish('my_channel', 'HELLO WORLD');
        $adapter->publish('my_channel', ['hello' => 'world']);
        $adapter->publish('my_channel', 1);
        $adapter->publish('my_channel', false);

// publish multiple messages
        $messages = [
            'message 1',
            'message 2',
        ];
        $adapter->publishBatch('my_channel', $messages);

        return new JsonResponse();
    }

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/testvcr/publish",
     * )
     */
    public function testvcr(Request $request)
    {
        \VCR\VCR::configure()->setStorage('json');
        \VCR\VCR::configure()->enableLibraryHooks(array('stream_wrapper', 'curl'));
        \VCR\VCR::configure()->setCassettePath($this->getParameter('kernel.project_dir'). '/cassete');

        // After turning on the VCR will intercept all requests
        \VCR\VCR::turnOn();

        // Record requests and responses in cassette file 'example'
        \VCR\VCR::insertCassette('v132188');

        // Following request will be recorded once and replayed in future test runs
        $result = file_get_contents('http://v132188.hosted-by-vdsina.ru/proxy/api/v1/catalogs/12/records?filters[0][fieldId]=4&filters[0][value]=79196396602');

        var_dump($result);

        // To stop recording requests, eject the cassette
        \VCR\VCR::eject();

        // Turn off VCR to stop intercepting requests
        \VCR\VCR::turnOff();

        exit;

    }

}