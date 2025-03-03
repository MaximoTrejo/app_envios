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