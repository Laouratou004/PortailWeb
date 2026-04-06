// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const login = async (username: string, password: string) => {
    // Notez l'URL : elle doit correspondre exactement à votre route Django
    const response = await axios.post(`${API_URL}token/`, {
        username,
        password
    });
    
    // Si la connexion réussit, on stocke le token
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        // On stocke aussi les infos pour le Dashboard
        localStorage.setItem('user', JSON.stringify({
            username: response.data.username,
            role: response.data.role
        }));
    }
    return response.data;
};