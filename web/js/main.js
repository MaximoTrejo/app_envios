import { obtenerToken } from './auth.js';
import { obtenerEnviosPorId } from './api.js'; // Vamos a crear esta función en api.js
import { mostrarEnviosEnTabla } from './ui.js';

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Obteniendo token...");
    const accessToken = await obtenerToken();
    console.log("Token recibido:", accessToken);

    if (!accessToken) {
        console.log("No se pudo obtener el token de acceso.");
        return;
    }

    // Asignar el evento para el botón de búsqueda
    const buscarButton = document.getElementById("buscar-envio");
    buscarButton.addEventListener("click", async function () {
        const shipmentId = document.getElementById("buscador-codigo").value;
        
        if (!shipmentId) {
            alert("Por favor ingresa un ID de envío.");
            return;
        }

        console.log("Buscando envío con ID:", shipmentId);

        // Llamamos a la función que obtendrá los datos del envío
        const envio = await obtenerEnviosPorId(accessToken, shipmentId);
        
        if (envio) {
            mostrarEnviosEnTabla([envio]); // Pasamos el resultado a la tabla
        } else {
            alert("No se encontró el envío.");
        }
    });
});
