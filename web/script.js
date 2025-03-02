document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let area = document.getElementById('area').value;
    let nombre = document.getElementById('nombre').value;
    let fechaDesde = document.getElementById('fecha-desde').value;
    let fechaHasta = document.getElementById('fecha-hasta').value;

    // Aquí puedes agregar la lógica para manejar los filtros o enviar la consulta.
    console.log('Área:', area);
    console.log('Nombre:', nombre);
    console.log('Fecha Desde:', fechaDesde);
    console.log('Fecha Hasta:', fechaHasta);
});
