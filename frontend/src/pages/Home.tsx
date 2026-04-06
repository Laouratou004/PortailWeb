import React, { useState, useEffect } from 'react';
import { Search, Book, Plus, Globe, ChevronLeft, ChevronRight, LayoutGrid, Info, Home as HomeIcon } from 'lucide-react';


// 1. Les données des publicités (Côté Frontend pour l'instant)
const ads = [

  {
    image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    title: "Simplifiez vos démarches",
    subtitle: "Accédez à plus de 50 services publics en un clic"
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    title: "Numérisation de l'Administration",
    subtitle: "La Guinée avance vers le futur numérique"
  }
];


// Interfaces pour TypeScript
interface ServiceCardProps {
  title: string;
  color: string;
  count: string;
  icon: React.ReactNode;
}

const Home: React.FC = () => {
  // 2. LA LOGIQUE DOIT ÊTRE ICI (À l'intérieur de Home)
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      
      {/* 1. NAVBAR */}
      <header className="absolute top-0 left-0 w-full z-50 px-12 py-8 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Titre seul (sans bloc de couleur derrière) */}
          <div className="flex flex-col text-white drop-shadow-lg">
            <h1 className="text-3xl font-black tracking-tighter leading-none uppercase">
              Portail Web <span className="text-[#1D4ED8]"></span>
            </h1>
            <span className="text-[10px] font-bold tracking-[0.5em] opacity-80 mt-1">République de Guinée</span>
          </div>

          {/* Boutons de navigation épurés */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-white text-sm font-bold border-b-2 border-white pb-1">Accueil</button>
            <button className="text-white/70 hover:text-white text-sm font-bold transition-all">Domaines</button>
            <button className="text-white/70 hover:text-white text-sm font-bold transition-all">À Propos</button>
          </nav>
        </div>
      </header>

      {/* --- SLIDER DE PUB PLEINE LARGEUR --- */}
      <section className="relative h-[700px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src={ads[currentAd].image} 
            alt="Publicité" 
            className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-[5000ms]" 
          />
          {/* Dégradé pour protéger la lisibilité du texte blanc */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        </div>

        {/* Contenu de la pub */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-32">
          <span className="text-[#1D4ED8] font-black text-xs uppercase tracking-[0.4em] mb-4 drop-shadow-md">
            Informations Officielles
          </span>
          <h2 className="text-7xl font-black mb-6 drop-shadow-2xl uppercase tracking-tighter max-w-5xl leading-[0.9]">
            {ads[currentAd].title}
          </h2>
          <p className="text-xl font-medium opacity-80 max-w-2xl drop-shadow-lg italic">
            {ads[currentAd].subtitle}
          </p>
          
          {/* Barre de progression des pubs */}
          <div className="flex gap-4 mt-20">
            {ads.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-700 ${
                  i === currentAd ? 'w-20 bg-[#1D4ED8]' : 'w-10 bg-white/20'
                }`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. SECTION BIENVENUE--- */}
      <section className="relative z-10 -mt-24 px-6 mb-20">
        <div className="max-w-7xl mx-auto bg-white rounded-[50px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] py-20 px-10 md:px-20 text-center border border-gray-50">
          
          <div className="inline-block px-4 py-1 bg-blue-50 text-[#1D4ED8] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ServiceCard 
            title="Éducation" 
            count="12 services" 
            image="https://images.unsplash.com/photo-1523050335102-c3251c447ffb"
            icon={<Book size={24} />} 
          />
          <ServiceCard 
            title="Santé" 
            count="8 services" 
            image="https://images.unsplash.com/photo-1538108197017-c1346673919e"
            icon={<Plus size={24} />} 
          />
            <ServiceCard  
              title="Administration" 
              count="15 services" 
              image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              icon={<LayoutGrid size={24} />} 
            />
             <ServiceCard 
              title="Justice" 
              count="5 services" 
              image="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              icon={<Info size={24} />} 
            />
             <ServiceCard 
              title="Transport" 
              count="10 services" 
              image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
              icon={<HomeIcon size={24} />} 
            />
             <ServiceCard 
              title="Fiscalité" 
              count="7 services" 
              image="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18"
              icon={<Search size={24} />} 
            />
          {/* Ajoute d'autres cartes ici selon tes besoins */}
        </div>
        </div>
        {/* Bouton global "Voir tous les domaines" en bas de grille */}
        <div className="mt-20 flex justify-center">
            <button className="group flex items-center gap-4 bg-[#111827] text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1D4ED8] transition-all shadow-xl">
               Explorer tous les services
               <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
        </div>
      </section>
     {/* --- 4. FOOTER INSTITUTIONNEL --- */}
      <footer className="bg-[#060B1A] text-white pt-24 pb-12 px-10 rounded-t-[80px] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            
            {/* Colonne 1 : Branding & Description */}
            <div className="flex flex-col gap-8 text-left">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-[#1D4ED8] w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(29,78,216,0.4)] group-hover:rotate-6 transition-transform duration-500">
                  GN
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-3xl tracking-tighter uppercase italic leading-none">
                    Portail Web
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.5em] text-blue-500 mt-1">
                    RÉPUBLIQUE DE GUINÉE
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
                Accès unique aux services numériques de l'État. Moderniser l'administration pour servir chaque citoyen.
              </p>
              {/* Réseaux Sociaux */}
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1D4ED8] hover:border-[#1D4ED8] transition-all cursor-pointer group">
                    <Globe size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Colonnes de Liens (Utilise FooterColumn) */}
            <FooterColumn 
              title="Navigation" 
              links={['Accueil', 'Tous les Domaines', 'Actualités du Gouvernement', 'À propos du Portail']} 
            />
            
            <FooterColumn 
              title="Support & Légal" 
              links={['Centre d\'aide', 'Mentions Légales', 'Politique de Confidentialité', 'Contactez-nous']} 
            />
            
            {/* Colonne 4 : Contact & Info */}
            <div className="flex flex-col gap-8 text-left">
              <h5 className="font-black text-sm uppercase tracking-[0.3em] text-blue-500">Contact Officiel</h5>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Plus size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-600 mb-1 tracking-widest">Téléphone</p>
                    <p className="text-sm font-bold text-gray-300">+224 621 00 00 00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Info size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-600 mb-1 tracking-widest">Email Support</p>
                    <p className="text-sm font-bold text-gray-300">contact@portailweb.gov.gn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de Copyright */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">
                 © 2026 CENTRE INFORMATIQUE NATIONAL • CONAKRY
               </span>
            </div>
            <div className="flex gap-8">
              <span className="text-[10px] text-gray-500 font-bold hover:text-blue-500 cursor-pointer transition-colors uppercase tracking-widest">Accessibilité</span>
              <span className="text-[10px] text-gray-500 font-bold hover:text-blue-500 cursor-pointer transition-colors uppercase tracking-widest">Plan du site</span>
            </div>
          </div>
        </div>
      </footer>
    </div>

    

);
};
const FooterColumn: React.FC<{ title: string; links: string[] }> = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-8 text-left">
      <h5 className="font-black text-sm uppercase tracking-[0.3em] text-blue-500">
        {title}
      </h5>
      <ul className="flex flex-col gap-5">
        {/* On vérifie que links existe avant de faire le .map */}
        {links && links.map((link) => (
          <li key={link} className="group flex items-center gap-3 cursor-pointer">
            <div className="w-0 group-hover:w-4 h-[2px] bg-[#1D4ED8] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <span className="text-gray-400 text-sm font-bold hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
              {link}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
// --- COMPOSANT SERVICE CARD (À METTRE TOUT EN BAS) ---

const ServiceCard: React.FC<{ title: string; count: string; image: string; icon: React.ReactNode }> = ({ title, count, image, icon }) => (
  <div className="group relative h-[400px] rounded-[3.5rem] overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-700 hover:-translate-y-4">
    
    {/* Image de fond avec Zoom au survol */}
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125" 
      />
      {/* Dégradé pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A] via-[#060B1A]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
    </div>

    {/* Contenu de la carte */}
    <div className="relative h-full p-10 flex flex-col justify-between items-start text-white z-10">
      
      {/* Badge Icone */}
      <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/20 group-hover:bg-[#1D4ED8] group-hover:border-[#1D4ED8] transition-all duration-500">
        {icon}
      </div>

      <div className="text-left w-full">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-2">
          {count} disponibles
        </p>
        <h4 className="text-4xl font-black tracking-tighter uppercase italic mb-6 leading-none">
          {title}
        </h4>

        {/* Le bouton "Voir plus" avec flèche */}
        <div className="flex items-center gap-3 group/btn">
          <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
            Voir plus
          </span>
          <div className="w-10 h-1 bg-white/20 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-[#1D4ED8] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </div>
          <ChevronRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-500 text-[#1D4ED8]" />
        </div>
      </div>
    </div>

    {/* Bordure lumineuse subtile au survol */}
    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[3.5rem] transition-all duration-500" />
  </div>
);
export default Home;
