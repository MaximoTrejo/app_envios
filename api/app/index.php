<?php
// Error Handling
//error_reporting(-1);
//ini_set('display_errors', 1);

// Cargar dependencias
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\CorsMiddleware;
use App\Controllers\EnviosController;
use Slim\Routing\RouteCollectorProxy;
use DI\Container; // Importar el contenedor

// Incluir el autoload de Composer
require __DIR__ . '/../vendor/autoload.php';

//middlewares
require_once './middlewares/authParam.php';

// Cargar controladores, rutas y servicios
require_once __DIR__ . '/./controllers/EnviosController.php';
require_once __DIR__ . '/./services/MercadoLibreService.php';

// Crear el contenedor de dependencias
$container = new Container();

// Registrar MercadoLibreService en el contenedor
$container->set(App\Services\MercadoLibreService::class, function () {
    return new App\Services\MercadoLibreService();
});

// Asignar el contenedor a Slim
AppFactory::setContainer($container);

// Instanciar la aplicación Slim
$app = AppFactory::create();

// Configurar CORS
$app->add(new CorsMiddleware([
    "origin" => ["*"], // Permite solicitudes desde cualquier origen
    "methods" => ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    "headers.allow" => ["Content-Type", "X-Requested-With"], // Encabezados permitidos
    "headers.expose" => ["X-My-Custom-Header"], // Encabezados visibles para el cliente
    "credentials" => true, // Permitir credenciales si es necesario
    "cache" => 3600, // Cache CORS durante una hora
]));

// Middleware de manejo de errores
$app->addErrorMiddleware(true, true, true);

// Middleware para parsear el cuerpo de la solicitud (para JSON, etc.)
$app->addBodyParsingMiddleware();

$app->group('/Envios', function (RouteCollectorProxy $group) {
    $group->get('/shipments', EnviosController::class . ':obtenerEnvio')->add(new authParam());
});

//-----------------------------------------------------------------------------------------------------------------------------
// Mensaje random
$app->get('[/]', function (Request $request, Response $response) {    
    $payload = json_encode(array("mensaje" => "MaximoTrejo - app Envios"));
    
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

// Ejecutar la aplicación
$app->run();
