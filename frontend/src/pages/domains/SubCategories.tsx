import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ArrowLeft, Layers, ExternalLink, FolderOpen, Loader2 } from 'lucide-react';
import { API_URL } from '../../services/api';

interface ResourceLink {
  id: number;
  name: string;
  url: string;
  description?: string;
  image?: string;
}

interface SubCategory {
  id: number;
  name: string;
  description: string;
  links: ResourceLink[];
}

interface Category {
  id: number;
  name: string;
  icon_name: string;
  subcategories?: SubCategory[];
  total_links?: number;
}

const SubCategories = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [openingLink, setOpeningLink] = useState<number | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    Promise.all([
      axios.get(`${API_URL}domains/categories/${categoryId}/`),
      axios.get(`${API_URL}domains/subcategories/?category_id=${categoryId}`)
    ])
      .then(([catRes, subRes]) => {
        setCategory(catRes.data);
        setSubCategories(subRes.data);
        if (subRes.data.length > 0) setActiveTab(subRes.data[0].id);
      })
      .catch(err => console.error("Erreur de chargement:", err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Chargement...</span>
        </div>
      </div>
    );
  }

  const totalLinks = subCategories.reduce((acc, sub) => acc + (sub.links?.length || 0), 0);

  return (
    <div className="text-left">

      {/* Bouton retour */}
      <Link
        to="/domains"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest mb-12 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Tous les domaines
      </Link>

      {/* En-tête avec stats */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            Domaine
          </div>
          {subCategories.length > 0 && (
            <div className="inline-block px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              {subCategories.length} sous-domaines · {totalLinks} services
            </div>
          )}
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-[#111827] uppercase italic tracking-tighter mb-4">
          {category?.name}
        </h2>
        <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
      </div>

      {/* Contenu */}
      {subCategories.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne gauche : liste des sous-domaines */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveTab(sub.id)}
                className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all duration-300 ${
                  activeTab === sub.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20'
                    : 'bg-gray-50 border-transparent hover:border-blue-200 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    activeTab === sub.id ? 'bg-white/20' : 'bg-white shadow-sm'
                  }`}>
                    <Layers size={18} className={activeTab === sub.id ? 'text-white' : 'text-blue-600'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black uppercase italic tracking-tight truncate text-sm ${
                      activeTab === sub.id ? 'text-white' : 'text-[#111827]'
                    }`}>
                      {sub.name}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                      activeTab === sub.id ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {sub.links?.length || 0} ressources
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-transform ${
                      activeTab === sub.id ? 'text-white translate-x-1' : 'text-gray-300'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Colonne droite : détail du sous-domaine actif */}
          <div className="lg:col-span-2">
            {subCategories
              .filter(sub => sub.id === activeTab)
              .map(sub => (
                <div key={sub.id} className="bg-gray-50 rounded-[2.5rem] p-8 border-2 border-gray-100 h-full">
                  {/* En-tête du sous-domaine */}
                  <div className="flex items-start gap-5 mb-8 pb-8 border-b border-gray-200">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                      <Layers size={26} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#111827] uppercase italic tracking-tighter">
                        {sub.name}
                      </h3>
                      {sub.description && (
                        <p className="text-gray-500 text-sm font-medium mt-2 leading-relaxed">{sub.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Liste des ressources */}
                  {sub.links && sub.links.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                        Ressources disponibles
                      </p>
                      {sub.links.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setOpeningLink(link.id);
                            setTimeout(() => setOpeningLink(null), 4000);
                          }}
                          className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group/link"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${openingLink === link.id ? 'bg-blue-600' : 'bg-blue-50 group-hover/link:bg-blue-600'}`}>
                              {openingLink === link.id
                                ? <Loader2 size={16} className="text-white animate-spin" />
                                : <ExternalLink size={16} className="text-blue-600 group-hover/link:text-white transition-colors" />
                              }
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#111827] text-sm group-hover/link:text-blue-600 transition-colors truncate">
                                {link.name}
                              </p>
                              <p className={`text-xs truncate mt-0.5 font-medium transition-colors ${openingLink === link.id ? 'text-blue-600' : 'text-blue-400 group-hover/link:text-blue-600'}`}>
                                {openingLink === link.id ? 'Ouverture en cours...' : link.url}
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-gray-300 group-hover/link:text-blue-600 group-hover/link:translate-x-1 transition-all shrink-0 ml-3"
                          />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <FolderOpen size={28} className="text-gray-300" />
                      </div>
                      <p className="text-gray-300 text-xs font-black uppercase tracking-widest text-center">
                        Aucune ressource disponible
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FolderOpen size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-300 font-black uppercase tracking-widest text-sm">
            Aucune sous-catégorie pour ce domaine.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
