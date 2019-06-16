<?php
// src/Controller/LuckyController.php
namespace App\Controller;


use App\Integrations\BpuimHttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class StartController
 * @package App\Controller
 *
 */
class ProxyController
{
    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/proxy{url}",
     *     requirements={"url"=".+"}
     * )
     */
    public function proxy(BpuimHttpClient $bpuimClient, $url, Request $request)
    {
        return new JsonResponse($bpuimClient->request($url, $request)->getContent(), 200, [] , true);
    }

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route("/api/v1/authorized")
     */
    public function authorized(Request $request)
    {
        $number = random_int(0, 100);

        return new JsonResponse([
            'login'         => $request->request->get('login'),
            'access_token'  => random_int(0, 100)
        ]);
    }
}