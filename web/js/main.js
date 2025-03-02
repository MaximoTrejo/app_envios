document.addEventListener("DOMContentLoaded", async function () {
    const accessToken = await obtenerToken();

    if (!accessToken) {
        console.log("No se pudo obtener el token de acceso.");
        return;
    }

    // Asignar el evento para filtrar envíos
    document.getElementById("estado-envios").addEventListener("change", async function () {
        const estadoSeleccionado = this.value;

        if (!estadoSeleccionado) {
            console.log("Por favor, selecciona un estado de envío.");
            return;
        }

        const envios = await obtenerEnvios(accessToken, estadoSeleccionado);

        if (envios && envios.length > 0) {
            mostrarEnviosEnTabla(envios);
        } else {
            console.log("No se encontraron envíos para el estado seleccionado.");
        }
    });
});
