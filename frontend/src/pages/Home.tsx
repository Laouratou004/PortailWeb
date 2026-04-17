import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronRight, Book, Plus, LayoutGrid, Info, Search, Home as HomeIcon } from 'lucide-react';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800";

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    book: <Book size={24} />,
    plus: <Plus size={24} />,
    grid: <LayoutGrid size={24} />,
    info: <Info size={24} />,
    search: <Search size={24} />,
    home: <HomeIcon size={24} />,
  };
  return icons[iconName] || <LayoutGrid size={24} />;
};

const Home: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/domains/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Erreur de chargement des catégories:", err));
  }, []);

  return (
    <>
      <section className="text-center">
        {/* En-tête de bienvenue */}
        <div className="inline-block px-4 py-1 bg-blue-50 text-[#1D4ED8] font-black uppercase tracking-[0.3em] mb-8 text-[10px] rounded-full">
          République de Guinée
        </div>

        <h3 className="text-6xl font-black text-[#111827] mb-6 tracking-tighter uppercase italic">
          Bienvenue
        </h3>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-20 font-medium">
          Accédez à l'ensemble des services publics et ressources numériques de l'État en un seul point d'entrée sécurisé.
        </p>

        <div className="flex items-center gap-6 mb-12">
          <div className="h-[1px] flex-1 bg-gray-100"></div>
          <h4 className="text-sm font-black uppercase tracking-[0.4em] text-gray-300">Nos Domaines</h4>
          <div className="h-[1px] flex-1 bg-gray-100"></div>
        </div>

        {/* Grille des domaines dynamiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Link key={cat.id} to={`/domaine/${cat.id}`}>
                <div className="group relative h-[400px] rounded-[3.5rem] overflow-hidden shadow-2xl cursor-pointer transition-all duration-700 hover:-translate-y-4">
                  <div className="absolute inset-0">
                    <img
                      src={cat.image_url || DEFAULT_IMAGE}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125"
                      onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A] via-[#060B1A]/20 to-transparent" />
                  </div>

                  <div className="relative h-full p-10 flex flex-col justify-between items-start text-white z-10 text-left">
                    <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/20 group-hover:bg-[#1D4ED8] group-hover:border-[#1D4ED8] transition-all">
                      {getIcon(cat.icon_name)}
                    </div>

                    <div className="w-full">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2">
                        {cat.subcategories?.length || 0} sous-domaines · {cat.total_links || 0} services
                      </p>
                      <h4 className="text-4xl font-black tracking-tighter uppercase italic mb-6 leading-none">
                        {cat.name}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-widest text-white/70">Explorer</span>
                        <ChevronRight size={18} className="text-[#1D4ED8]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 italic col-span-full py-10 animate-pulse">Connexion aux services nationaux...</p>
          )}
        </div>

        <div className="mt-20 flex justify-center">
          <Link to="/domains">
            <button className="group flex items-center gap-4 bg-[#111827] text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1D4ED8] transition-all shadow-xl">
              Explorer tous les Domaines
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
