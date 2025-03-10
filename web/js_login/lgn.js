document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    // Cargar credenciales guardadas
    if (localStorage.getItem("email")) {
        emailInput.value = localStorage.getItem("email");
        rememberMe.checked = true;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const usuario = emailInput.value.trim();
        const clave = passwordInput.value.trim();

        if (!usuario || !clave) {
            alert("Por favor, ingresa tus credenciales.");
            return;
        }

        try {
            const response = await fetch("http://localhost:667/login", {
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
                const clientId = "5174586942693408";
                const redirectUri = encodeURIComponent("https://maximotrejo.github.io/app_envios/web/html/dashboard.html");
                window.location.href = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
            } else {
                alert("Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Ocurrió un error al intentar iniciar sesión. Inténtalo más tarde.");
        }
    });
});
