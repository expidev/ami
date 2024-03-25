import axios from 'axios';

const baseURL = 'http://localhost:3000'

class AdminApi {
    
    static async getList(endpoint) {
        try {
            const response = await axios.get(
                `${baseURL}${endpoint}`);
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default AdminApi;