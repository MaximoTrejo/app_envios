export function mostrarEnviosEnTabla(envios) {
    const tabla = document.getElementById("tabla-envios");
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    if (envios.length === 0) {
        // Si no hay envíos, mostrar un mensaje en la tabla
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" style="text-align: center;">No hay envíos disponibles</td>`;
        tabla.appendChild(row);
        return;
    }

    envios.forEach(envio => {
        const row = document.createElement("tr");

        // Extraer los valores desde el JSON
        const idEnvio = envio.tracking_number || "Sin ID";
        const comprador = envio.destination.receiver_name || "Desconocido";
        const estadoEnvio = envio.status || "Sin información";
        const fechaCreacion = envio.date_created ? new Date(envio.date_created).toLocaleDateString() : "N/A";
        const direccionEnvio = envio.destination.shipping_address ? envio.destination.shipping_address.address_line : "Sin dirección";

        row.innerHTML = `
            <td>${idEnvio}</td>
            <td>${comprador}</td>
            <td>${estadoEnvio}</td>
            <td>${direccionEnvio}</td>
            <td>${fechaCreacion}</td>
        `;

        tabla.appendChild(row);
    });
}