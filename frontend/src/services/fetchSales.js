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
// PUT /admin/confirmPendingSale/{saleId}  
// Requiere rol ADMIN
export async function confirmPendingSale(saleId, paymentData, token) {
  const response = await axios.post(
    `${API_BASE_URL}/admin/confirmSale/${saleId}`,
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
export async function reserveArtwork(artworkId, securityCode, token) {
  try {
    const response = await axios.post(`${API_BASE_URL}/sale/reserve`, null, {
      params: {
        id_obra: artworkId,
        security_code: securityCode
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error; // lo maneja ArtworkDetail
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
}