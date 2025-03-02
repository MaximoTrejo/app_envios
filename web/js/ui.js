export function mostrarEnviosEnTabla(envios) {
    const tabla = document.getElementById("tabla-envios");
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    envios.forEach(envio => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${envio.id}</td>
            <td>${envio.buyer.nickname}</td>
            <td>${envio.shipping.id}</td>
            <td>${envio.shipping.status}</td>
            <td>${new Date(envio.date_created).toLocaleDateString()}</td>
        `;

        tabla.appendChild(row);
    });
}