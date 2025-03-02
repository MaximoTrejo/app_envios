// auth.js

export async function obtenerToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (!authCode) {
        console.log("No se recibió el código de autorización.");
        return null;
    }

    const data = {
        client_id: '5174586942693408',
        client_secret: 'QW3yOIAUHqbQk1sg7ypmdxBVPbgpUFNt',
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: 'https://maximotrejo.github.io/app_envios/web/index.html'
    };

    try {
        const response = await fetch('https://api.mercadolibre.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data)
        });

        const result = await response.json();

        if (response.ok) {
            return result.access_token;
        } else {
            console.error("Error al obtener el token:", result);
            return null;
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        return null;
    }
}
