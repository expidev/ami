import axios from 'axios';

const baseURL = 'http://localhost:3000'

class VisitorApi {
    
    static async post(endpoint, body) {
        try {
            const response = await axios.post(
                `${baseURL}${endpoint}`, 
                body
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default VisitorApi;