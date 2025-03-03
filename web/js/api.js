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



// api.js
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

// Función para obtener un nuevo token usando el código de autorización
export async function obtenerNuevoToken() {
    // Aquí necesitarías tener algún flujo para obtener un nuevo token, como el que ya has implementado
    // Podrías redirigir a la página de autenticación si es necesario
    const code = 'auth_code_obtenido_de_otra_manera'; // Ejemplo, sustituir por el código real
    const response = await fetch("http://localhost:666/token/obtenerToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    const data = await response.json();
    if (response.ok) {
        return data.access_token;
    } else {
        throw new Error("No se pudo obtener un nuevo token.");
    }
}

