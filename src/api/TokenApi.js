import axios from 'axios';

const baseURL = 'http://localhost:3000'

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