import axios from 'axios';

const baseURL = 'http://localhost:3000'

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