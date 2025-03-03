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


// Función que maneja la solicitud con el token, si está expirado obtiene uno nuevo
export async function realizarSolicitudConToken(accessToken, url, options) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                ...options.headers // Mantener otros encabezados si los hubiera
            }
        });

        const data = await response.json();
        // Si la respuesta es exitosa, retornamos los datos
        if (response.ok) {
            return data;
        } else {
            // Si el token está expirado o hay un error relacionado
            if (data.error === 'invalid_grant') {
                console.log("Token expirado, obteniendo un nuevo token...");
                // Llamar a la función para obtener un nuevo token
                const nuevoToken = await obtenerNuevoToken(); 
                // Guardar el nuevo token en localStorage
                localStorage.setItem('access_token', nuevoToken);
                // Hacer la solicitud nuevamente con el nuevo token
                return realizarSolicitudConToken(nuevoToken, url, options);
            }
            // Si ocurre cualquier otro error, lo lanzamos
            throw new Error(`Error en la API: ${data.message}`);
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
}