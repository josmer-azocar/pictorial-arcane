import axios from "axios";
const url = "http://localhost:8080";


/*export async function showArtwork(){
    try {
        const fetchedArtwork = await axios.get(`${url}/artwork`, {timeout: 500});
        console.log(fetchedArtwork);
        return fetchedArtwork.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function showArtist() {
    try{
        const fetchedArtist = await axios.get(`${url}/artist`, {timeout: 500});
        return fetchedArtist.data;

    } catch (error){
        console.log(error);
        throw error;
        return [];
    }
    
}
*/

export async function showArtwork(){
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Noche Estrellada", image: "https://picsum.photos/id/10/400/500", id_artist: 101, description: "Un cielo vibrante" },
                { id: 2, name: "La Persistence de la Memoria", image: "https://picsum.photos/id/20/400/500", id_artist: 102, description: "Relojes derretidos" },
                { id: 3, name: "El Grito", image: "https://picsum.photos/id/30/400/500", id_artist: 103, description: "Expresión pura" },
                { id: 4, name: "Guernica", image: "https://picsum.photos/id/40/400/500", id_artist: 102, description: "Guerra y paz" }
            ])
        }, 700)
    })
}

export async function showArtist() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, name: "Vincent van Gogh" },
                { id: 102, name: "Salvador Dalí" },
                { id: 103, name: "Edvard Munch" },
            ]);
        }, 700);
    });
}