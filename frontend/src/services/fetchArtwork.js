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

/*PATRICIA SE DEBE BORRAR Y CONSUMIR EL ENDPOINT
funciones mock para mostrar obras y artistas sin necesidad de backend. Esto nos permite 
avanzar con el desarrollo del frontend mientras el backend se termina de implementar. 
Estas funciones simulan llamadas a la API y devuelven datos predefinidos después de 
un pequeño retraso para imitar la latencia real de una solicitud HTTP.*/
export async function showArtwork(page = 0, sortBy = '', direction = 'asc', genre = '') {
  return new Promise((resolve) => {
      setTimeout(() => {

          let allArtworks = [
              { id: 1, name: "Noche Estrellada", image: "https://picsum.photos/id/10/400/500", id_artist: 101, genre: "Impresionismo", type: "PAINTING", precio: 100.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Postimpresionismo', framed: 'true', width: 92, height: 73 },
              { id: 2, name: "La Persistencia de la Memoria", image: "https://picsum.photos/id/20/400/500", id_artist: 102, genre: "Surrealismo", type: "PAINTING", precio: 110.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Surrealismo', framed: 'false', width: 33, height: 24 },
              { id: 3, name: "El Grito", image: "https://picsum.photos/id/30/400/500", id_artist: 103, genre: "Expresionismo", type: "PAINTING", precio: 150.00, status: 'RESERVED', technique: 'Óleo, temple y pastel sobre cartón', holder: 'Cartón', style: 'Expresionismo', framed: 'true', width: 73.5, height: 91 },
              { id: 4, name: "El Pensador", image: "https://picsum.photos/id/40/400/500", id_artist: 102, genre: "Realismo", type: "SCULPTURE", precio: 120.00, status: 'AVAILABLE', material: 'Bronce', weight: 650, length: 60, width: 80, depth: 145 },
              { id: 5, name: "La Joven de la Perla", image: "https://picsum.photos/id/50/400/500", id_artist: 104, genre: "Barroco", type: "PAINTING", precio: 190.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Barroco', framed: 'true', width: 39, height: 44.5 },
              { id: 6, name: "El Nacimiento de Venus", image: "https://picsum.photos/id/60/400/500", id_artist: 105, genre: "Renacimiento", type: "PAINTING", precio: 125.00, status: 'AVAILABLE', technique: 'Temple sobre lienzo', holder: 'Lienzo', style: 'Renacimiento', framed: 'false', width: 278.5, height: 172.5 },
              { id: 7, name: "Ansel Adams en Yosemite", image: "https://picsum.photos/id/70/400/500", id_artist: 106, genre: "Paisaje", type: "PHOTOGRAPHY", precio: 210.00, status: 'AVAILABLE', printType: 'Gelatin silver print', resolution: 'N/A', color: 'B&N', serialNumber: '1/1', camera: 'view camera' },
              { id: 8, name: "Jarrón Griego", image: "https://picsum.photos/id/80/400/500", id_artist: 107, genre: "Clásico", type: "CERAMIC", precio: 130.00, status: 'AVAILABLE', materialType: 'Terracota', technique: 'Figura roja', finish: 'Esmaltado', cookingTemperature: 900, weight: 5, width: 20, height: 35 },
              { id: 9, name: "Anillo de la Corona", image: "https://picsum.photos/id/90/400/500", id_artist: 108, genre: "Joyería", type: "GOLDSMITH", precio: 175.00, status: 'RESERVED', material: 'Oro 24k', preciousStones: 'Diamante, 12 Zafiros', weight: 250 },
              { id: 10, name: "Impresión, sol naciente", image: "https://picsum.photos/id/100/400/500", id_artist: 101, genre: "Impresionismo", type: "PAINTING", precio: 95.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Impresionismo', framed: 'true', width: 63, height: 48 },
              { id: 11, name: "David", image: "https://picsum.photos/id/110/400/500", id_artist: 109, genre: "Renacimiento", type: "SCULPTURE", precio: 300.00, status: 'AVAILABLE', material: 'Mármol', weight: 5660, length: 199, width: 199, depth: 517 },
              { id: 12, name: "Composición VIII", image: "https://picsum.photos/id/120/400/500", id_artist: 110, genre: "Abstracto", type: "PAINTING", precio: 140.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Abstracto', framed: 'false', width: 201, height: 140 }
          ];

            // filtrar por genero
            if (genre) {
                allArtworks = allArtworks.filter(art => art.genre === genre);
            }

            // precio
            if (sortBy === 'precio') {
                allArtworks.sort((a, b) => direction === 'asc' ? a.precio - b.precio : b.precio - a.precio);
            } else if (sortBy === 'name') {
                allArtworks.sort((a, b) => {
                    return direction === 'asc' 
                        ? a.name.localeCompare(b.name) 
                        : b.name.localeCompare(a.name);
                });
            }

            // Paginacion
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
  const url =`http://localhost:8080/artist/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener artista:", error);
    throw error;
  }
}

// *Obras 
// Trae todas las obras de un artista - GET /artwork/search?idArtist={artistId}
export async function getArtworksByArtist(artistId) {
  const url = `http://localhost:8080/artwork/search?idArtist=${artistId}`;
  try {
    const response = await axios.get(url);
    return response.data.content;
  } catch (error) {
    console.error("Error al obtener obras:", error);
    throw error;
  }
}
/*
// Trae una obra por su id - GET /artworks/{id}
export async function getArtworkById(id) {
  const url = `http://localhost:8080/artworks/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener obra:", error);
    throw error;
  }
}
*/

// Mock para obtener una obra por ID
export async function getArtworkById(id) {
  const allArtworks = [
      { id: 1, name: "Noche Estrellada", image: "https://picsum.photos/id/10/400/500", id_artist: 101, genre: "Impresionismo", type: "PAINTING", precio: 100.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Postimpresionismo', framed: 'true', width: 92, height: 73 },
      { id: 2, name: "La Persistencia de la Memoria", image: "https://picsum.photos/id/20/400/500", id_artist: 102, genre: "Surrealismo", type: "PAINTING", precio: 110.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Surrealismo', framed: 'false', width: 33, height: 24 },
      { id: 3, name: "El Grito", image: "https://picsum.photos/id/30/400/500", id_artist: 103, genre: "Expresionismo", type: "PAINTING", precio: 150.00, status: 'RESERVED', technique: 'Óleo, temple y pastel sobre cartón', holder: 'Cartón', style: 'Expresionismo', framed: 'true', width: 73.5, height: 91 },
      { id: 4, name: "El Pensador", image: "https://picsum.photos/id/40/400/500", id_artist: 102, genre: "Realismo", type: "SCULPTURE", precio: 120.00, status: 'AVAILABLE', material: 'Bronce', weight: 650, length: 60, width: 80, depth: 145 },
      { id: 5, name: "La Joven de la Perla", image: "https://picsum.photos/id/50/400/500", id_artist: 104, genre: "Barroco", type: "PAINTING", precio: 190.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Barroco', framed: 'true', width: 39, height: 44.5 },
      { id: 6, name: "El Nacimiento de Venus", image: "https://picsum.photos/id/60/400/500", id_artist: 105, genre: "Renacimiento", type: "PAINTING", precio: 125.00, status: 'AVAILABLE', technique: 'Temple sobre lienzo', holder: 'Lienzo', style: 'Renacimiento', framed: 'false', width: 278.5, height: 172.5 },
      { id: 7, name: "Ansel Adams en Yosemite", image: "https://picsum.photos/id/70/400/500", id_artist: 106, genre: "Paisaje", type: "PHOTOGRAPHY", precio: 210.00, status: 'AVAILABLE', printType: 'Gelatin silver print', resolution: 'N/A', color: 'B&N', serialNumber: '1/1', camera: 'view camera' },
      { id: 8, name: "Jarrón Griego", image: "https://picsum.photos/id/80/400/500", id_artist: 107, genre: "Clásico", type: "CERAMIC", precio: 130.00, status: 'AVAILABLE', materialType: 'Terracota', technique: 'Figura roja', finish: 'Esmaltado', cookingTemperature: 900, weight: 5, width: 20, height: 35 },
      { id: 9, name: "Anillo de la Corona", image: "https://picsum.photos/id/90/400/500", id_artist: 108, genre: "Joyería", type: "GOLDSMITH", precio: 175.00, status: 'RESERVED', material: 'Oro 24k', preciousStones: 'Diamante, 12 Zafiros', weight: 250 },
      { id: 10, name: "Impresión, sol naciente", image: "https://picsum.photos/id/100/400/500", id_artist: 101, genre: "Impresionismo", type: "PAINTING", precio: 95.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Impresionismo', framed: 'true', width: 63, height: 48 },
      { id: 11, name: "David", image: "https://picsum.photos/id/110/400/500", id_artist: 109, genre: "Renacimiento", type: "SCULPTURE", precio: 300.00, status: 'AVAILABLE', material: 'Mármol', weight: 5660, length: 199, width: 199, depth: 517 },
      { id: 12, name: "Composición VIII", image: "https://picsum.photos/id/120/400/500", id_artist: 110, genre: "Abstracto", type: "PAINTING", precio: 140.00, status: 'AVAILABLE', technique: 'Óleo sobre lienzo', holder: 'Lienzo', style: 'Abstracto', framed: 'false', width: 201, height: 140 }
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const artwork = allArtworks.find(art => art.id === id);
      if (artwork) {
        resolve(artwork);
      } else {
        reject(new Error("Artwork not found"));
      }
    }, 300);
  });
}
// Reserva una obra - POST /artworks/{id}/reserve
export async function reserveArtwork(artworkId, securityCode) {
  const url = `http://localhost:8080/artworks/${artworkId}/reserve`;
  try {
    const response = await axios.post(url, {
      security_code: securityCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
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
    const response = await axios.post(`${url}/artwork/sculpture/add`, sculptureData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/**
 * Crea una nueva fotografía en el backend.
 * @param {object} photographyData - Los datos de la fotografía.
 * @param {string} token - El token de autenticación del administrador.
 */
export const createPhotography = async (photographyData, token) => {
    const response = await axios.post(`${url}/artwork/photography/add`, photographyData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/**
 * Crea una nueva ceramica en el backend.
 * @param {object} ceramicData - Los datos de la cerámica.
 * @param {string} token - El token de autenticación del administrador.
 */
export const createCeramic = async (ceramicData, token) => {
    const response = await axios.post(`${url}/artwork/ceramic/add`, ceramicData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/**
 * Crea una nueva pintura en el backend.
 * @param {object} paintingData - Los datos de la pintura.
 * @param {string} token - El token de autenticación del administrador.
 */
export const createPainting = async (paintingData, token) => {
    const response = await axios.post(`${url}/artwork/painting/add`, paintingData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/**
 * Crea una nueva pieza de orfebrería en el backend.
 * @param {object} goldsmithData - Los datos de la orfebrería.
 * @param {string} token - El token de autenticación del administrador.
 */
export const createGoldsmith = async (goldsmithData, token) => {
    const response = await axios.post(`${url}/artwork/goldsmith/add`, goldsmithData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

/**
 * Sube una imagen para una obra de arte.
 * @param {number} artworkId - El ID de la obra para la que se sube la imagen.
 * @param {File} file - El archivo de imagen a subir.
 * @param {string} token - El token de autenticación del administrador.
 * @returns {Promise<any>} La respuesta del servidor.
 */
export const uploadArtworkImage = async (artworkId, file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    return await axios.post(`${url}/admin/${artworkId}/artorkImage`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};

// --- MOCKS PARA ACTUALIZAR OBRAS (Para pruebas sin backend) BORRAR ---

export const updateSculpture = async (id, data, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock Update Sculpture:", id, data);
            resolve({ success: true, message: "Escultura actualizada (Mock)" });
        }, 1000);
    });
};

export const updatePainting = async (id, data, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock Update Painting:", id, data);
            resolve({ success: true, message: "Pintura actualizada (Mock)" });
        }, 1000);
    });
};

export const updatePhotography = async (id, data, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: "Fotografía actualizada (Mock)" });
        }, 1000);
    });
};

export const updateCeramic = async (id, data, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: "Cerámica actualizada (Mock)" });
        }, 1000);
    });
};

export const updateGoldsmith = async (id, data, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: "Orfebrería actualizada (Mock)" });
        }, 1000);
    });
};

export const uploadArtistImage = async (artistId, file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(`${url}/admin/${artistId}/artistImage`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};
