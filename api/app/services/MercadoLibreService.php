<?php

namespace App\Services;

class MercadoLibreService {
    private $apiUrl = "https://api.mercadolibre.com/shipments/";

    public function obtenerEnvio($accessToken, $shipmentId) {
        if (!$accessToken || !$shipmentId) {
            throw new \Exception("El Access Token y el Shipment ID son requeridos");
        }

        $url = $this->apiUrl . $shipmentId;

        // Inicializar cURL
        $ch = curl_init();

        // Configurar cURL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . $accessToken,
            "x-format-new: true",
            "Content-Type: application/json"
        ]);

        // Ejecutar y obtener respuesta
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // Manejar errores
        if ($response === false) {
            throw new \Exception("Error en la solicitud cURL: " . curl_error($ch));
        }

        // Cerrar conexión cURL
        curl_close($ch);

        // Validar respuesta HTTP
        if ($httpCode !== 200) {
            throw new \Exception("Error en la API de MercadoLibre. Código HTTP: " . $httpCode);
        }

        return json_decode($response, true);
    }
}
