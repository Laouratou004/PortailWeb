import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ads = [
  { image: "https://images.unsplash.com/photo-1557683316-973673baf926", title: "Simplifiez vos démarches", subtitle: "Accédez à plus de 50 services publics" },
  { image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", title: "La Guinée Numérique", subtitle: "L'administration à portée de main" }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAd, setCurrentAd] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentAd((prev) => (prev + 1) % ads.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. NAVBAR TRANSPARENTE  */}
<header className="absolute top-0 left-0 w-full z-[100] px-12 py-10 bg-transparent">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <Link to="/" className="flex flex-col text-left cursor-pointer">
      <h1 className="text-white font-black text-3xl italic uppercase tracking-tighter leading-none">
        Portail<span className="text-blue-500">Web</span>
      </h1>
      <span className="text-[9px] text-white/80 font-bold tracking-[0.4em] uppercase mt-1">
        République de Guinée
      </span>
    </Link>
    
    <nav className="hidden md:flex gap-10">
      {[
        { name: 'Accueil', path: '/' },
        { name: 'Domaines', path: '/domains' }, // Vérifie que c'est bien "/domains" dans ton App.tsx
        { name: 'À Propos', path: '/about' }    // Vérifie que c'est bien "/about" dans ton App.tsx
      ].map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`text-[11px] font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all cursor-pointer relative z-[110] ${
              isActive ? 'text-white border-blue-500' : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  </div>
</header>

      {/* 2. PUB (Sert de fond à la Navbar) */}
      <section className="relative h-[600px] bg-[#060B1A] overflow-hidden">
        <img 
          src={ads[currentAd].image} 
          className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-[5000ms]" 
          alt="Publicité" 
        />
        {/* Dégradé pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gray-50" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">Portail Officiel</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-2xl">
            {ads[currentAd].title}
          </h2>
          <p className="text-lg opacity-80 font-medium italic max-w-xl">{ads[currentAd].subtitle}</p>
        </div>
      </section>

      {/* 3. CORPS DE LA PAGE (Surélevé) */}
      <main className="relative z-20 -mt-24 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[50px] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 min-h-[400px]">
          {children}
        </div>
      </main>

      {/* 4. FOOTER PROFESSIONNEL */}
      <footer className="bg-[#060B1A] text-white pt-24 pb-12 px-10 rounded-t-[80px] mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20 text-left">
            
            {/* Branding & Social placeholders */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center font-black">GN</div>
                <h3 className="font-black text-xl uppercase italic">Portail Web</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Le point d'accès unique pour tous les services de l'administration numérique guinéenne.
              </p>
              <div className="flex gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 cursor-pointer transition-colors" title="Social Icon"></div>
                ))}
              </div>
            </div>

            {/* Liens Rapides */}
            <div className="flex flex-col gap-6">
              <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Services en ligne</li>
                <li className="hover:text-white cursor-pointer transition-colors">Documents officiels</li>
                <li className="hover:text-white cursor-pointer transition-colors">Actualités</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6">
              <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest">Contact</h4>
              <div className="text-sm font-bold text-gray-400 space-y-2">
                <p>📞 +224 621 00 00 00</p>
                <p>✉️ contact@portailweb.gov.gn</p>
                <p>📍 Conakry, République de Guinée</p>
              </div>
            </div>

          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
              © 2026 Direction du Numérique. République de Guinée.
            </p>
            <div className="flex items-center gap-3">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Service Opérationnel</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;