import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// On garde juste une fonction de login simple pour l'instant
export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}token/`, {
        username,
        password
    });
    
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
    }
    return response.data;
};

// Export de l'URL de base si besoin ailleurs
export { API_URL };