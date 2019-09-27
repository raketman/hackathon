<?php
namespace App\Integrations;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;

class BpuimHttpClient
{
    private $host;
    private $user;
    private $password;

    /** @var LoggerInterface  */
    private $logger;

    public function __construct(LoggerInterface $logger, $host, $user, $password)
    {
        $this->host = $host;
        $this->user = $user;
        $this->password = $password;
        $this->logger = $logger;
    }

    public function request($apiMethod, Request $httpRequest)
    {
        $apiClientMethod        = strtolower($httpRequest->getMethod());

        switch ($apiClientMethod) {

            case 'get':
                $apiClientMethodParams = $httpRequest->query->all();
                $paramName = 'query';
                break;


            case 'patch':
            case 'post':
            case 'put':
            case 'delete':
                $apiClientMethod = $apiClientMethod === 'put' ? 'patch' : $apiClientMethod;
                $apiClientMethodParams = json_decode($httpRequest->getContent(), true);
                $this->logger->error('test', [$apiClientMethodParams]);
                $paramName = 'json';
                break;

            default:
                throw new \Exception(
                    'Недопустимый HTTP метод запроса', 403
                );
        }

        $httpClient = HttpClient::create([
            'auth_basic' => [$this->user, $this->password],
        ]);
        try {
            $response = $httpClient->request(
                strtoupper($apiClientMethod),
                sprintf('%s%s', $this->host, $apiMethod),
                [
                    $paramName => $apiClientMethodParams
                ]
            );
        } catch (\Exception $e) {
            $this->logger->error('bpium', [$e->getMessage()]);
            throw $e;
        }

        return $response;
    }
}