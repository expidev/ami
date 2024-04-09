import axios from 'axios';
import { baseURL } from '../config/config';

class AdminApi {
    
    static async post(endpoint, body) {
        const response = await axios.post(
            `${baseURL}${endpoint}`, 
            body
        );
        return response.data
    }
}

export default AdminApi;