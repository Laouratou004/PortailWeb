import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// 1. Récupérer les catégories
export const getCategories = () => {
    return axios.get(`${API_URL}domains/categories/`);
};

// 2. Ajouter une catégorie (On précise que 'data' est un FormData)
export const createCategory = (data: FormData) => {
    const token = localStorage.getItem('access_token');
    return axios.post(`${API_URL}domains/categories/`, data, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
};

// 3. Ajouter un lien (On précise aussi 'data: FormData')
export const createResource = (data: FormData) => {
    const token = localStorage.getItem('access_token');
    return axios.post(`${API_URL}domains/resources/`, data, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
};