import { obtenerToken, obtenerNuevoToken } from './auth.js';  // Asegúrate de importar las funciones necesarias
import { obtenerOrdenPorId} from './api.js';  // Usar la función que maneja el token automáticamente
import UI from './ui.js';  // Importar la clase UI

document.addEventListener("DOMContentLoaded", async function () {
    // Intentamos obtener el token desde localStorage
    let accessToken = await obtenerToken();

    // Si no hay token, lo obtenemos y lo guardamos
    if (!accessToken) {
        console.log("Token no encontrado, obteniendo uno nuevo...");

        // Obtener el código de autorización desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');  // Extraer el parámetro 'code' de la URL

        if (!code) {
            alert("Se necesita un código de autorización para obtener un nuevo token.");
            return;
        }

        accessToken = await obtenerNuevoToken(code);  // Pasar el código de autorización a la función
        localStorage.setItem('access_token', accessToken);
    }

    console.log("Token obtenido:", accessToken);






    const buscarButton = document.getElementById("buscar-envio");

    buscarButton.addEventListener("click", async function () {
        const orden_id = document.getElementById("buscador-codigo").value;

        if (!orden_id) {
            alert("Por favor ingresa un ID de envío.");
            return;
        }

        console.log("Buscando envío con ID:", orden_id);

        try {
            const envio = await obtenerOrdenPorId(accessToken,orden_id)
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
