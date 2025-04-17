import {login} from './Controller_login.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const remember = rememberMe.checked;

        if (!email || !password) {
            alert("Por favor, ingresa tus credenciales.");
            return;
        }

        await login(email, password, remember);
    });    
});
