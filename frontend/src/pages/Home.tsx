import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronRight, Book, Plus, LayoutGrid, Info, Search, Home as HomeIcon } from 'lucide-react';

// Utilitaire pour mapper les noms d'icônes du backend aux composants Lucide
const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    book: <Book size={28} />,
    plus: <Plus size={28} />,
    grid: <LayoutGrid size={28} />,
    info: <Info size={28} />,
    search: <Search size={28} />,
    home: <HomeIcon size={28} />,
  };
  return icons[iconName] || <LayoutGrid size={28} />;
};

const Home: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appel direct à ton API Django
    axios.get('/api/domains/categories/')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement des catégories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10">
      {/* En-tête de bienvenue stylisé */}
      <div className="text-center mb-24">
        <div className="inline-block px-5 py-1.5 bg-blue-50 text-[#1D4ED8] rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8">
          République de Guinée
        </div>

        <h3 className="text-6xl md:text-7xl font-black text-[#111827] mb-8 tracking-tighter uppercase italic leading-none">
          Bienvenue
        </h3>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Accédez à l'ensemble des services publics et ressources numériques de l'État en un seul point d'entrée sécurisé.
        </p>
      </div>

      {/* Séparateur avec label */}
      <div className="flex items-center gap-6 mb-16">
        <div className="h-[1px] flex-1 bg-gray-100"></div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Nos Domaines de Compétence</h4>
        <div className="h-[1px] flex-1 bg-gray-100"></div>
      </div>

      {/* Grille des domaines dynamiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {!loading ? (
          categories.map((cat) => (
            <Link key={cat.id} to={`/domaine/${cat.id}`} className="block">
              <div className="group relative h-[450px] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4">
                {/* Image de fond avec overlay dynamique */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image_url || "https://images.unsplash.com/photo-1523050335102-c3251c447ffb"}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A] via-[#060B1A]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                </div>

                {/* Contenu de la carte */}
                <div className="relative h-full p-12 flex flex-col justify-between items-start text-white z-10 text-left">
                  {/* Icône flottante */}
                  <div className="bg-white/10 backdrop-blur-2xl p-5 rounded-3xl border border-white/20 group-hover:bg-[#1D4ED8] group-hover:border-[#1D4ED8] group-hover:shadow-[0_0_30px_rgba(29,78,216,0.5)] transition-all duration-500">
                    {getIcon(cat.icon_name)}
                  </div>

                  <div className="w-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-3">
                      {cat.subcategories?.length || 0} Services disponibles
                    </p>
                    <h4 className="text-4xl font-black tracking-tighter uppercase italic mb-8 leading-none transform transition-transform group-hover:translate-x-2">
                      {cat.name}
                    </h4>
                    <div className="flex items-center gap-4 group/btn">
                      <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#111827] transition-all">
                        <ChevronRight size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Découvrir</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* Squelette de chargement minimaliste */
          [1, 2, 3].map((i) => (
            <div key={i} className="h-[450px] rounded-[4rem] bg-gray-100 animate-pulse"></div>
          ))
        )}
      </div>

      {/* Section d'appel à l'action finale */}
      <div className="mt-24 flex flex-col items-center">
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-gray-200 mb-10"></div>
        <button className="group flex items-center gap-6 bg-[#111827] text-white px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#1D4ED8] hover:shadow-[0_20px_40px_rgba(29,78,216,0.3)] transition-all">
           Accéder à l'annuaire complet
           <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Home;
