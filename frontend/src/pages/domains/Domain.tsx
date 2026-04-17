import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Book, Plus, LayoutGrid, Info, Search, Home as HomeIcon, ArrowRight, Layers } from 'lucide-react';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600";

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    book: <Book size={22} />,
    plus: <Plus size={22} />,
    grid: <LayoutGrid size={22} />,
    info: <Info size={22} />,
    search: <Search size={22} />,
    home: <HomeIcon size={22} />,
  };
  return icons[iconName] || <Layers size={22} />;
};

const Domain = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('/api/domains/categories/')
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
          <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            {categories.length} domaines disponibles
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-[#111827] uppercase italic tracking-tighter mb-4">
            Secteurs <span className="text-blue-600">Publics</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-gray-400 font-medium italic text-lg max-w-xl">
            Explorez les domaines d'intervention numérique de l'État guinéen.
          </p>
        </div>

        {/* Barre de recherche */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDomains.length > 0 ? (
          filteredDomains.map((cat: any) => (
            <Link
              key={cat.id}
              to={`/domaine/${cat.id}`}
              className="group block"
            >
              {/* Carte avec image en fond */}
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-4 shadow-lg">
                <img
                  src={cat.image_url || DEFAULT_IMAGE}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A]/80 via-transparent to-transparent" />

                {/* Badge icône */}
                <div className="absolute top-5 left-5 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                  {getIcon(cat.icon_name)}
                </div>

                {/* Compteur */}
                <div className="absolute bottom-5 right-5">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {cat.subcategories?.length || 0} sous-domaines
                  </span>
                </div>
              </div>

              {/* Texte sous la carte */}
              <div className="px-2">
                <h3 className="text-xl font-black text-[#111827] uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors mb-1">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 font-medium text-sm">
                    {cat.total_links || 0} services disponibles
                  </p>
                  <span className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    Explorer <ArrowRight size={12} />
                  </span>
                </div>
              </div>
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
