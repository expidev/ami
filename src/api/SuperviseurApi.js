import { protectedApi } from './api';

class SuperviseurApi {
    
    static async getSuperviseur(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami)
            const response = await protectedApi.get(
                `/superviseur/${ref_ami}`
            );
            return response.data
    
        } catch (error) {
          console.error('Error retrieving data:', error);
          throw error;
        }
    }

    static async post(formValues) {
        try {

            const response = await protectedApi.post(
                '/superviseur/', 
                formValues,
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async removeSuperviseur(id) {
        try {
            const response = await protectedApi.delete(
                `/superviseur/${id}/`
            );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }  
    }
}

export default SuperviseurApi;