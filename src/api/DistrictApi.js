import axios from 'axios';
import { baseURL } from '../config/config';

class DistrictApi {
    static async getDistrict(endpoint) {
        try {
            const response = await axios.get(
                `${baseURL}${endpoint}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data

        } catch (error) {
          console.error('Error retrieving data:', error);
          throw error;
        }
    }
}

export default DistrictApi;