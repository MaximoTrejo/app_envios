require('dotenv').config();

export async function obtenerToken(code) {
    
    let Token_refresh = await refrescarToken();
    if (Token_refresh) {
        return Token_refresh;
    }else{
        console.error("Error en refrescar token", error);
        let Token_nuevo = await obtenerNuevoToken(code);
        if(Token_nuevo){
            return Token_nuevo;
        }else{
            console.error("Error al obtener un nuevo token:", error);
        }
    }

}

export async function refrescarToken() {

    url = API_ML_URL + API_CONTROL_URL_CREAR_TOKEN;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code_refresh: refreshToken,
            }),
        });

        if (response.ok) {
            console.error('Se refresco el token');
            return data.access_token;
        } else {
            console.error('Error al refrescar el token');
            return null;
        }
    
}

export async function obtenerNuevoToken(code) {

    url = API_ML_URL + API_CONTROL_URL_CREAR_TOKEN;

    let response = await fetch(url, {
        method: "POST",  
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ code }) 
    });


    if (response.ok) {
        console.error('Se creo el token');
        return data.access_token;  
    } else {
        const errorData = await response.json();
        throw new Error(`No se pudo obtener un nuevo token: ${errorData.message || response.statusText}`);
    }
}