import axios from "axios";
const url = "http://localhost:8080";

const getProfile = async (token) => {
    try {
        const pfp = await axios.get(`${url}/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}` //deja de ser un request anónimo lo que no se puede dar con dashboard estando protegida
            }});
        console.log(pfp);
        return pfp.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getProfile