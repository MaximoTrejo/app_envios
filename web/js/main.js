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
    const buscarButton = document.getElementById("tabla-orden");
    buscarButton.addEventListener("click", async function () {
        const orden_id = document.getElementById("buscador-codigo").value;
        
        if (!orden_id) {
            alert("Por favor ingresa un ID de envío.");
            return;
        }

        console.log("Buscando envío con ID:", orden_id);

        // Llamamos a la función que obtendrá los datos del envío
        const envio = await obtenerOrdenPorId(accessToken, orden_id);
        
        if (envio) {
            mostrarEnviosEnTabla([envio]); // Pasamos el resultado a la tabla
        } else {
            alert("No se puede montrar el envío.");
        }
    });
});
