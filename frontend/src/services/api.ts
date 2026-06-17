import axios from 'axios';

// In prod, ALWAYS use the hardcoded backend URL (ignoring VITE_API_URL) to avoid
// env-var typos breaking deploys. Normalize to a single trailing slash so callers
// can safely do `${API_URL}path/` without producing double slashes.
const PROD_API = 'https://portailweb.onrender.com/api/';
const ENV_API = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const RAW = import.meta.env.PROD ? PROD_API : (ENV_API ? ENV_API + '/' : '/api/');
export const API_URL = RAW.replace(/\/+$/, '') + '/';

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
