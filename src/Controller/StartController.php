<?php
// src/Controller/LuckyController.php
namespace App\Controller;


use App\Integrations\BpuimHttpClient;
use Raketman\Bundle\MonologInjectionBundle\Traits\RaketmanLoggerTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Raketman\Bundle\MonologInjectionBundle\Annotations\RaketmanLogger;

/**
 * Class StartController
 * @package App\Controller
 * @RaketmanLogger("request")
 *
 */
class StartController extends AbstractController
{
    use RaketmanLoggerTrait;

    /**
     * @return Response
     * @throws \Exception
     *
     * @Route(
     *     "/",
     * )
     */
    public function start(Request $request)
    {
        $this->logger->debug('test', $request->query->all());

        return $this->render('app/init.html.twig', []);
    }

}