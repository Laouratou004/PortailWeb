// frontend/src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="font-sans">
      {/* Barre de navigation (Header) */}
      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Portail Web Guinée</h1>
        <ul className="flex gap-4">
          <li className="text-blue-600 font-bold">Accueil</li>
          <li>Domaines</li>
          <li>À Propos</li>
        </ul>
      </nav>

      {/* Hero Section (Image de Conakry) */}
      <header className="bg-gray-200 h-64 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl font-bold">Vue aérienne de Conakry</h2>
        <p>Un portail unique pour toutes les administrations guinéennes</p>
      </header>

      {/* Section Bienvenue */}
      <main className="p-8 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Bienvenue</h3>
        <p className="text-gray-600 mb-8">Votre portail centralisé pour tous les services publics et ressources de Guinée.</p>
        
        <h4 className="text-xl font-semibold mb-6">Nos Domaines de services</h4>
        
        {/* On affichera les palettes ici plus tard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Simulation d'une palette */}
            <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <p className="font-bold">Éducation</p>
                <p className="text-sm">4 catégories disponibles</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Home;