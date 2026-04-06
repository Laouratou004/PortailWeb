// Définition de la structure d'un utilisateur
export interface User {
    username: string;
    role: 'admin' | 'user'; 
    email?: string; // Le point d'interrogation signifie que c'est optionnel
}

// Définition de ce que renvoie le Backend Django (JWT)
export interface AuthResponse {
    access: string;
    refresh: string;
    role: 'admin'; // On force 'admin' car c'est le seul rôle que notre Backend gère pour l'instant
    username: string;
}