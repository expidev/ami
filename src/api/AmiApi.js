import axios from 'axios';
import AuthService from '../helpers/AuthService';

const baseURL = 'http://localhost:3000'

class AdminApi {
    
    static async getListByPage(endpoint, page) {
        try {
            const response = await axios.get(
                `${baseURL}${endpoint}/${page}`, {
                    headers: {
                        'Accept': 'application/json',
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

    static async countPage(endpoint) {
        try {
            const response = await axios.get(
                `${baseURL}${endpoint}`, {
                    headers: {
                        'Accept': 'application/json',
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

    static async getAmiById(id_ami) {
        try {
            const response = await axios.get(
                `${baseURL}/ami/${id_ami}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthService.getToken()
                    }
                }
            );
            return response.data[0]
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async searchAmiById(id_ami) {
        try {
            const response = await axios.get(
                `${baseURL}/search/${id_ami}`, {
                    headers: {
                        'Accept': 'application/json',
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

export default AdminApi;