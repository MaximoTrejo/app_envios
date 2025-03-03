// En archivo ui.js o como prefieras nombrarlo
class UI {
    static mostrarEnviosEnTabla(envios) {
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

    static mostrarOrdenEnTabla(envios) {
        const tablaOrden = document.getElementById('tabla-orden');
        tablaOrden.innerHTML = ''; // Limpiar la tabla

        envios.forEach(envio => {
            const fila = document.createElement('tr');

            const celdaId = document.createElement('td');
            celdaId.textContent = envio.id;

            const celdaComprador = document.createElement('td');
            celdaComprador.textContent = `${envio.buyer.first_name} ${envio.buyer.last_name}`;

            const celdaArticulo = document.createElement('td');
            celdaArticulo.textContent = item.title || "Sin título";

            const celdaIdEnvio = document.createElement('td');
            celdaIdEnvio.textContent = envio.shipping.id;

            const celdaEstado = document.createElement('td');
            celdaEstado.textContent = envio.status;

            const celdaFecha = document.createElement('td');
            celdaFecha.textContent = new Date(envio.date_created).toLocaleString();

            fila.appendChild(celdaId);
            fila.appendChild(celdaComprador);
            fila.appendChild(celdaArticulo);
            fila.appendChild(celdaIdEnvio);
            fila.appendChild(celdaEstado);
            fila.appendChild(celdaFecha);

            tablaOrden.appendChild(fila);
        });
    }
}

export default UI;
