import {login} from './js.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    loginForm.addEventListener("submit", async (event) => {
        
        login(emailInput,passwordInput);

        
    });
});
