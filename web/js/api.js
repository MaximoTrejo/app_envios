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

        // Cambia la validación para verificar si data es un objeto válido con la propiedad id
        if (data && data.id) {
            return data; // Retorna los datos directamente
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo el envío:", error);
        return null;
    }
}

