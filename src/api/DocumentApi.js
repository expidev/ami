import axios from 'axios';
import AuthService from '../helpers/AuthService';
import { baseURL } from '../config/config';

class DocumentApi {
    
    static async post(endpoint, formValues) {
        try {
            const formData = new FormData();
            Object.keys(formValues).forEach((key) => {
                formData.append(key, formValues[key]);
            })
          
            const response = await axios.post(
                `${baseURL}${endpoint}`, 
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

    static async getDocumentByAmi(id_ami) {
        try {
            id_ami = encodeURIComponent(id_ami);
            const response = await axios.get(
                `${baseURL}/documents/${id_ami}`,{
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

    static async getUserDocumentByAmi(id_ami, token) {
        try {
            id_ami = encodeURIComponent(id_ami);
            const response = await axios.get(
                `${baseURL}/documents/${id_ami}/${token}`,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }}
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async removeDocument(id_fichier, nom_fichier) {
        try {
            const response = await axios.delete(
                `${baseURL}/documents/${id_fichier}/${nom_fichier}`,{
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

    static async downloadDocument(type_fichier, nom_fichier) {
        try {
            const response = await axios.post(
                `${baseURL}/download/`, 
                {type_fichier, nom_fichier}, {
                    responseType: 'blob',
                }
            );
            return response
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }  
    }

    static async downloadZip(id_ami) {
        try {
          id_ami = encodeURIComponent(id_ami);
          const response = await axios.get(
            `${baseURL}/download/${id_ami}`,
            { responseType: 'blob' }
          );
          return response;
        } catch (error) {
          console.error('Error downloading zip file:', error);
          throw error;
        }
    }
}

export default DocumentApi;