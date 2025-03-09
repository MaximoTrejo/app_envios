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

export async function ObtenerOrdenes(accessToken, vendedor_id) {

    const url =`http://localhost:666/ordenes/ObtenerOrdenes?verdedor_id=${vendedor_id}&access_token=${accessToken}`;
    
    
    console.log("URL de la petición:", url);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
       
        if (data && data.id) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error obteniendo el envío:", error);
        return null;
    }
}

export async function ObtenerIdVendedor(accessToken) {
    const url = `http://localhost:666/Usuario/MiID?access_token=${accessToken}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error("Error en la respuesta:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        return data?.id ?? null; // Devuelve solo el ID o null si no existe
    } catch (error) {
        console.error("Error obteniendo el ID del vendedor:", error);
        return null;
    }
}