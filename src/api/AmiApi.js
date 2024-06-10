import { baseApi, protectedApi } from './api';

class AmiApi {
    
    static async getListByPage(page) {
        try {
            const response = await protectedApi.get(`/ami/page/${page}` );
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async countPage() {
        try {
            const response = await protectedApi.get("/ami/");
            return response.data
    
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async getAmiByRef(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami)
            const response = await baseApi.get(`/ami/${ref_ami}`);
            return response.data[0]
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async removeAmiByRef(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami)
            const response = await protectedApi.delete(`/ami/${ref_ami}`);
            return response
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }

    static async searchAmiByRef(ref_ami) {
        try {
            ref_ami = encodeURIComponent(ref_ami)
            const response = await protectedApi.get(`/search/${encodeURIComponent(ref_ami)}`);
            return response.data
        } catch (error) {
          console.error('Error posting data:', error);
          throw error;
        }
    }
}

export default AmiApi;