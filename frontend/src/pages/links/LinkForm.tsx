import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '' // ID de la catégorie choisie
  });

  useEffect(() => {
    // On récupère les domaines existants pour le menu déroulant
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/links/', formData)
      .then(() => alert('Lien ajouté au domaine !'))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-10 bg-white rounded-[2rem] shadow-lg max-w-lg mx-auto mt-10">
      <h3 className="text-2xl font-black uppercase italic mb-6">Ajouter un Lien Officiel</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Choix du Domaine */}
        <select 
          className="w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-blue-600"
          onChange={e => setFormData({...formData, category: e.target.value})}
          required
        >
          <option value="">Sélectionner le domaine...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input 
          type="text" placeholder="Titre du service"
          className="w-full p-4 bg-gray-50 rounded-xl"
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="url" placeholder="https://www.service.gov.gn"
          className="w-full p-4 bg-gray-50 rounded-xl"
          onChange={e => setFormData({...formData, url: e.target.value})}
        />
        <textarea 
          placeholder="Description"
          className="w-full p-4 bg-gray-50 rounded-xl h-24"
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        <button className="w-full bg-[#111827] text-white p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors">
          Enregistrer le Lien
        </button>
      </form>
    </div>
  );
};