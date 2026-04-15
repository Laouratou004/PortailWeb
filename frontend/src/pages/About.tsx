import React from 'react';
import { ShieldCheck, Users, Cpu, Target, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="text-left">
      {/* ==========================================
          1. SECTION INTRODUCTION (CONTENU)
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <div className="inline-block px-4 py-1 bg-blue-50 text-[#1D4ED8] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Notre Engagement
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-[#111827] uppercase italic tracking-tighter mb-8 leading-tight">
            Une administration <br/> <span className="text-blue-600">connectée</span> aux citoyens
          </h2>
          <p className="text-xl text-gray-600 font-medium leading-relaxed mb-6 italic">
            Le Portail Web de la République de Guinée est l'outil central de la transformation digitale de notre pays.
          </p>
          <p className="text-gray-500 leading-relaxed mb-10">
            Notre mission est de simplifier l'accès aux services publics et de garantir une transparence totale dans la gestion administrative. Chaque outil développé est pensé pour faciliter la vie des Guinéens.
          </p>
          <div className="border-l-4 border-blue-600 pl-6">
             <p className="text-gray-900 font-black text-sm uppercase italic tracking-wider">
               "La numérisation n'est pas qu'un choix technique, c'est une volonté de progrès social."
             </p>
          </div>
        </div>

        {/* Bloc Visuel */}
        <div className="bg-gray-50 p-6 md:p-12 rounded-[4rem] relative">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
           <div className="aspect-video bg-[#060B1A] rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center">
                <span className="text-blue-500 font-black text-6xl italic italic">GN</span>
                <span className="text-white/20 font-bold uppercase tracking-[0.5em] text-[10px] mt-4">Vision 2026</span>
              </div>
           </div>
        </div>
      </div>

      {/* ==========================================
          2. GRILLE DE VALEURS
          ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <ShieldCheck size={32} />, 
            title: "Sécurité", 
            desc: "Protection rigoureuse de vos données personnelles et des échanges administratifs." 
          },
          { 
            icon: <Users size={32} />, 
            title: "Inclusivité", 
            desc: "Des services accessibles à tous, partout sur le territoire national." 
          },
          { 
            icon: <Cpu size={32} />, 
            title: "Innovation", 
            desc: "Utilisation des technologies les plus modernes pour une efficacité maximale." 
          }
        ].map((val, i) => (
          <div key={i} className="p-10 bg-white rounded-[3rem] border-2 border-gray-50 hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-xl group">
            <div className="text-blue-600 mb-8 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              {val.icon}
            </div>
            <h3 className="text-2xl font-black text-[#111827] uppercase italic tracking-tighter mb-4">{val.title}</h3>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;