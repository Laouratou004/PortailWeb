import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SubCategories = () => {
  const { categoryId } = useParams(); // Récupère l'ID (ex: "sante")

  // Exemple de données (À remplacer par un appel API plus tard)
  const subCats = [
    { id: 'hopitaux', name: 'Hôpitaux Nationaux', desc: 'Grands centres hospitaliers de référence.' },
    { id: 'centres', name: 'Centres de Santé', desc: 'Soins de proximité pour les citoyens.' },
    { id: 'cliniques', name: 'Cliniques Privées', desc: 'Établissements de soins spécialisés.' },
  ];

  return (
    <div className="text-left">
      <h2 className="text-4xl font-black text-[#111827] uppercase italic mb-10">
        Secteur <span className="text-blue-600">{categoryId}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subCats.map(sub => (
          <Link 
            key={sub.id} 
            to={`/domains/${categoryId}/${sub.id}`}
            className="group flex items-center justify-between p-8 bg-gray-50 rounded-[2rem] hover:bg-blue-600 transition-all border border-gray-100 shadow-sm"
          >
            <div>
              <h3 className="text-xl font-black uppercase italic group-hover:text-white transition-colors">{sub.name}</h3>
              <p className="text-gray-500 text-sm group-hover:text-white/70">{sub.desc}</p>
            </div>
            <ChevronRight className="text-blue-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
};