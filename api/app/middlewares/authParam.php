<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class authParam
{
    public function __invoke(Request $request, RequestHandler $handler)
    {
        // Obtener parámetros dependiendo del método HTTP
        $params = $request->getMethod() === 'POST' ? $request->getParsedBody() : $request->getQueryParams();

        // Verificar que los parámetros estén presentes y no vacíos
        if (!empty($params["shipment_id"]) && !empty($params["access_token"])) {
            return $handler->handle($request);
        }

        // Responder con error si faltan los parámetros
        $response = new Response();
        $response->getBody()->write(json_encode([
            "error" => "Access Token y Shipment ID son requeridos"
        ], JSON_UNESCAPED_UNICODE));
        
        return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
    }
}
