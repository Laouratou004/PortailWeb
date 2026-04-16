import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ads = [
  { image: "https://images.unsplash.com/photo-1557683316-973673baf926", title: "Simplifiez vos démarches", subtitle: "Accédez à plus de 50 services publics en un clic" },
  { image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", title: "Numérisation de l'Administration", subtitle: "La Guinée avance vers le futur numérique" }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAd, setCurrentAd] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentAd((prev) => (prev + 1) % ads.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      {/* 1. NAVBAR */}
      <header className="absolute top-0 left-0 w-full z-50 px-12 py-8 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col text-white drop-shadow-lg">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Portail Web</h1>
            <span className="text-[10px] font-bold tracking-[0.5em] opacity-80 mt-1 uppercase text-left">République de Guinée</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {['/', '/domains', '/about'].map((path) => (
              <Link key={path} to={path} className={`text-sm font-bold pb-1 border-b-2 transition-all ${location.pathname === path ? 'text-white border-white' : 'text-white/70 border-transparent hover:text-white'}`}>
                {path === '/' ? 'Accueil' : path === '/domains' ? 'Domaines' : 'À Propos'}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 2. GRANDE PUBLICITÉ (Visible sur TOUTES les pages) */}
      <section className="relative h-[500px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src={ads[currentAd].image} alt="Publicité" className="w-full h-full object-cover opacity-60 transition-transform duration-[5000ms] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-20">
          <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter leading-none">{ads[currentAd].title}</h2>
          <p className="text-lg font-medium opacity-80 italic">{ads[currentAd].subtitle}</p>
        </div>
      </section>

      {/* 3. CORPS DE LA PAGE (Le contenu qui change) */}
      <main className="relative z-10 -mt-16 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[50px] shadow-2xl py-16 px-10 border border-gray-50 min-h-[400px]">
          {children}
        </div>
      </main>

      {/* 4. FOOTER COMMUN */}
      <footer className="bg-[#060B1A] text-white pt-20 pb-10 px-10 rounded-t-[80px] mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-[#1D4ED8] w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl">GN</div>
              <h2 className="font-black text-2xl uppercase italic tracking-tighter">Portail Web</h2>
            </div>
            <p className="text-gray-500 text-sm italic">Service officiel numérique de l'État.</p>
          </div>
          <div className="text-left">
            <h5 className="font-black text-sm uppercase text-blue-500 mb-4 tracking-widest">Contact</h5>
            <p className="text-gray-400 text-sm font-bold">+224 621 00 00 00</p>
            <p className="text-gray-400 text-sm font-bold">contact@portailweb.gov.gn</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;