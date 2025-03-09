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
            celdaArticulo.textContent = envio.order_items?.[0]?.item?.title || "Sin título";

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

    static mostrarPublicaciones(json) {
        // Validar que json sea un array antes de acceder a sus propiedades
        if (!Array.isArray(json)) {
            console.log("Error: json no es un array válido", json);
            json = []; // Asignar un array vacío para evitar errores
        }
    
        // Obtiene el tbody donde se insertarán las filas
        const tablaOrden = document.getElementById('tabla-orden');
    
        // Verificar si la tabla existe
        if (!tablaOrden) {
            console.log("Error: No se encontró el elemento con id 'tabla-orden'");
            return;
        }
    
        // Asegúrate de limpiar la tabla antes de agregar nuevas filas
        tablaOrden.innerHTML = '';
    
        // Si el array está vacío, agrega una fila que diga "Sin datos"
        if (json.length === 0) {
            const fila = document.createElement('tr');
            const celdaSinDatos = document.createElement('td');
            celdaSinDatos.colSpan = 7; // Asegurar que cubre todas las columnas
            celdaSinDatos.textContent = 'Sin datos';
            celdaSinDatos.classList.add('sin-datos');
            fila.appendChild(celdaSinDatos);
            tablaOrden.appendChild(fila);
            return;
        }
    
        // Si hay datos, crea una fila para cada publicación
        json.forEach(publicacion => {
            const fila = document.createElement('tr');
    
            const idCelda = document.createElement('td');
            idCelda.textContent = publicacion.id || 'N/A';
            fila.appendChild(idCelda);
    
            const compradorCelda = document.createElement('td');
            compradorCelda.textContent = publicacion.seller_id || 'N/A';
            fila.appendChild(compradorCelda);
    
            const articuloCelda = document.createElement('td');
            articuloCelda.textContent = publicacion.title || 'N/A';
            fila.appendChild(articuloCelda);
    
            const envioCelda = document.createElement('td');
            envioCelda.textContent = publicacion.shipping ? publicacion.shipping.mode : 'No especificado';
            fila.appendChild(envioCelda);
    
            const estadoCelda = document.createElement('td');
            estadoCelda.textContent = publicacion.status || 'Estado no disponible';
            fila.appendChild(estadoCelda);
    
            const fechaCelda = document.createElement('td');
            fechaCelda.textContent = publicacion.date_created || 'Fecha no disponible';
            fila.appendChild(fechaCelda);
    
            // Crea la celda para el botón "Ver Envío"
            const accionesCelda = document.createElement('td');
            const verEnvioButton = document.createElement('button');
            verEnvioButton.textContent = 'Ver Envíos';
            verEnvioButton.classList.add('btn-ver-envios');
    
            // Si json.length === 0, deshabilitar el botón
            verEnvioButton.disabled = json.length === 0;
            accionesCelda.appendChild(verEnvioButton);
            fila.appendChild(accionesCelda);
    
            // Agrega la fila al cuerpo de la tabla
            tablaOrden.appendChild(fila);
        });
    }
    
    
}

export default UI;
