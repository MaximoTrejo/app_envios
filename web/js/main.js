import { obtenerToken, obtenerNuevoToken } from './auth.js';  // Asegúrate de importar las funciones necesarias
import { realizarSolicitudConToken } from './api.js';  // Usar la función que maneja el token automáticamente
import UI from './ui.js';  // Importar la clase UI

document.addEventListener("DOMContentLoaded", async function () {
    console.log("Obteniendo token...");

    // Intentamos obtener el token desde localStorage
    const accessToken = await obtenerToken();

    if (!accessToken) {
        console.log("No se pudo obtener el token de acceso.");
        return;
    }

    console.log("Token recibido:", accessToken);

    const buscarButton = document.getElementById("buscar-envio");

    buscarButton.addEventListener("click", async function () {
        const orden_id = document.getElementById("buscador-codigo").value;

        if (!orden_id) {
            alert("Por favor ingresa un ID de envío.");
            return;
        }

        console.log("Buscando envío con ID:", orden_id);

        // Aquí usaremos la función `realizarSolicitudConToken` para hacer la solicitud con el token
        const url = `http://localhost:666/ordenes/orders?orden_id=${orden_id}`;

        try {
            // Intentamos obtener los datos de la orden
            const envio = await realizarSolicitudConToken(url, { method: "GET" });

            console.log("Datos del envío:", envio);

            if (envio) {
                UI.mostrarOrdenEnTabla([envio]);  // Usar el método estático de la clase UI
            } else {
                alert("No se puede mostrar el envío.");
            }
        } catch (error) {
            console.error("Error obteniendo el envío:", error);
        }
    });
});
