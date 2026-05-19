import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import AdsSidebar from './AdsSidebar';

interface BannerSlide {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  image_url: string;
}

const PORTAL_SLIDES: BannerSlide[] = [
  {
    id: 1,
    category: "Guichet Unique Citoyen",
    title: "Portail Web National",
    subtitle: "Votre point d'accès centralisé et sécurisé pour accomplir toutes vos démarches administratives officielles en quelques clics.",
    image_url: "https://images.unsplash.com/photo-1521737711867-e3b904737d88?w=1600"
  },
  {
    id: 2,
    category: "Domaines & Secteurs",
    title: "10 Secteurs d'Intervention",
    subtitle: "Explorez nos rubriques thématiques regroupant la Santé, l'Éducation, les Transports et l'Énergie pour trouver vos services.",
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600"
  },
  {
    id: 3,
    category: "Inclusivité & Accessibilité",
    title: "L'Administration Connectée",
    subtitle: "Une plateforme conçue pour tous les citoyens guinéens, garantissant un accès égalitaires aux services publics sur tout le territoire.",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600"
  },
  {
    id: 4,
    category: "Sécurité & Transparence",
    title: "Échanges 100% Protégés",
    subtitle: "Bénéficiez d'une protection rigoureuse de vos données personnelles et d'un suivi transparent pour chaque demande soumise.",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600"
  }
];

const Layout: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PORTAL_SLIDES.length);
    }, 5000);
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
              { name: 'Domaines', path: '/domains' },
              { name: 'À Propos', path: '/about' }
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

      {/* 2. SLIDER DE LA BANNIÈRE (Professionnel et Institutionnel) */}
      <section className="relative h-[600px] bg-[#060B1A] overflow-hidden">
        {/* Image de fond avec transition */}
        {PORTAL_SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image_url}
            className={`absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000 ${
              i === currentSlide ? 'opacity-40 z-10' : 'opacity-0 z-0'
            }`}
            alt={slide.title}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gray-50 z-20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center z-30">
          <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">
            {PORTAL_SLIDES[currentSlide]?.category}
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 drop-shadow-2xl transition-all duration-500 animate-fade-in">
            {PORTAL_SLIDES[currentSlide]?.title}
          </h2>
          <p className="text-lg opacity-80 font-medium italic max-w-xl transition-all duration-500">
            {PORTAL_SLIDES[currentSlide]?.subtitle}
          </p>
        </div>

        {/* Points de navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {PORTAL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 3. CORPS DE LA PAGE (Surélevé avec Layout flexible à double colonne) */}
      <main className="relative z-40 -mt-24 max-w-7xl mx-auto px-4 w-full">
        <div className="bg-white rounded-[50px] p-8 md:p-12 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 min-h-[400px]">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Contenu principal de la page */}
            <div className="flex-1 min-w-0 w-full">
              <Outlet /> 
            </div>
            
            {/* Sidebar Publicitaire / Partenaires */}
            <div className="w-full lg:w-80 shrink-0 lg:border-l lg:border-gray-100 lg:pl-10">
              <AdsSidebar />
            </div>

          </div>
        </div>
      </main>

      {/* 4. FOOTER PROFESSIONNEL */}
      <footer className="bg-[#060B1A] text-white pt-24 pb-12 px-10 rounded-t-[80px] mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20 text-left">
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
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-600 cursor-pointer transition-colors"></div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-blue-500 font-black text-xs uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Services en ligne</li>
                <li className="hover:text-white cursor-pointer transition-colors">Documents officiels</li>
                <li className="hover:text-white cursor-pointer transition-colors">Actualités</li>
              </ul>
            </div>

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