import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // Vérification du token dans le stockage local
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirection vers le login si non authentifié
        return <Navigate to="/admin-portal" replace />;
    }

    // Affiche le contenu (Dashboard) si le token existe
    return children;
};

export default ProtectedRoute;