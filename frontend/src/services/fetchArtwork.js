import axios from "axios";
const url = "http://localhost:8080";


export async function showArtwork(page = 0){
    try {
        const fetchedArtwork = await axios.get(`${url}/artwork?page=${page}`, {timeout: 0});
        console.log(fetchedArtwork);
        return fetchedArtwork.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function showArtist() {
    try{
        const fetchedArtist = await axios.get(`${url}/artist`, {timeout: 0});
        return fetchedArtist.data;

    } catch (error){
        console.log(error);
        throw error;
        return [];
    }
    
}


/*export async function showArtwork(page = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const page0 = [
                { id: 1, name: "Noche Estrellada", image: "https://picsum.photos/id/10/400/500", id_artist: 101, description: "Un cielo vibrante", precio: 100.00 },
                { id: 2, name: "La Persistence de la Memoria", image: "https://picsum.photos/id/20/400/500", id_artist: 102, description: "Relojes derretidos", precio: 100.00 },
                { id: 3, name: "El Grito", image: "https://picsum.photos/id/30/400/500", id_artist: 103, description: "Expresión pura", precio: 150.00 },
                { id: 4, name: "Guernica", image: "https://picsum.photos/id/40/400/500", id_artist: 102, description: "Guerra y paz", precio: 120.00 }
            ];

            const page1 = [
                { id: 5, name: "La Joven de la Perla", image: "https://picsum.photos/id/50/400/500", id_artist: 104, description: "Mirada enigmática", precio: 190.00 },
                { id: 6, name: "El Nacimiento de Venus", image: "https://picsum.photos/id/60/400/500", id_artist: 105, description: "Belleza clásica", precio: 120.00 },
                { id: 7, name: "Las Meninas", image: "https://picsum.photos/id/70/400/500", id_artist: 106, description: "Perspectiva real", precio: 210.00 },
                { id: 8, name: "La Creación de Adán", image: "https://picsum.photos/id/80/400/500", id_artist: 107, description: "Toque divino", precio: 120.00 }
            ];

            resolve({

                content: page === 0? page0 : page1,
                totalPages: 5, 
                totalElements: 20,
                size: 4,
                number: page 
            });
        }, 500);
    });
}

export async function showArtist() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, name: "Vincent van Gogh" },
                { id: 102, name: "Salvador Dalí" },
                { id: 103, name: "Edvard Munch" },
                { id: 104, name: "Johannes Vermeer" },
                { id: 105, name: "Sandro Botticelli" },
                { id: 106, name: "Diego Velázquez" },
                { id: 107, name: "Miguel Ángel" }
            ]);
        }, 100);
    });
}*/