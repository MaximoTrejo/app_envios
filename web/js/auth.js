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