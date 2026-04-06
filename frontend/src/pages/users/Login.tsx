import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            
            // Stockage CRITIQUE pour le ProtectedRoute et le Dashboard Premium
            localStorage.setItem('token', data.access);
            localStorage.setItem('username', username);
            // On définit 'admin' par défaut pour votre compte de test
            localStorage.setItem('role', 'admin'); 

            navigate('/dashboard'); // Redirection vers votre nouveau dossier links
        } catch (err: any) {
    // Affiche l'erreur complète dans la console F12
    console.error("Détail de l'erreur :", err.response?.data || err.message);
    
    // Si le serveur renvoie un message spécifique, affichez-le au lieu du message générique
    setError(err.response?.data?.detail || 'Erreur de connexion serveur');
}
    };

    return (
        <div style={s.container}>
            <form onSubmit={handleSubmit} style={s.card}>
                <h2 style={s.title}>Connexion PortailWeb</h2>
                {error && <p style={s.error}>{error}</p>}
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur" 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={s.input}
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={s.input}
                />
                <button type="submit" style={s.button}>Se connecter</button>
            </form>
        </div>
    );
};

const s = {
    container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' },
    card: { padding: '2rem', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    title: { textAlign: 'center' as const, marginBottom: '1.5rem', color: '#111827' },
    input: { width: '100%', padding: '12px', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' as const },
    button: { width: '100%', padding: '12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 },
    error: { color: '#ef4444', fontSize: '14px', marginBottom: '1rem', textAlign: 'center' as const }
};

export default Login;