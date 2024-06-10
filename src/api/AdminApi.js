import { baseApi, protectedApi } from './api';

class AdminApi {
    
    static async signin(body) {
        const response = await baseApi.post("/signin", body);
        return response.data
    }

    static async logout() {
        await protectedApi.post("/logout");
    }
}

export default AdminApi;