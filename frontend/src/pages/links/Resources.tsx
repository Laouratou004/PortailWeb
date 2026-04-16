import React from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Resources = () => {
  const { subCategoryId } = useParams();

  // Exemple de données finales
  const resources = [
    { 
      id: 1, 
      name: "Hôpital National Donka", 
      desc: "Le plus grand centre hospitalier universitaire de Guinée, récemment rénové.", 
      image: "https://images.unsplash.com/photo-1587351591046-34c1aa355483?auto=format&fit=crop&q=80&w=300", 
      url: "https://hopitaldonka.gov.gn" 
    },
    { 
      id: 2, 
      name: "Hôpital Ignace Deen", 
      desc: "Centre hospitalier historique spécialisé dans les soins intensifs.", 
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300", 
      url: "#" 
    }
  ];

  return (
    <div className="text-left">
      <h2 className="text-4xl font-black text-[#111827] uppercase italic mb-12">
        Liste des <span className="text-blue-600">{subCategoryId}</span>
      </h2>

      <div className="space-y-8">
        {resources.map(res => (
          <div key={res.id} className="flex flex-col md:flex-row gap-8 p-6 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
            {/* Image de la ressource */}
            <div className="w-full md:w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0">
              <img src={res.image} alt={res.name} className="w-full h-full object-cover" />
            </div>

            {/* Contenu textuel */}
            <div className="flex flex-col justify-center flex-grow">
              <h3 className="text-2xl font-black text-[#111827] uppercase italic mb-3">{res.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">{res.desc}</p>
              
              {/* Le bouton discret pour le lien */}
              <a 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit px-6 py-3 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
              >
                Accéder au portail officiel <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};