import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
}

const AdsSidebar: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/ads/')
      .then(res => {
        setAds(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        console.error('Erreur de chargement des publicités');
        setAds([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || ads.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-20 h-fit flex flex-col gap-6 w-full lg:w-80">
      <div className="px-4 py-2">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Partenaires</h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <div className="space-y-5">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-[280px] border border-gray-100 hover:border-blue-200"
          >
            {/* Image */}
            <img
              src={ad.image_url}
              alt={ad.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500';
              }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:via-black/60 transition-all" />

            {/* Contenu */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white transition-all">
              <h4 className="text-sm font-black uppercase tracking-tight mb-2 line-clamp-2 leading-tight">
                {ad.title}
              </h4>
              {ad.subtitle && (
                <p className="text-xs font-medium text-gray-200 mb-3 line-clamp-2 opacity-90">
                  {ad.subtitle}
                </p>
              )}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">
                  Découvrir
                </span>
                <ChevronRight size={14} className="text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-[11px] font-bold text-blue-900 leading-relaxed">
          <span className="text-blue-600">💼 </span> Nos partenaires offrent des services complémentaires aux citoyens.
        </p>
      </div>
    </aside>
  );
};

export default AdsSidebar;
