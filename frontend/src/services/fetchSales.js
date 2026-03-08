import axios from 'axios';

//const baseUrl = "http://localhost:8080";
const API_BASE_URL = import.meta.env.VITE_API_URL;
// GET /admin/getAllPendingSales
// Requiere rol ADMIN
export async function getPendingSales(token) {
  const response = await axios.get(`${API_BASE_URL}/admin/getAllPendingSales`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
//CONFRIMAR VENTA 
// PUT /admin/confirmPendingSale/{saleId}  ⚠️ Pendiente de backend
// Requiere rol ADMIN
export async function confirmPendingSale(saleId, paymentData, token) {
  const response = await axios.put(
    `${API_BASE_URL}/admin/confirmPendingSale/${saleId}`,
    paymentData,
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
  );
  return response.data;
}
//es la que se llama cuando el admin hace clic en "Cancelar" en la tabla de reservas.
// PUT /admin/rejectPendingSale/{saleId}
// Requiere rol ADMIN
export async function rejectPendingSale(saleId, token) {
  const response = await axios.put(
    `${API_BASE_URL}/admin/rejectPendingSale/${saleId}`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}


// Reserva una obra - POST /artworks/{id}/reserve
export async function reserveArtwork(artworkId, securityCode) {
  //const url = `http://localhost:8080/artworks/${artworkId}/reserve`;

  try {
    const response = await axios.post(`${API_BASE_URL}/artworks/${artworkId}/reserve`, {
      security_code: securityCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Si todo ok → devolvemos los datos
    return response.data;

  } catch (error) {
    
    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      console.error("Error al reservar obra:", error.response.status, error.response.data);
      throw new Error(`Error ${error.response.status}: ${error.response.data?.message || 'Fallo en la reserva'}`);
    } else if (error.request) {
      // No hubo respuesta del servidor (problema de red, timeout, etc)
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se pudo conectar con el servidor");
    } else {
      // Error al preparar la petición
      console.error("Error al preparar la petición:", error.message);
      throw error;
    }
  }
}