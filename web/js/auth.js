export async function obtenerToken() {
    // Primero verificamos si ya existe un token en localStorage
    let token = localStorage.getItem('access_token');
    
    // Si el token existe, lo devolvemos directamente
    if (token) {
        return token;
    }

    // Si no existe, redirigimos al proceso de autenticación
    console.log("Token no encontrado, redirigiendo al proceso de autenticación.");
    return null;
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
        return data.access_token;  // Retornamos el token de acceso
    } else {
        const errorData = await response.json();
        throw new Error(`No se pudo obtener un nuevo token: ${errorData.message || response.statusText}`);
    }
}

// Función para validar si el token es válido, si no lo está, obtener uno nuevo
export async function validarToken() {
    // Intentamos obtener el token desde localStorage
    let accessToken = localStorage.getItem('access_token');
    
    // Si no existe el token, obtenemos uno nuevo
    if (!accessToken) {
        console.log("Token no encontrado, obteniendo uno nuevo...");
        const code = new URLSearchParams(window.location.search).get('code'); // Obtener el código de la URL
        if (code) {
            accessToken = await obtenerNuevoToken(code);  // Llamamos a obtenerNuevoToken con el code
            localStorage.setItem('access_token', accessToken); // Guardamos el nuevo token
        } else {
            throw new Error("No se encontró el código de autorización en la URL.");
        }
    }
    
    // Verificar si el token es válido (por ejemplo, si no ha expirado)
    const url = "http://localhost:666/validar_token";  // Asumiendo que la API tiene un endpoint para validar el token
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            // Si el token es válido
            return accessToken;
        } else {
            // Si el token está expirado o es inválido, obtenemos un nuevo token
            console.log("Token expirado o inválido, obteniendo un nuevo token...");
            const code = new URLSearchParams(window.location.search).get('code');  // Obtener el código de la URL nuevamente
            accessToken = await obtenerNuevoToken(code);  // Llamamos a obtenerNuevoToken con el code
            localStorage.setItem('access_token', accessToken); // Guardamos el nuevo token
            return accessToken;
        }
    } catch (error) {
        console.error("Error validando el token:", error);
        throw error;
    }
}