import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, Link as LinkIcon, PlusCircle, BarChart3, 
  LogOut, MousePointerClick, CheckCircle2, AlertCircle
} from 'lucide-react';

// URL de base pour éviter les répétitions
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const LinkDashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  // REDIRECTION DÉCONNEXION
  const handleLogout = () => {
    // Si tu utilises un système de token (JWT)
    localStorage.removeItem('token'); 
    navigate('/admin-portal'); // On redirige vers la page de login
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/categories/`);
      setCategories(res.data);
    } catch (err) {
      console.error("Liaison Backend impossible. Vérifiez CORS et le port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      
      {/* SIDEBAR FIXE */}
      <aside className="w-80 bg-[#060B1A] text-white p-10 flex flex-col gap-12 shadow-2xl shrink-0 h-screen sticky top-0">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">GN</div>
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tighter uppercase italic leading-none">Admin Portal</h2>
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.3em] mt-1">République de Guinée</span>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          <MenuBtn active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={<BarChart3 size={20}/>} label="Vue d'ensemble" />
          <MenuBtn active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} icon={<LayoutGrid size={20}/>} label="Gérer Domaines" />
          <MenuBtn active={activeTab === 'add'} onClick={() => setActiveTab('add')} icon={<PlusCircle size={20}/>} label="Ajouter Contenu" />
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-5 text-red-400 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform"/> Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-16">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-6xl font-black text-[#111827] uppercase italic tracking-tighter leading-none">
              {activeTab === 'add' ? 'Nouveau Contenu' : activeTab === 'stats' ? 'Statistiques' : 'Domaines'}
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-[10px] mt-4">Tableau de bord de gestion numérique</p>
          </div>
          {activeTab !== 'add' && (
            <button 
                onClick={() => setActiveTab('add')}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
            >
                <PlusCircle size={18}/> Créer
            </button>
          )}
        </header>

        {loading ? (
            <div className="flex py-20 items-center justify-center text-blue-600 animate-pulse font-black uppercase tracking-widest text-xs">
                Synchronisation avec Conakry...
            </div>
        ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === 'stats' && <StatsGrid categories={categories} />}
                {activeTab === 'categories' && <CategoriesList categories={categories} refresh={fetchData} />}
                
                {activeTab === 'add' && (
                    <div className="grid grid-cols-1 gap-10 max-w-4xl">
                        <CategoryForm refresh={fetchData} />
                        <LinkForm categories={categories} refresh={fetchData} />
                    </div>
                )}
            </div>
        )}
      </main>
    </div>
  );
};

// --- LOGIQUE CRÉATION DOMAINE ---
const CategoryForm = ({ refresh }: any) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/categories/`, { name });
      setName('');
      setStatus('success');
      refresh();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) { 
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
      <h3 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
        01. <span className="text-gray-400">Ajouter un Domaine</span>
      </h3>
      <form onSubmit={handleAddCategory} className="flex gap-4">
        <input 
          className="flex-1 p-6 bg-gray-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-blue-600 font-bold text-lg"
          placeholder="Ex: Justice, Énergie, Santé..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-[#111827] text-white px-10 py-6 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2">
            {status === 'success' ? <CheckCircle2 size={18} /> : 'Créer'}
        </button>
      </form>
    </div>
  );
};

// --- LOGIQUE CRÉATION LIEN ---
const LinkForm = ({ categories, refresh }: any) => {
  const [formData, setFormData] = useState({ title: '', url: '', category: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.category) return;
    
    try {
      await axios.post(`${API_BASE_URL}/links/`, formData);
      setFormData({ title: '', url: '', category: '' });
      setStatus('success');
      refresh();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) { 
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
      <h3 className="text-2xl font-black uppercase italic mb-10 flex items-center gap-3">
        02. <span className="text-gray-400">Nouveau Lien de Ressource</span>
      </h3>
      <form onSubmit={handleAddLink} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Libellé du service</label>
            <input 
              className="w-full p-6 bg-gray-50 rounded-[1.5rem] border-none font-bold" 
              placeholder="Ex: E-Tax Guinée" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Domaine rattaché</label>
            <select 
              className="w-full p-6 bg-gray-50 rounded-[1.5rem] border-none font-bold cursor-pointer appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Choisir...</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Adresse URL (HTTP/HTTPS)</label>
            <input 
                className="w-full p-6 bg-gray-50 rounded-[1.5rem] border-none font-bold" 
                placeholder="https://service-public.gov.gn" 
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                required
            />
        </div>
        <button className={`w-full p-7 rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${status === 'success' ? 'bg-emerald-500 text-white' : 'bg-[#111827] text-white hover:bg-emerald-600'}`}>
          {status === 'success' ? <><CheckCircle2 size={20}/> Lien Publié avec succès</> : 'Valider la publication'}
        </button>
      </form>
    </div>
  );
};

// --- COMPOSANTS UI ---
const StatsGrid = ({ categories }: any) => {
  const totalLinks = categories.reduce((acc: number, cat: any) => acc + (cat.links?.length || 0), 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <StatCard icon={<LayoutGrid size={28} className="text-blue-600"/>} label="Domaines Créés" value={categories.length} color="bg-blue-50" />
      <StatCard icon={<LinkIcon size={28} className="text-emerald-600"/>} label="Services Actifs" value={totalLinks} color="bg-emerald-50" />
      <StatCard icon={<MousePointerClick size={28} className="text-purple-600"/>} label="Disponibilité" value="100%" color="bg-purple-50" />
    </div>
  );
};

const CategoriesList = ({ categories, refresh }: any) => {
    // Fonction pour supprimer un domaine (Optionnel mais recommandé)
    const deleteCategory = async (id: number) => {
        if(window.confirm("Voulez-vous vraiment supprimer ce domaine et tous ses liens ?")) {
            try {
                await axios.delete(`${API_BASE_URL}/categories/${id}/`);
                refresh();
            } catch (err) { alert("Erreur de suppression."); }
        }
    };

    return (
        <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 gap-4">
                {categories.map((cat: any, index: number) => (
                    <div key={cat.id} className="flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 border border-transparent hover:border-blue-100">
                        <div className="flex items-center gap-8">
                            <span className="text-4xl font-black text-gray-200 italic group-hover:text-blue-100 transition-colors">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </span>
                            <div>
                                <div className="font-black text-xl text-[#111827] uppercase italic tracking-tighter">{cat.name}</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Identifiant: #00{cat.id}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="px-6 py-3 bg-white rounded-2xl text-[10px] font-black text-blue-600 shadow-sm uppercase tracking-widest">
                                {cat.links?.length || 0} Ressources
                            </span>
                            <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <LogOut size={18} className="rotate-90"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-center gap-8 transition-transform hover:scale-105 duration-500">
    <div className={`w-20 h-20 ${color} rounded-[1.5rem] flex items-center justify-center shadow-inner`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{label}</p>
      <p className="text-5xl font-black text-[#111827] tracking-tighter">{value}</p>
    </div>
  </div>
);

const MenuBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-5 p-5 rounded-2xl w-full transition-all font-black text-[10px] uppercase tracking-[0.2em] ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

export default LinkDashboard;