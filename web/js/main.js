// main.js
import { obtenerToken } from './auth.js';
import { obtenerEnvios } from './api.js';
import { mostrarEnviosEnTabla } from './ui.js';

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Obteniendo token...");
    const accessToken = await obtenerToken();
    console.log("Token recibido:", accessToken);

    if (!accessToken) {
        console.log("No se pudo obtener el token de acceso.");
        return;
    }

    // Asignar el evento para filtrar envíos
    document.getElementById("estado-envios").addEventListener("change", async function () {
        const estadoSeleccionado = this.value;
        const envios = await obtenerEnvios(accessToken, estadoSeleccionado);
        mostrarEnviosEnTabla(envios);
    });
});
