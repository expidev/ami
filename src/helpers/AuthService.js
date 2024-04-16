class AuthService {
    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static removeToken() {
        localStorage.removeItem('token');
    }

    static isAuthenticated() {
        return !!this.getToken();
    }
}

export default AuthService;