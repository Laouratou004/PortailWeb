import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('grid'); // par défaut

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/categories/', { 
      name, 
      icon_name: iconName,
      color: 'blue' 
    })
    .then(() => alert('Domaine créé !'))
    .catch(err => console.error(err));
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-lg max-w-md mx-auto mt-10">
      <h3 className="text-2xl font-black uppercase italic mb-6">Nouveau Domaine</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Nom du domaine (ex: Santé)"
          className="w-full p-4 bg-gray-50 rounded-xl"
          onChange={e => setName(e.target.value)}
        />
        <select 
          className="w-full p-4 bg-gray-50 rounded-xl"
          onChange={e => setIconName(e.target.value)}
        >
          <option value="grid">Icône par défaut (Grille)</option>
          <option value="book">Éducation (Livre)</option>
          <option value="plus">Santé (Plus)</option>
          <option value="home">Transport (Maison/Route)</option>
          <option value="search">Justice/Fiscalité (Loupe)</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold uppercase tracking-widest">
          Créer le Domaine
        </button>
      </form>
    </div>
  );
};