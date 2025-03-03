export async function obtenerEnviosPorId(accessToken, shipmentId) {
    const url = `http://localhost:666/Envios/shipments?shipment_id=${shipmentId}&access_token=${accessToken}`;
    
    console.log("URL de la petición:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data && data.results && data.results.length > 0) {
            return data.results[0]; 
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo el envío:", error);
        return null;
    }
}


export async function obtenerOrdenPorId(accessToken, orden_id) {
    const url = `http://localhost:666/ordenes/orders?orden_id=${orden_id}&access_token=${accessToken}`;
    
    console.log("URL de la petición:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data && data.results && data.results.length > 0) {
            return data.results[0]; 
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo el envío:", error);
        return null;
    }
}

