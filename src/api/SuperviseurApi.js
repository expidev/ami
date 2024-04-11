import axios from 'axios';
import AuthService from '../helpers/AuthService';
import { baseURL } from '../config/config';

class SuperviseurApi {
    
    static async getSuperviseur(endpoint, id_ami) {
        try {
            id_ami = encodeURIComponent(id_ami)
            const response = await axios.get(
                `${baseURL}${endpoint}${id_ami}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthService.getToken()
                    }
                }
            );
            return response.data
    
        } catch (error) {
          console.error('Error retrieving data:', error);
          throw error;
        }
    }

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

    static async removeSuperviseur(id) {
        try {
            const response = await axios.delete(
                `${baseURL}/superviseur/${id}/`,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthService.getToken()
                    }}
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }  
    }
}

export default SuperviseurApi;