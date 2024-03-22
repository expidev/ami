import axios from 'axios';

const baseURL = 'http://localhost:3000'

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
                        'Content-Type': 'multipart/form-data'
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

export default DocumentApi;