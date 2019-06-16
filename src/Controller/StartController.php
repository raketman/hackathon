<?php
// src/Controller/LuckyController.php
namespace App\Controller;


use App\Integrations\BpuimHttpClient;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class StartController
 * @package App\Controller
 *
 */
class StartController extends AbstractController
{
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
        return $this->render('app/init.html.twig', []);
    }

}