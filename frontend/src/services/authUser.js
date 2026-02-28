import axios from 'axios';
const url = "http://localhost:8080/auth";


/*export async function logUser(credentials){

    const response = await axios.post(`${url}/login`, credentials);
    return response.data;
}*/

export async function registerUser(credentials) {
    const response = await axios.post(`${url}/signUp`, credentials);
    return response.data;
}

export async function logUser(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === "test@test.com" && credentials.password === "12345678") {
        resolve({
          status: "success",
          user: { name: "Tester", email: "test@test.com" },
          token: "fake-jwt-token-123"
        });
        console.log("Exito");
      } else {
        reject(new Error("Email o contraseña equivocados"));
      }
    }, 1500);
  });
}

//funcion para hacer pruebas

/*export async function registerUser(credentials) {
    console.log("Registro de prueba:", credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        success: true,
        message: "Usuario creado (MOCK)",
        user: credentials.nombre
    };
}*/

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
/*hola*/

