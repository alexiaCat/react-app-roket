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
            throw new Error('Network response was not ok');
        }

        const { objetos } = await response.json();
        console.log(objetos);
        trees = objetos.map(tree => ({
            object_name: tree.object_name,
            image_url: tree.image_url,
            lat: tree.lat,
            lon: tree.lon
        }));
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    return trees;
}
