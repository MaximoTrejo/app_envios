export function mostrarEnviosEnTabla(envios) {
    const tabla = document.getElementById("tabla-envios");
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    if (envios.length === 0) {
        // Si no hay pedidos, mostrar un mensaje en la tabla
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5" style="text-align: center;">No hay pedidos disponibles</td>`;
        tabla.appendChild(row);
        return;
    }

    envios.forEach(envio => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${envio.buyer ? envio.buyer.nickname : "Desconocido"}</td>
            <td>${envio.shipping ? envio.shipping.id : "N/A"}</td>
            <td>${envio.shipping ? envio.shipping.status : "Sin información"}</td>
            <td>${envio.date_created ? new Date(envio.date_created).toLocaleDateString() : "N/A"}</td>
        `;

        tabla.appendChild(row);
    });
}
