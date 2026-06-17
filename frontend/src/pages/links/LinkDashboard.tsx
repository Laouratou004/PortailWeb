import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, Link as LinkIcon, PlusCircle, BarChart3,
  LogOut, CheckCircle2, Megaphone,
  Trash2, ImageIcon, Eye, EyeOff, Layers, Globe, ChevronDown, ChevronRight, AlertCircle, Pencil
} from 'lucide-react';
import { API_URL } from '../../services/api';

// API_URL ends with '/api/'; strip ALL trailing slashes so existing `${API}/path/` patterns stay valid
const API = API_URL.replace(/\/+$/, '');

const adminApi = axios.create({ baseURL: API });
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
adminApi.interceptors.response.use(
  res => res,
  err => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin-portal';
    }
    return Promise.reject(err);
  }
);

// ─── COMPOSANTS UI RÉUTILISABLES ─────────────────────────────────────────────

const MenuBtn = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-5 p-5 rounded-2xl w-full transition-all font-black text-[10px] uppercase tracking-[0.2em] ${
      active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'text-gray-500 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start gap-5 overflow-hidden">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shrink-0`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-black text-[#111827] tracking-tighter">{value}</p>
    </div>
  </div>
);

const FieldLabel = ({ children }: any) => (
  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4 block mb-2">{children}</label>
);

const Input = (props: any) => (
  <input
    {...props}
    className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-500 font-bold outline-none transition-all"
  />
);

const Select = (props: any) => (
  <select
    {...props}
    className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-500 font-bold outline-none cursor-pointer transition-all"
  />
);

const SubmitBtn = ({ status, idleLabel }: { status: string; idleLabel: string }) => (
  <button
    type="submit"
    className={`w-full p-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
      status === 'success' ? 'bg-emerald-500 text-white'
      : status === 'error'   ? 'bg-red-500 text-white'
      : 'bg-[#111827] text-white hover:bg-blue-600'
    }`}
  >
    {status === 'success' ? <><CheckCircle2 size={18}/> Enregistré !</>
     : status === 'error'  ? <><AlertCircle size={18}/> Erreur — Réessayer</>
     : idleLabel}
  </button>
);

// ─── DASHBOARD PRINCIPAL ──────────────────────────────────────────────────────

const LinkDashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('stats');
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-portal');
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const catRes = await axios.get(`${API}/domains/categories/`);
      setCategories(Array.isArray(catRes.data) ? catRes.data : []);
    } catch (e) {
      console.error('Erreur chargement catégories:', e);
    }
    try {
      const adsRes = await adminApi.get('/ads/admin/');
      setAds(Array.isArray(adsRes.data) ? adsRes.data : []);
    } catch (e) {
      console.error('Erreur chargement pubs:', e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const tabs: Record<string, string> = {
    stats: 'Statistiques',
    categories: 'Gérer Domaines',
    add: 'Ajouter Contenu',
    ads: 'Publicités',
    'add-ad': 'Nouvelle Publicité',
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#060B1A] text-white p-8 flex flex-col gap-10 shadow-2xl shrink-0 h-screen sticky top-0">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">GN</div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase italic leading-none">Admin Portal</h2>
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.3em]">République de Guinée</span>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <MenuBtn active={activeTab === 'stats'}      onClick={() => setActiveTab('stats')}      icon={<BarChart3 size={20}/>}   label="Vue d'ensemble" />
          <MenuBtn active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} icon={<LayoutGrid size={20}/>}  label="Gérer Domaines" />
          <MenuBtn active={activeTab === 'add'}        onClick={() => setActiveTab('add')}        icon={<PlusCircle size={20}/>}  label="Ajouter Contenu" />
          <MenuBtn active={activeTab === 'ads'}        onClick={() => setActiveTab('ads')}        icon={<Megaphone size={20}/>}   label="Publicités" />
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-5 text-red-400 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENU */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black text-[#111827] uppercase italic tracking-tighter leading-none">
            {tabs[activeTab] ?? 'Dashboard'}
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-3">
            Portail Web — République de Guinée
          </p>
        </header>

        {loading ? (
          <div className="flex py-20 items-center justify-center text-blue-600 font-black uppercase tracking-widest text-xs animate-pulse">
            Chargement...
          </div>
        ) : (
          <>
            {activeTab === 'stats'      && <StatsView categories={categories} ads={ads} />}
            {activeTab === 'categories' && <GererDomaines categories={categories} refresh={fetchAll} />}
            {activeTab === 'add'        && <AjouterContenu categories={categories} refresh={fetchAll} />}
            {activeTab === 'ads'        && <AdsView ads={ads} refresh={fetchAll} onAddAd={() => setActiveTab('add-ad')} />}
            {activeTab === 'add-ad'     && <AdForm refresh={fetchAll} onDone={() => setActiveTab('ads')} />}
          </>
        )}
      </main>
    </div>
  );
};

