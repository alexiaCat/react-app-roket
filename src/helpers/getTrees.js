export const getTrees = async () => {
    const url = 'https://aqh.fitsnr.com/api/aqh/objects';
    let trees = [];

    try {
        const response = await fetch(url, {
            headers: {
                'X-token': '5Dt4y4fN1Eh8lX1cFKtO'
            }
        });

        if (!response.ok) {
            throw new Error('La respuesta de la red no fue satisfactoria.');
        }

        const { objetos } = await response.json();
        trees = objetos.map(tree => ({
            object_name: tree.object_name,
            image_url: tree.image_url,
            lat: tree.lat,
            lon: tree.lon,
            zoom: 15
        }));
        
    } catch (error) {
        console.error('Hubo un problema con la operación de búsqueda:', error);
    }

    return trees;
}
