require('dotenv').config();

export async function obtenerOrdenPorId(accessToken, orden_id) {
    const baseUrl = process.env.API_ML_URL_ORDEN;
    const url = `${baseUrl}?orden_id=${orden_id}&access_token=${accessToken}`;
    
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
    const baseUrl = process.env.API_ML_URL_ORDENES;
    const url =`${baseUrl}?verdedor_id=${vendedor_id}&access_token=${accessToken}`;
    
    
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

export async function ObtenerIDpublicaciones(accessToken, id_vendedor) {
    const url = `http://localhost:666/publicaciones/IdPublicaciones?id_vendedor=${id_vendedor}&access_token=${accessToken}`;

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
        return data?.results ?? null;
    } catch (error) {
        console.error("Error obteniendo las publicaciones del vendedor:", error);
        return null;
    }
}

export async function ObtenerDetallePublicaciones(accessToken, idPublicaciones) {
    const url = `http://localhost:666/publicaciones/detallePublicaciones?id_publicaciones=${idPublicaciones}&access_token=${accessToken}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error("Error en la respuesta:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        return data.length > 0 ? data.map(item => item.body) : null;
    } catch (error) {
        console.error("Error obteniendo las publicaciones del vendedor:", error);
        return null;
    }
}
