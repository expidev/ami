import { baseApi, protectedApi } from './api';

class DocumentApi {
    
    static async post(formValues) {
        try {
            const formData = new FormData();
    
            // Append non-file fields
            Object.keys(formValues).forEach((key) => {
                if (key !== 'files') {
                    formData.append(key, formValues[key]);
                } else {
                    // Append files
                    for (const file of formValues.files) {
                        formData.append('files', file.fichier); // Ensure file.fichier is the actual file object
                    }
                }
            });
    
            // Send the form data to the backend
            const response = await protectedApi.post('/ajout', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
    
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    }
    
    static async getDocumentByRef(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami);
            const response = await protectedApi.get(`/documents/${ref_ami}`);

            return response.data
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async getUserDocumentByAmi(ref_ami, token) {
        try {
            ref_ami = encodeURIComponent(ref_ami);
            const response = await baseApi.get(
                `/documents/${ref_ami}/${token}`
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async removeDocument(id_fichier, nom_fichier) {
        try {
            const response = await protectedApi.delete(
                `/documents/${id_fichier}/${nom_fichier}`
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }  
    }

    static async downloadDocument(type_fichier, nom_fichier) {
        try {
            const response = await baseApi.post(
                `/download/`, 
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

    static async downloadZip(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami);
          const response = await baseApi.get(
            `/download/${ref_ami}`,
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