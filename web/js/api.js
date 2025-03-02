export async function obtenerEnvios(accessToken, estado) {
    const url = `https://api.mercadolibre.com/orders/search?seller=TU_USER_ID&order.status=${estado}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error obteniendo los envíos:", error);
        return [];
    }
}