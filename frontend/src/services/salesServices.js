import axios from "axios";

const API_URL = 'http://localhost:8080/api/sales';

export const getSoldArtworks = async (startDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/report`, {
            params: {
                start: startDate,
                end: endDate
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error buscando los datos de compra:", error);
        throw error;
    }
};