export async function obtenerEnvios(accessToken, estado) {
    const url = `https://api.mercadolibre.com/shipping/shipments/search?shipment_status=${estado}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data.results; // Retorna los envíos encontrados
    } catch (error) {
        console.error("Error obteniendo los envíos:", error);
        return [];
    }
}
