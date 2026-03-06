import axios from "axios";
const url = "http://localhost:8080";


/*export async function showArtwork(page = 0, sortBy = '', direction = 'asc', art_genre = ''){
    try {
        const fetchedArtwork = await axios.get(`${url}/artwork/all?page=${page}`, {
            params: {
                page: page,
                sort: sortBy,
                dir: direction,
                genre: art_genre
            });
        console.log(fetchedArtwork);
        return fetchedArtwork.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function showArtist() {
    try{
      const fetchedArtist = await axios.get(`${url}/artist/all`, {timeout: 0});
        return fetchedArtist.data;

    } catch (error){
        console.log(error);
        throw error;
        return [];
    }
    
}*/


export async function showArtwork(page = 0, sortBy = '', direction = 'asc', genre = '') {
    return new Promise((resolve) => {
        setTimeout(() => {

          let allArtworks = [
                { id: 1, name: "Noche Estrellada", image: "https://picsum.photos/id/10/400/500", id_artist: 101, genre: "Impresionismo", precio: 100.00 },
                { id: 2, name: "La Persistencia de la Memoria", image: "https://picsum.photos/id/20/400/500", id_artist: 102, genre: "Surrealismo", precio: 110.00 },
                { id: 3, name: "El Grito", image: "https://picsum.photos/id/30/400/500", id_artist: 103, genre: "Expresionismo", precio: 150.00 },
                { id: 4, name: "Guernica", image: "https://picsum.photos/id/40/400/500", id_artist: 102, genre: "Cubismo", precio: 120.00 },
                { id: 5, name: "La Joven de la Perla", image: "https://picsum.photos/id/50/400/500", id_artist: 104, genre: "Barroco", precio: 190.00 },
                { id: 6, name: "El Nacimiento de Venus", image: "https://picsum.photos/id/60/400/500", id_artist: 105, genre: "Renacimiento", precio: 125.00 },
                { id: 7, name: "Las Meninas", image: "https://picsum.photos/id/70/400/500", id_artist: 106, genre: "Barroco", precio: 210.00 },
                { id: 8, name: "La Creación de Adán", image: "https://picsum.photos/id/80/400/500", id_artist: 107, genre: "Renacimiento", precio: 130.00 },
                { id: 9, name: "La Libertad guiando al pueblo", image: "https://picsum.photos/id/90/400/500", id_artist: 108, genre: "Romanticismo", precio: 175.00 },
                { id: 10, name: "Impresión, sol naciente", image: "https://picsum.photos/id/100/400/500", id_artist: 101, genre: "Impresionismo", precio: 95.00 },
                { id: 11, name: "El jardín de las delicias", image: "https://picsum.photos/id/110/400/500", id_artist: 109, genre: "Renacimiento", precio: 300.00 },
                { id: 12, name: "Composición VIII", image: "https://picsum.photos/id/120/400/500", id_artist: 110, genre: "Abstracto", precio: 140.00 }
            ];

            // 2. filtrar por genero
            if (genre) {
                allArtworks = allArtworks.filter(art => art.genre === genre);
            }

            // 3. precio
            if (sortBy === 'precio') {
                allArtworks.sort((a, b) => direction === 'asc' ? a.precio - b.precio : b.precio - a.precio);
            } else if (sortBy === 'name') {
                allArtworks.sort((a, b) => {
                    return direction === 'asc' 
                        ? a.name.localeCompare(b.name) 
                        : b.name.localeCompare(a.name);
                });
            }

            // 4. Paginacion
            const pageSize = 4;
            const startIndex = page * pageSize;
            const paginatedContent = allArtworks.slice(startIndex, startIndex + pageSize);

            resolve({
                content: paginatedContent,
                totalPages: Math.ceil(allArtworks.length / pageSize),
                totalElements: allArtworks.length,
                size: pageSize,
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
}

// *Artistas
// Trae un artista por su id - GET /artists/{id}
export async function getArtistById(id) {
  const url = `http://localhost:8080/artists/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener artista:", error);
    throw error;
  }
}

// *Obras 
// Trae todas las obras de un artista - GET /artworks?artistId={id}
export async function getArtworksByArtist(artistId) {
  const url = `http://localhost:8080/artworks?artistId=${artistId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener obras:", error);
    throw error;
  }
}
// Trae una obra por su id - GET /artworks/{id}
export async function getArtworkById(id) {
  const url = `http://localhost:8080/artworks/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener obra:", error);
    throw error;
  }
}
// Reserva una obra - POST /artworks/{id}/reserve
export async function reserveArtwork(artworkId, securityCode) {
  const url = `http://localhost:8080/artworks/${artworkId}/reserve`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ security_code: securityCode })
    });
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.error("Error al reservar obra:", error);
    throw error;
  }
}

/**
 * Crea una nueva escultura en el backend.
 * @param {object} sculptureData - Los datos de la escultura.
 * @param {string} token - El token de autenticación del administrador.
 */
export const createSculpture = async (sculptureData, token) => {
    // Endpoint: /admin/artworks/sculpture
    const response = await axios.post(`${url}/admin/artworks/sculpture`, sculptureData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
