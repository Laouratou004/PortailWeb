import React from 'react';
import { useNavigate } from 'react-router-dom';

const LinkDashboard: React.FC = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Admin';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin-portal');
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee', paddingBottom: '1rem' }}>
                <h1>PortailWeb - Administration</h1>
                <div>
                    <span>Connecté en tant que <strong>{username}</strong></span>
                    <button onClick={handleLogout} style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}>
                        Déconnexion
                    </button>
                </div>
            </header>

            <main style={{ marginTop: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Section Domaines / Catégories */}
                    <section style={{ padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                        <h3>📂 Domaines</h3>
                        <p>Gérez vos catégories (ex: Cryptographie, React, Django).</p>
                        <button style={{ padding: '8px 16px' }}>+ Ajouter un domaine</button>
                    </section>

                    {/* Section Liens */}
                    <section style={{ padding: '1.5rem', background: '#f9f9f9', borderRadius: '8px' }}>
                        <h3>🔗 Liens de ressources</h3>
                        <p>Ajoutez ou modifiez les liens vers vos projets et cours.</p>
                        <button style={{ padding: '8px 16px' }}>+ Ajouter un lien</button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LinkDashboard;