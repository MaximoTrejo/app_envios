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
export async function obtenerNuevoToken() {
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
