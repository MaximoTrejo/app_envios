export async function obtenerToken(code) {
    let token = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    let tokenAcquiredTime = localStorage.getItem('token_acquired_time'); // Guardamos el momento en que se adquirió el token

    if (token && tokenAcquiredTime) {
        // Verificar si el token ha expirado (6 horas = 21600 segundos)
        let elapsedTime = (Date.now() - tokenAcquiredTime) / 1000; // Tiempo en segundos desde que se obtuvo el token
        if (elapsedTime < 21600) {
            return token; // El token sigue siendo válido
        }
    }

    console.log("Token no encontrado o expirado, redirigiendo al proceso de autenticación.");

    if (refreshToken) {
        // Si el refresh token está disponible, intenta refrescar el token
        let nuevoToken = await refrescarToken(refreshToken);
        if (nuevoToken) {
            return nuevoToken;
        }
    }

    // Si no hay token o refresh token, obtener uno nuevo usando el código de autorización
    try {
        let nuevoToken = await obtenerNuevoToken(code); // Pasamos el código de autorización como parámetro
        return nuevoToken;
    } catch (error) {
        console.error("Error al obtener un nuevo token:", error);
        return null;
    }
}

export async function refrescarToken(refreshToken) {
    try {
        let response = await fetch('http://localhost:666/token/refrescarToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code_refresh: refreshToken,
            }),
        });

        if (response.ok) {
            let data = await response.json();
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('token_acquired_time', Date.now()); // Guardamos el momento de adquisición del token
            return data.access_token;
        } else {
            console.error('Error al refrescar el token');
            return null;
        }
    } catch (error) {
        console.error('Error en la solicitud de refresco de token', error);
        return null;
    }
}

// Función para obtener un nuevo token usando el código de autorización
export async function obtenerNuevoToken(code) {
    const response = await fetch("http://localhost:666/token/obtenerToken", {
        method: "POST",  // Asegurarse de usar POST para obtener el token
        headers: {
            "Content-Type": "application/json"  // Si la API espera datos en formato JSON
        },
        body: JSON.stringify({ code })  // Usamos el código de autorización recibido como parámetro
    });

    // Verificamos si la respuesta es exitosa
    if (response.ok) {
        const data = await response.json();
        // Guardamos el nuevo token y su momento de adquisición
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_acquired_time', Date.now()); // Guardamos el momento de adquisición del token
        return data.access_token;  // Retornamos el token de acceso
    } else {
        const errorData = await response.json();
        throw new Error(`No se pudo obtener un nuevo token: ${errorData.message || response.statusText}`);
    }
}