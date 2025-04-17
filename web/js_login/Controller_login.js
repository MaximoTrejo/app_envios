require('dotenv').config();


export async function login(usuario, clave ) {
    
    url = API_CONTROL_URL + API_CONTROL_URL_LOGIN;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, clave })
        });

        const data = await response.json();
        console.log("Respuesta API:", data);

        if (data.success && data.token) {
            // Guardar el token en localStorage o sessionStorage si lo necesitas
            localStorage.setItem("token", data.token);

            if (rememberMe.checked) localStorage.setItem("email", usuario);
            else localStorage.removeItem("email");

            // Redirigir a la autenticación de Mercado Libre
            const clientId = CLIENT_ID;
            const redirectUri = URL_REDIRECCIONAMIENTO_ML;
            //encodeURIComponent("https://maximotrejo.github.io/app_envios/web/html/dashboard.html");
            window.location.href = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error en el login:", error);
        alert("Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.");
    }

}