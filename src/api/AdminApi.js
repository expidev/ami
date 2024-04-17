import axios from 'axios';
import { baseURL } from '../config/config';

class AdminApi {
    
    static async post(body) {
        const response = await axios.post(
            `${baseURL}/signin`, 
            body
        );
        return response.data
    }

    static async logout() {
        await axios.post(`${baseURL}/logout`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default AdminApi;