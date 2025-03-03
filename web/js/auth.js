export async function obtenerToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (!authCode) {
        console.log("No se recibió el código de autorización.");
        return null;
    }

    try {
        const response = await fetch('http://localhost:666/token/oauth/token', {  // Tu backend debe manejar esta ruta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: authCode })
        });

        const result = await response.json();

        if (response.ok && result.access_token) {
            return result.access_token;
        } else {
            console.error("Error al obtener el token:", result);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud del token:", error);
        return null;
    }
}
