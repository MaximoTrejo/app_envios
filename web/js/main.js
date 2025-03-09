import {obtenerToken} from './auth.js'; 
import {obtenerOrdenPorId,ObtenerIdVendedor,ObtenerIDpublicaciones,ObtenerDetallePublicaciones} from './api.js'; 
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
        accessToken = await obtenerToken(code);  
    }
    
    console.log("Token final:", accessToken);


 // Obtener id_vendedor
    try {
        const id_vendedor = await ObtenerIdVendedor(accessToken); // Asegúrate de pasar accessToken si es necesario
        console.log("ID del vendedor obtenido:", id_vendedor);

        if (!id_vendedor) {
            alert("No se pudo obtener el ID del vendedor.");
            return;
        }
        // Llamada a obtenerIDpublicaciones con id_vendedor
        try {
            const idPublicaciones = await ObtenerIDpublicaciones(accessToken, id_vendedor);
            console.log("ID de publicaciones obtenidas:", idPublicaciones);

            if (idPublicaciones && idPublicaciones.length > 0) {
                // Llamar a ObtenerDetallePublicaciones con los idPublicaciones obtenidos
                const detallesPublicaciones = await ObtenerDetallePublicaciones(accessToken, idPublicaciones);
                console.log("Detalles de publicaciones obtenidos:", detallesPublicaciones);

                if (detallesPublicaciones && detallesPublicaciones.length > 0) {
                    UI.mostrarPublicaciones(detallesPublicaciones);
                } else {
                    alert("No se encontraron detalles de publicaciones.");
                }
            } else {
                alert("No se encontraron ID de publicaciones.");
            }
        } catch (error) {
            console.error("Error obteniendo detalles de publicaciones:", error);
        }
            
    } catch (error) {
        console.error("Error obteniendo el ID del vendedor:", error);
        alert("Ocurrió un error al obtener el ID del vendedor.");
    }

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
