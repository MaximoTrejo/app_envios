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
        // Accede directamente al array de publicaciones
        const publicaciones = json; // Ya es un array, no necesitas acceder a json[0].body
        
        // Obtiene el tbody donde se insertarán las filas
        const tablaOrden = document.getElementById('tabla-orden');
        
        // Asegúrate de limpiar la tabla antes de agregar nuevas filas
        tablaOrden.innerHTML = '';
        
        // Crea una fila para cada publicación
        publicaciones.forEach(publicacion => {
            // Crea una nueva fila de tabla
            const fila = document.createElement('tr');
            
            // Crea y agrega cada celda
            const idCelda = document.createElement('td');
            idCelda.textContent = publicacion.id; // ID de la publicación
            fila.appendChild(idCelda);
            
            const compradorCelda = document.createElement('td');
            compradorCelda.textContent = publicacion.seller_id; // ID del vendedor como comprador
            fila.appendChild(compradorCelda);
            
            const articuloCelda = document.createElement('td');
            articuloCelda.textContent = publicacion.title; // Título del artículo
            fila.appendChild(articuloCelda);
            
            const envioCelda = document.createElement('td');
            envioCelda.textContent = publicacion.shipping ? publicacion.shipping.mode : 'No especificado'; // Modo de envío (verificación adicional)
            fila.appendChild(envioCelda);
            
            const estadoCelda = document.createElement('td');
            estadoCelda.textContent = publicacion.status || 'Estado no disponible'; // Estado de la publicación (verificación adicional)
            fila.appendChild(estadoCelda);
            
            const fechaCelda = document.createElement('td');
            fechaCelda.textContent = publicacion.date_created || 'Fecha no disponible'; // Fecha de creación (verificación adicional)
            fila.appendChild(fechaCelda);
    
            // Agrega la fila al cuerpo de la tabla
            tablaOrden.appendChild(fila);
        });
    }
    
    
}

export default UI;
