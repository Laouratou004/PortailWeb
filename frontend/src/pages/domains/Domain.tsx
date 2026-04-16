import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LayoutGrid, Search, ArrowRight } from 'lucide-react';

const Domain = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erreur Backend:", err));
  }, []);

  const filteredDomains = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-left">
      {/* --- EN-TÊTE DE LA PAGE --- */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl md:text-6xl font-black text-[#111827] uppercase italic tracking-tighter mb-4">
            Secteurs <span className="text-blue-600">Publics</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-gray-400 font-medium italic text-lg max-w-xl">
            Explorez les domaines d'intervention numérique de l'État guinéen.
          </p>
        </div>

        {/* Barre de recherche intégrée au corps de page */}
        <div className="relative w-full md:w-96 shadow-xl rounded-2xl overflow-hidden">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Filtrer un domaine..."
            className="w-full p-4 pl-12 bg-gray-50 text-[#111827] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* --- GRILLE DES DOMAINES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredDomains.length > 0 ? (
          filteredDomains.map((cat: any) => (
            <Link 
              key={cat.id} 
              to={`/domaine/${cat.id}`}
              className="group bg-gray-50 p-10 rounded-[3rem] border-2 border-transparent hover:border-blue-600 hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <LayoutGrid size={28} />
              </div>

              <h3 className="text-2xl font-black text-[#111827] uppercase italic tracking-tighter mb-4 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>

              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                Accédez aux services et ressources spécifiques au secteur : {cat.name}.
              </p>

              <span className="flex items-center gap-3 text-blue-600 font-black uppercase text-[10px] tracking-widest group-hover:gap-5 transition-all">
                Explorer <ArrowRight size={14} />
              </span>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 italic font-bold">
            Aucun domaine ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
};

export default Domain;