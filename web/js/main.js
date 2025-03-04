import { obtenerToken} from './auth.js'; 
import { obtenerOrdenPorId} from './api.js'; 
import UI from './ui.js';  

document.addEventListener("DOMContentLoaded", async function () {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');  
    
    let accessToken = await obtenerToken(code);  // Pasamos el `code` directamente a la función
    
    console.log("Token obtenido:", accessToken);
    
    if (!accessToken) {
        console.log("Token no encontrado o expirado, obteniendo uno nuevo...");
    
        if (!code) {
            alert("Se necesita un código de autorización para obtener un nuevo token.");
            return;
        }
    
        // Si el `code` no estaba disponible antes, lo usamos para obtener un nuevo token
        accessToken = await obtenerToken(code);  
    }
    
    console.log("Token final:", accessToken);



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
                UI.mostrarOrdenEnTabla([envio]);
            } else {
                alert("No se puede mostrar el envío.");
            }
        } catch (error) {
            console.error("Error obteniendo el envío:", error);
        }
    });
});
