import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, Link as LinkIcon, PlusCircle, BarChart3, 
  LogOut, MousePointerClick 
} from 'lucide-react';

const LinkDashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('add');

  // REDIRECTION DÉCONNEXION
  const handleLogout = () => {
    // Si tu as un token : localStorage.removeItem('token');
    navigate('/login'); 
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur de liaison backend. Vérifie si Django tourne sur le port 8000 et si CORS est activé.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-white p-8 flex flex-col gap-10 shadow-2xl shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">PW</div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">Portail Admin</h2>
        </div>

        <nav className="flex flex-col gap-3">
          <MenuBtn active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} icon={<BarChart3 size={20}/>} label="Statistiques" />
          <MenuBtn active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} icon={<LayoutGrid size={20}/>} label="Domaines" />
          <MenuBtn active={activeTab === 'add'} onClick={() => setActiveTab('add')} icon={<PlusCircle size={20}/>} label="Ajouter Contenu" />
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 p-4 text-red-400 font-bold text-sm uppercase tracking-widest hover:bg-red-500/10 rounded-2xl transition-all"
        >
          <LogOut size={20}/> Déconnexion
        </button>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-[#111827] uppercase italic tracking-tighter">
            {activeTab === 'add' ? 'NOUVEAU CONTENU' : activeTab === 'stats' ? 'VUE D\'ENSEMBLE' : 'GESTION DOMAINES'}
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">République de Guinée — Administration</p>
        </header>

        <div className="animate-in fade-in duration-500">
          {activeTab === 'stats' && <StatsGrid categories={categories} />}
          {activeTab === 'categories' && <CategoriesList categories={categories} />}
          
          {activeTab === 'add' && (
            <div className="grid grid-cols-1 gap-12 max-w-5xl">
              {/* FORMULAIRE 1 : DOMAINE */}
              <CategoryForm refresh={fetchData} />
              
              {/* FORMULAIRE 2 : LIEN */}
              <LinkForm categories={categories} refresh={fetchData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- LOGIQUE CRÉATION DOMAINE ---
const CategoryForm = ({ refresh }: any) => {
  const [name, setName] = useState('');
  
  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    try {
      // ON ENVOIE UNIQUEMENT 'name' car ton modèle est simple
      await axios.post('http://127.0.0.1:8000/api/categories/', { name });
      setName('');
      refresh();
      alert("Domaine créé !");
    } catch (err: any) { 
      console.error("Détails erreur domaine:", err.response?.data);
      alert("Erreur lors de la création. Vérifie si le domaine existe déjà ou si le backend est configuré."); 
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border-l-8 border-blue-600 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-xl font-black uppercase italic mb-6">1. Ajouter un Domaine</h3>
      <form onSubmit={handleAddCategory} className="flex gap-4">
        <input 
          className="flex-1 p-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold"
          placeholder="Nom du domaine (ex: Justice, Santé...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="bg-[#111827] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors">Créer</button>
      </form>
    </div>
  );
};

// --- LOGIQUE CRÉATION LIEN ---
const LinkForm = ({ categories, refresh }: any) => {
  const [formData, setFormData] = useState({ title: '', url: '', category: '' });

  const handleAddLink = async (e: any) => {
    e.preventDefault();
    if(!formData.category) return alert("Choisis un domaine !");
    
    try {
      // On envoie 'category' (l'ID) pour correspondre à la ForeignKey Django
      await axios.post('http://127.0.0.1:8000/api/links/', formData);
      setFormData({ title: '', url: '', category: '' });
      refresh();
      alert("Lien publié !");
    } catch (err: any) { 
      console.error("Détails erreur lien:", err.response?.data);
      alert("Erreur lors de la publication du lien."); 
    }
  };

  return (
    <div className="bg-white p-10 rounded-[3rem] border-l-8 border-emerald-500 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-2xl font-black uppercase italic mb-8">2. Nouveau Lien de Ressource</h3>
      <form onSubmit={handleAddLink} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input 
            className="p-5 bg-gray-50 rounded-2xl border-none font-bold" 
            placeholder="Titre du service" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <select 
            className="p-5 bg-gray-50 rounded-2xl border-none font-bold cursor-pointer"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Sélectionner Domaine...</option>
            {categories.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <input 
          className="w-full p-5 bg-gray-50 rounded-2xl border-none font-bold" 
          placeholder="Lien URL (ex: https://service.gov.gn)" 
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          required
        />
        <button className="w-full bg-[#111827] text-white p-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all">
          Publier sur la page publique
        </button>
      </form>
    </div>
  );
};

// --- COMPOSANTS UI ---
const StatsGrid = ({ categories }: any) => {
  const totalLinks = categories.reduce((acc: number, cat: any) => acc + (cat.links?.length || 0), 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard icon={<LayoutGrid className="text-blue-600"/>} label="Total Domaines" value={categories.length} color="bg-blue-50" />
      <StatCard icon={<LinkIcon className="text-emerald-600"/>} label="Liens Publiés" value={totalLinks} color="bg-emerald-50" />
      <StatCard icon={<MousePointerClick className="text-purple-600"/>} label="Statut" value="Actif" color="bg-purple-50" />
    </div>
  );
};

const CategoriesList = ({ categories }: any) => (
  <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
    <div className="space-y-4">
      {categories.map((cat: any, index: number) => (
        <div key={cat.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-black text-gray-200 italic">0{index + 1}</span>
            <div className="font-bold text-lg text-[#111827] uppercase">{cat.name}</div>
          </div>
          <span className="px-5 py-2 bg-white rounded-xl text-[10px] font-black text-blue-600 shadow-sm uppercase">
            {cat.links?.length || 0} Services
          </span>
        </div>
      ))}
    </div>
  </div>
);

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-black text-[#111827]">{value}</p>
    </div>
  </div>
);

const MenuBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-2xl w-full transition-all font-bold text-[11px] uppercase tracking-widest ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

export default LinkDashboard;