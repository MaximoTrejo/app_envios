export async function obtenerEnviosPorId(accessToken, shipmentId) {
    const url = `http://localhost:666/Envios/shipments?shipment_id=${shipmentId}&access_token=${accessToken}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        
        if (data && data.results && data.results.length > 0) {
            return data.results[0]; // Retorna el primer resultado (suponiendo que siempre viene un solo envío)
        }
        return null; // Si no se encuentra el envío
    } catch (error) {
        console.error("Error obteniendo el envío:", error);
        return null;
    }
}
