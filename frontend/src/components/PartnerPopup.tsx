import React from 'react';

export interface PartnerPopupData {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  url: string;
  accent: string;
}

interface PartnerPopupProps {
  partner: PartnerPopupData | null;
  onClose: () => void;
}

const PartnerPopup: React.FC<PartnerPopupProps> = ({ partner, onClose }) => {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-3xl rounded-[32px] overflow-hidden bg-white shadow-2xl ring-1 ring-black/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-gray-100"
          aria-label="Fermer le popup partenaire"
        >
          ✕
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="relative overflow-hidden bg-gray-100">
            <img
              src={partner.image_url}
              alt={partner.name}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200';
              }}
            />
          </div>

          <div className="p-8 sm:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              <div className={`inline-flex rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.4em] text-white ${partner.accent}`}>Partenaire en vedette</div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{partner.name}</h2>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.35em] text-slate-500">{partner.tagline}</p>
              </div>
              <p className="text-sm leading-7 text-slate-600">{partner.description}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
              >
                Découvrir {partner.name}
              </a>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PARTNER_POPUPS: PartnerPopupData[] = [
  {
    id: 1,
    name: 'Orange Guinée',
    tagline: 'Connectivité et innovation locale',
    description:
      'Orange Guinée accompagne la transformation digitale du pays avec des solutions mobiles fiables, des offres data et des services professionnels pour les citoyens et les entreprises.',
    image_url:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    url: 'https://www.orange.com/fr/locations/guinee',
    accent: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Max IT',
    tagline: 'Solutions numériques sur mesure',
    description:
      'Max IT met en avant l’expertise locale en informatique, en infrastructure et en digitalisation pour soutenir les services publics et les entreprises guinéennes.',
    image_url:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
    url: 'https://www.maxit.example.com',
    accent: 'bg-blue-600'
  },
  {
    id: 3,
    name: 'Service Publique Connecté',
    tagline: 'Moderniser l’accès citoyen',
    description:
      'Découvrez des offres partenaires qui simplifient les démarches administratives en ligne et renforcent l’accès numérique des citoyens.',
    image_url:
      'https://images.unsplash.com/photo-1551033406-611cf9bdc83e?w=1200',
    url: 'https://www.service-public-connecte.gn',
    accent: 'bg-emerald-600'
  }
];

export default PartnerPopup;
