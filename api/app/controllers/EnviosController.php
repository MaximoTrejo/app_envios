<?php

namespace App\Controllers;

use App\Services\MercadoLibreService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EnviosController {

    protected $mercadoLibreService;

    public function __construct(MercadoLibreService $mercadoLibreService) {
        $this->mercadoLibreService = $mercadoLibreService;
    }

    public function obtenerEnvio(Request $request, Response $response, $args) {
        $params = $request->getQueryParams();
        $shipmentId = $params['shipment_id'] ?? null;
        $accessToken = $params['access_token'] ?? null;

        try {
            $envio = $this->mercadoLibreService->obtenerEnvio($accessToken, $shipmentId);
            
            $response->getBody()->write(json_encode($envio));
            
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["error" => "Error al obtener el envío", "message" => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
}
