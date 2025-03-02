document.addEventListener("DOMContentLoaded", function () {
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

    // Obtener el parámetro 'code' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
        console.log("Código de autorización recibido:", authCode);
    } else {
        console.log("No se recibió código de autorización.");
    }


    const data = {
        client_id: '5174586942693408',
        client_secret: 'QW3yOIAUHqbQk1sg7ypmdxBVPbgpUFNt',
        code: authCode,
        grant_type: 'authorization_code',
        redirect_uri: 'https://maximotrejo.github.io/app_envios/web/index.html'
      };
      
      fetch('https://api.mercadolibre.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      })
        .then(response => response.json())
        .then(data => console.log(data));  // Aquí obtendrás el access token

});
