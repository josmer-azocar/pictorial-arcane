import axios from 'axios';
const url = "https://pictorialarcane-h5g8cdgug9d5awd3.canadacentral-01.azurewebsites.net";



export async function searchMemberships(
    startDate = null,
    endDate = null,
    status = "ACTIVE",
    page = 0,
    size = 10,
    sortBy = 'paymentDate',
    direction = 'DESC'          
) {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const params = {
            startDate: startDate,
            endDate: endDate,
            status: status,
            page: page,
            size: size,
            sortBy: sortBy,
            direction: direction
        };
        const memberships = await axios.get(`${url}/membership/search`, {
            params, headers });
        console.log("Datos de membresías:", memberships.data);
        return memberships.data;
        
    } catch (error) {
        console.error("Error fetching memberships:", error);
        throw error;
    }
}