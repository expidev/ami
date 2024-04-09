import axios from 'axios';
import { baseURL } from '../config/config';

class TokenApi {
    static async getCheckToken(token) {
        try {
            const response = await axios.get(
                `${baseURL}/token/${token}`
            );
            return response.data
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default TokenApi;