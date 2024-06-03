import axios from 'axios';
import AuthService from '../helpers/AuthService';
import { baseURL } from '../config/config';

class StatisticsApi {
    static async post(endpoint, formValues) {
        try {
            const response = await axios.post(
                `${baseURL}${endpoint}`, 
                formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthService.getToken()
                    }
                }
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default StatisticsApi;