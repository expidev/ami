import { protectedApi } from './api';

class StatisticsApi {
    static async post(formValues) {
        try {
            const response = await protectedApi.post(
                '/statistics', 
                formValues
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default StatisticsApi;