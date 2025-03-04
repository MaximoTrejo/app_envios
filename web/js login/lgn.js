document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const mercadoLibreLogin = document.getElementById("mercadoLibreLogin");

    // Cargar credenciales guardadas
    if (localStorage.getItem("email")) {
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("rememberMe").checked = true;
    }

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("rememberMe").checked;

        const response = await fetch("http://localhost:667/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.success) {
            if (rememberMe) localStorage.setItem("email", email);
            else localStorage.removeItem("email");

            alert("Inicio de sesión exitoso");
            window.location.href = "dashboard.html";
        } else {
            alert("Credenciales incorrectas");
        }
    });

    // Autenticación con Mercado Libre
    mercadoLibreLogin.addEventListener("click", () => {
        const clientId = "5174586942693408";
        const redirectUri = encodeURIComponent("https://maximotrejo.github.io/app_envios/web/pagPrincipal.html");
        window.location.href = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    });
});