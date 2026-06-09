import axios from 'axios';

// Use Vite environment variable in production, else keep relative path for local dev.
export const API_URL = import.meta.env.VITE_API_URL ?? '/api/';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}token/`, {
        username,
        password
    });

    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('user', JSON.stringify({
            username: response.data.username || username,
            role: response.data.role || 'admin'
        }));
    }
    return response.data;
};

export const getAds = async () => {
    const response = await axios.get(`${API_URL}ads/`);
    return response.data;
};

export { API_URL };
