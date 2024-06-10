import { baseApi } from './api';

class RegionApi {
    static async getRegion() {
        try {
            const response = await baseApi.get("/position/region");
            return response.data

        } catch (error) {
          console.error('Error retrieving data:', error);
          throw error;
        }
    }
}

export default RegionApi;