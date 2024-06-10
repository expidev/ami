import { baseApi } from './api';

class VisitorApi {
    
    static async post(body) {
        try {
            const response = await baseApi.post(
                "/visiteur",
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