// ─── VUE STATISTIQUES ─────────────────────────────────────────────────────────

const StatsView = ({ categories, ads }: any) => {
  const totalSubs = categories.reduce((acc: number, cat: any) => acc + (cat.subcategories?.length ?? 0), 0);
  const totalLinks = categories.reduce((acc: number, cat: any) =>
    acc + (cat.subcategories?.reduce((a: number, s: any) => a + (s.links?.length ?? 0), 0) ?? 0), 0);
  const activeAds = ads.filter((a: any) => a.is_active).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<LayoutGrid size={28} className="text-blue-600"/>}         label="Domaines"        value={categories.length} color="bg-blue-50" />
      <StatCard icon={<Layers size={28} className="text-emerald-600"/>}           label="Sous-Domaines"   value={totalSubs}         color="bg-emerald-50" />
      <StatCard icon={<LinkIcon size={28} className="text-orange-500"/>}          label="Services"        value={totalLinks}         color="bg-orange-50" />
      <StatCard icon={<Megaphone size={28} className="text-purple-600"/>}         label="Publicités"      value={activeAds}          color="bg-purple-50" />
    </div>
  );
};

// ─── VUE GÉRER DOMAINES ───────────────────────────────────────────────────────

const GererDomaines = ({ categories, refresh }: any) => {
  const [expandedCat, setExpandedCat] = useState<number | null>(null);

  const deleteCat = async (id: number) => {
    if (!window.confirm('Supprimer ce domaine et tout son contenu ?')) return;
    try { await adminApi.delete(`/domains/categories/${id}/`); refresh(); }
    catch { alert('Erreur lors de la suppression.'); }
  };

  const deleteSub = async (id: number) => {
    if (!window.confirm('Supprimer ce sous-domaine et ses services ?')) return;
    try { await adminApi.delete(`/domains/subcategories/${id}/`); refresh(); }
    catch { alert('Erreur lors de la suppression.'); }
  };

  const deleteLink = async (id: number) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try { await adminApi.delete(`/domains/resourcelinks/${id}/`); refresh(); }
    catch { alert('Erreur lors de la suppression.'); }
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
        <p className="text-gray-300 font-black uppercase tracking-widest text-sm">Aucun domaine créé</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((cat: any, i: number) => (
        <div key={cat.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Ligne domaine */}
          <div
            className="flex items-center justify-between p-7 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
          >
            <div className="flex items-center gap-6">
              <span className="text-3xl font-black text-gray-100 italic">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-black text-lg text-[#111827] uppercase italic tracking-tight">{cat.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  {cat.subcategories?.length ?? 0} sous-domaines · {cat.total_links ?? 0} services
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => { e.stopPropagation(); deleteCat(cat.id); }}
                className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={16}/>
              </button>
              {expandedCat === cat.id
                ? <ChevronDown size={18} className="text-blue-500"/>
                : <ChevronRight size={18} className="text-gray-300"/>}
            </div>
          </div>

          {/* Sous-domaines */}
          {expandedCat === cat.id && (
            <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-3">
              {(!cat.subcategories || cat.subcategories.length === 0) ? (
                <p className="text-center text-gray-300 text-xs font-black uppercase tracking-widest py-6">
                  Aucun sous-domaine — utilisez "Ajouter Contenu"
                </p>
              ) : cat.subcategories.map((sub: any) => (
                <div key={sub.id} className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
                  {/* Ligne sous-domaine */}
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Layers size={15} className="text-blue-400 shrink-0"/>
                      <div>
                        <p className="font-black text-sm text-[#111827] uppercase italic">{sub.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {sub.links?.length ?? 0} services
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSub(sub.id)}
                      className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={15}/>
                    </button>
                  </div>

                  {/* Services */}
                  {sub.links && sub.links.length > 0 && (
                    <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                      {sub.links.map((link: any) => (
                        <div key={link.id} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-xl">
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm text-[#111827] truncate">{link.name}</p>
                            <p className="text-[10px] text-blue-400 font-medium truncate">{link.url}</p>
                          </div>
                          <button
                            onClick={() => deleteLink(link.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all ml-3 shrink-0"
                          >
                            <Trash2 size={13}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── VUE AJOUTER CONTENU ─────────────────────────────────────────────────────

const AjouterContenu = ({ categories, refresh }: any) => (
  <div className="grid grid-cols-1 gap-8 max-w-3xl">
    <FormCard color="bg-blue-600" number="01" title="Nouveau Domaine" icon={<LayoutGrid size={20} className="text-blue-600"/>}>
      <DomainForm refresh={refresh} />
    </FormCard>

    <FormCard color="bg-emerald-500" number="02" title="Nouveau Sous-Domaine" icon={<Layers size={20} className="text-emerald-500"/>}>
      <SubDomainForm categories={categories} refresh={refresh} />
    </FormCard>

    <FormCard color="bg-orange-400" number="03" title="Nouveau Service / Lien" icon={<Globe size={20} className="text-orange-400"/>}>
      <ServiceForm categories={categories} refresh={refresh} />
    </FormCard>
  </div>
);

const FormCard = ({ color, number, title, icon, children }: any) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
    <div className={`h-1.5 w-full ${color}`} />
    <div className="p-10">
      <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3 text-[#111827]">
        {icon}
        <span className="text-gray-300">{number}.</span> {title}
      </h3>
      {children}
    </div>
  </div>
);

// Formulaire 01 — Domaine
const ICON_OPTIONS = [
  { value: 'grid',   label: 'Grille (défaut)' },
  { value: 'book',   label: 'Livre' },
  { value: 'plus',   label: 'Plus' },
  { value: 'info',   label: 'Info' },
  { value: 'search', label: 'Loupe' },
  { value: 'home',   label: 'Maison' },
];

const DomainForm = ({ refresh }: any) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [iconName, setIconName] = useState('grid');
  const [preview, setPreview] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await adminApi.post('/domains/categories/', { name, image_url: imageUrl, icon_name: iconName });
      setName(''); setImageUrl(''); setPreview(''); setIconName('grid');
      setStatus('success');
      refresh();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      const msg = err?.response?.data?.name?.[0] || err?.response?.data?.detail || 'Erreur serveur';
      setErrorMsg(msg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">{errorMsg}</p>}
      <div>
        <FieldLabel>Nom du domaine</FieldLabel>
        <Input
          placeholder="Ex: Santé, Justice, Énergie..."
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <FieldLabel>URL de l'image (Unsplash recommandé)</FieldLabel>
        <Input
          placeholder="https://images.unsplash.com/photo-...?w=800"
          value={imageUrl}
          onChange={(e: any) => { setImageUrl(e.target.value); setPreview(e.target.value); }}
        />
        {preview && (
          <div className="mt-3 h-32 rounded-2xl overflow-hidden border border-gray-100">
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" onError={() => setPreview('')}/>
          </div>
        )}
      </div>
      <div>
        <FieldLabel>Icône</FieldLabel>
        <Select value={iconName} onChange={(e: any) => setIconName(e.target.value)}>
          {ICON_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      </div>
      <SubmitBtn status={status} idleLabel="Créer le Domaine" />
    </form>
  );
};

// Formulaire 02 — Sous-domaine
const SubDomainForm = ({ categories, refresh }: any) => {
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!categoryId) { setErrorMsg('Choisissez un domaine.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      await adminApi.post('/domains/subcategories/', {
        category: Number(categoryId),
        name,
        description,
      });
      setCategoryId(''); setName(''); setDescription('');
      setStatus('success');
      refresh();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      const data = err?.response?.data;
      const msg = data?.name?.[0] || data?.category?.[0] || data?.detail || 'Erreur serveur';
      setErrorMsg(msg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">{errorMsg}</p>}
      <div>
        <FieldLabel>Domaine parent</FieldLabel>
        <Select value={categoryId} onChange={(e: any) => setCategoryId(e.target.value)} required>
          <option value="">Choisir un domaine...</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Nom du sous-domaine</FieldLabel>
        <Input
          placeholder="Ex: Hôpitaux Publics, Télécommunications..."
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <FieldLabel>Description (optionnelle)</FieldLabel>
        <Input
          placeholder="Ex: Structures hospitalières de Guinée"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </div>
      <SubmitBtn status={status} idleLabel="Créer le Sous-Domaine" />
    </form>
  );
};

// Formulaire 03 — Service / Lien
const ServiceForm = ({ categories, refresh }: any) => {
  const [categoryId, setCategoryId] = useState('');
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [subcategoryId, setSubcategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!categoryId) { setSubcategories([]); setSubcategoryId(''); return; }
    axios.get(`${API}/domains/subcategories/?category_id=${categoryId}`)
      .then(res => setSubcategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setSubcategories([]));
  }, [categoryId]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!subcategoryId) { setErrorMsg('Choisissez un sous-domaine.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      await adminApi.post('/domains/resourcelinks/', {
        subcategory: Number(subcategoryId),
        name,
        description,
        url,
      });
      setCategoryId(''); setSubcategoryId(''); setName(''); setDescription(''); setUrl('');
      setStatus('success');
      refresh();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      const data = err?.response?.data;
      const msg = data?.name?.[0] || data?.url?.[0] || data?.subcategory?.[0] || data?.detail || 'Erreur serveur';
      setErrorMsg(msg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl">{errorMsg}</p>}
      <div>
        <FieldLabel>Domaine</FieldLabel>
        <Select value={categoryId} onChange={(e: any) => setCategoryId(e.target.value)} required>
          <option value="">Choisir un domaine...</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Sous-Domaine</FieldLabel>
        <Select
          value={subcategoryId}
          onChange={(e: any) => setSubcategoryId(e.target.value)}
          disabled={!categoryId || subcategories.length === 0}
          required
        >
          <option value="">
            {!categoryId ? 'Sélectionnez d\'abord un domaine'
              : subcategories.length === 0 ? 'Aucun sous-domaine — créez-en un (étape 02)'
              : 'Choisir un sous-domaine...'}
          </option>
          {subcategories.map((s: any) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <FieldLabel>Nom du service</FieldLabel>
        <Input
          placeholder="Ex: Orange Guinée, Ministère de la Santé..."
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <Input
          placeholder="Ex: Opérateur mobile leader en Guinée"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <FieldLabel>URL du site</FieldLabel>
        <Input
          type="url"
          placeholder="https://www.exemple.gov.gn"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          required
        />
      </div>
      <SubmitBtn status={status} idleLabel="Publier le Service" />
    </form>
  );
};

// ─── VUE PUBLICITÉS ───────────────────────────────────────────────────────────

const AdsView = ({ ads, refresh, onAddAd }: any) => {
  const [editingAd, setEditingAd] = useState<any | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Supprimer cette publicité ?')) return;
    try { await adminApi.delete(`/ads/admin/${id}/`); refresh(); }
    catch { alert('Erreur lors de la suppression.'); }
  };

  const handleToggle = async (ad: any) => {
    try { await adminApi.patch(`/ads/admin/${ad.id}/`, { is_active: !ad.is_active }); refresh(); }
    catch { alert('Erreur lors de la mise à jour.'); }
  };

  if (editingAd) {
    return <AdEditForm ad={editingAd} refresh={refresh} onDone={() => setEditingAd(null)} />;
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={onAddAd}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-blue-700 transition-all"
        >
          <PlusCircle size={18}/> Nouvelle Pub
        </button>
      </div>

      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white rounded-3xl border border-gray-100">
          <ImageIcon size={36} className="text-gray-200"/>
          <p className="text-gray-300 font-black uppercase tracking-widest text-sm">Aucune publicité créée</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ads.map((ad: any, index: number) => (
            <div key={ad.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex group hover:shadow-lg transition-all">
              <div className="w-48 h-32 shrink-0 relative overflow-hidden">
                <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover"/>
                <span className="absolute top-3 left-3 w-7 h-7 bg-black/60 rounded-lg flex items-center justify-center text-white font-black text-xs">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 p-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-black text-lg text-[#111827] uppercase italic truncate">{ad.title}</p>
                  <p className="text-gray-400 text-sm mt-1 truncate">{ad.subtitle}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    ad.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {ad.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleToggle(ad)} className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
                    ad.is_active ? 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                  }`}>
                    {ad.is_active ? <Eye size={18}/> : <EyeOff size={18}/>}
                  </button>
                  <button onClick={() => setEditingAd(ad)} className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                    <Pencil size={18}/>
                  </button>
                  <button onClick={() => handleDelete(ad.id)} className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── FORMULAIRE MODIFICATION PUBLICITÉ ───────────────────────────────────────

const AdEditForm = ({ ad, refresh, onDone }: any) => {
  const [formData, setFormData] = useState({
    title: ad.title,
    subtitle: ad.subtitle || '',
    image_url: ad.image_url,
    order: ad.order,
  });
  const [status, setStatus] = useState('idle');
  const [preview, setPreview] = useState(ad.image_url);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await adminApi.patch(`/ads/admin/${ad.id}/`, formData);
      setStatus('success');
      refresh();
      setTimeout(() => { setStatus('idle'); onDone(); }, 1200);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden max-w-3xl">
      <div className="h-1.5 bg-blue-500" />
      <div className="p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black uppercase italic flex items-center gap-3 text-[#111827]">
            <Pencil size={20} className="text-blue-500"/> Modifier la publicité
          </h3>
          <button onClick={onDone} className="text-gray-400 hover:text-gray-600 font-black text-xs uppercase tracking-widest">
            ← Retour
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FieldLabel>Titre principal</FieldLabel>
            <Input value={formData.title} onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div>
            <FieldLabel>Sous-titre</FieldLabel>
            <Input value={formData.subtitle} onChange={(e: any) => setFormData({ ...formData, subtitle: e.target.value })} />
          </div>
          <div>
            <FieldLabel>URL de l'image</FieldLabel>
            <Input
              value={formData.image_url}
              onChange={(e: any) => { setFormData({ ...formData, image_url: e.target.value }); setPreview(e.target.value); }}
              required
            />
            {preview && (
              <div className="mt-3 h-36 rounded-2xl overflow-hidden border border-gray-100">
                <img src={preview} alt="Aperçu" className="w-full h-full object-cover" onError={() => setPreview('')}/>
              </div>
            )}
          </div>
          <div>
            <FieldLabel>Ordre d'affichage</FieldLabel>
            <Input type="number" min={0} value={formData.order}
              onChange={(e: any) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onDone}
              className="flex-1 p-5 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
              Annuler
            </button>
            <button type="submit"
              className={`flex-1 p-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all ${
                status === 'success' ? 'bg-emerald-500 text-white' : status === 'error' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
              {status === 'success' ? <><CheckCircle2 size={18}/> Mis à jour !</> : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── FORMULAIRE PUBLICITÉ ─────────────────────────────────────────────────────

const AdForm = ({ refresh, onDone }: any) => {
  const [formData, setFormData] = useState({ title: '', subtitle: '', image_url: '', order: 0 });
  const [status, setStatus] = useState('idle');
  const [preview, setPreview] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await adminApi.post('/ads/admin/', formData);
      setStatus('success');
      refresh();
      setTimeout(() => { setStatus('idle'); onDone(); }, 1500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="h-1.5 bg-purple-500" />
      <div className="p-10">
        <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-3 text-[#111827]">
          <Megaphone size={20} className="text-purple-500"/>
          Nouvelle Publicité
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FieldLabel>Titre principal</FieldLabel>
            <Input placeholder="Ex: Simplifiez vos démarches" value={formData.title}
              onChange={(e: any) => setFormData({ ...formData, title: e.target.value })} required />
          </div>
          <div>
            <FieldLabel>Sous-titre</FieldLabel>
            <Input placeholder="Ex: Accédez à plus de 50 services" value={formData.subtitle}
              onChange={(e: any) => setFormData({ ...formData, subtitle: e.target.value })} />
          </div>
          <div>
            <FieldLabel>URL de l'image</FieldLabel>
            <Input placeholder="https://images.unsplash.com/..." value={formData.image_url}
              onChange={(e: any) => { setFormData({ ...formData, image_url: e.target.value }); setPreview(e.target.value); }} required />
            {preview && (
              <div className="mt-3 h-36 rounded-2xl overflow-hidden border border-gray-100">
                <img src={preview} alt="Aperçu" className="w-full h-full object-cover" onError={() => setPreview('')}/>
              </div>
            )}
          </div>
          <div>
            <FieldLabel>Ordre d'affichage</FieldLabel>
            <Input type="number" min={0} value={formData.order}
              onChange={(e: any) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={onDone}
              className="flex-1 p-5 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
              Annuler
            </button>
            <button type="submit"
              className={`flex-1 p-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all ${
                status === 'success' ? 'bg-emerald-500 text-white' : status === 'error' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
              {status === 'success' ? <><CheckCircle2 size={18}/> Publiée !</> : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkDashboard;
