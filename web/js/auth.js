export async function obtenerToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (!authCode) {
        console.log("No se recibió código de autorización.");
        return null;
    }

    console.log("Código de autorización recibido:", authCode);

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
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        });

        const result = await response.json();
        return result.access_token;
    } catch (error) {
        console.error("Error obteniendo el token:", error);
        return null;
    }
}