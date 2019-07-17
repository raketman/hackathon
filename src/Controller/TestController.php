<?php
namespace App\Controller;


use App\Integrations\BpuimHttpClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TestController
 * @package App\Controller
 *
 */
class TestController extends Controller
{
    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/test/rabbitmq/publish",
     * )
     */
    public function publish(Request $request)
    {
        $msg = ['version' => $request->get('version', 1), 'answer_route' => uniqid()];
        $result = $this->get('old_sound_rabbit_mq.test_producer')->publish(json_encode($msg));

        var_dump($result);

        exit;

    }

}