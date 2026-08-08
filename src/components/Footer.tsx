import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingsAPI } from '../services/api';

interface FooterProps {
  onNavigateToTour?: (tourId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTour }) => {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    settingsAPI.get().then(setSettings).catch(console.error);
  }, []);

  const handleTourClick = (e: React.MouseEvent, tourId: string) => {
    e.preventDefault();
    if (onNavigateToTour) {
      onNavigateToTour(tourId);
    }
  };

  const phone1 = settings?.phone1 || '0310-8032999';
  const phone2 = settings?.phone2 || '051-2757282';
  const phone1Link = settings?.phone1 ? `tel:${settings.phone1.replace(/[^0-9+]/g, '')}` : 'tel:+923108032999';
  const phone2Link = settings?.phone2 ? `tel:${settings.phone2.replace(/[^0-9+]/g, '')}` : 'tel:+92512757282';
  const waNum = settings?.whatsappNumber || '923108032999';

  return (
    <footer className="bg-[#0b2f64] border-t border-blue-900 text-slate-300 text-xs pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-blue-800/80">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <a href="#" className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
              <img src="/logo.png" alt="Pak99 Logo" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white">PAK 99</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ff5500] text-white uppercase shadow-sm">TRAVEL & TOURS</span>
              </div>
            </div>
          </a>

          <p className="text-slate-200 text-xs leading-relaxed font-normal">
            Pak99 Travel & Tours is your premier travel partner in Pakistan. We specialize in luxury Northern Pakistan tours, custom family trips, and VIP Umrah packages.
          </p>

          <div className="flex items-center gap-3">
            {(settings.facebookUrl !== '') && (
              <a href={settings.facebookUrl || "https://www.facebook.com/people/PAK99-Travel-TOURS/61583047934939/"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-900/80 border border-blue-800 hover:border-orange-500 text-slate-200 hover:text-orange-400 flex items-center justify-center transition-colors" title="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {(settings.instagramUrl !== '') && (
              <a href={settings.instagramUrl || "https://www.instagram.com/pak99_travel/"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-900/80 border border-blue-800 hover:border-orange-500 text-slate-200 hover:text-orange-400 flex items-center justify-center transition-colors" title="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            )}
            {(settings.twitterUrl) && (
              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-900/80 border border-blue-800 hover:border-orange-500 text-slate-200 hover:text-orange-400 flex items-center justify-center transition-colors" title="Twitter / X">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
            )}
            <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-blue-900/80 border border-blue-800 hover:border-orange-500 text-slate-200 hover:text-orange-400 flex items-center justify-center transition-colors" title="WhatsApp Desk">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Top Destinations */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Destinations</h4>
          <ul className="space-y-2 text-slate-200 font-medium">
            <li><button onClick={(e) => handleTourClick(e, 'Hunza')} className="hover:text-orange-400 transition-colors">Hunza & Attabad Lake</button></li>
            <li><button onClick={(e) => handleTourClick(e, 'Skardu')} className="hover:text-orange-400 transition-colors">Skardu & Deosai Plains</button></li>
            <li><button onClick={(e) => handleTourClick(e, 'Fairy Meadows')} className="hover:text-orange-400 transition-colors">Fairy Meadows & Nanga Parbat</button></li>
            <li><button onClick={(e) => handleTourClick(e, 'Swat')} className="hover:text-orange-400 transition-colors">Swat & Malam Jabba Skiing</button></li>
            <li><button onClick={(e) => handleTourClick(e, 'Naran')} className="hover:text-orange-400 transition-colors">Naran & Kaghan Valley</button></li>
          </ul>
        </div>

        {/* Col 3: Services */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-2 text-slate-200 font-medium">
            <li><Link to="/umrah" className="hover:text-orange-400 transition-colors">VIP Umrah Packages</Link></li>
            <li><Link to="/why-us" className="hover:text-orange-400 transition-colors">Customized Family Trips</Link></li>
            <li><Link to="/pakistan-tours" className="hover:text-orange-400 transition-colors">Luxury Prado / Jeep Safari</Link></li>
            <li><Link to="/pakistan-tours" className="hover:text-orange-400 transition-colors">Honeymoon Special Packages</Link></li>
            <li><Link to="/why-us" className="hover:text-orange-400 transition-colors">Corporate Group Tours</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Office</h4>
          <div className="space-y-3 text-slate-200 font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>Office No. 03 Nawaz Arcade National Police Foundation, PWD Islamabad</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>
                <a href={phone1Link} className="hover:text-orange-400">{phone1}</a> <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> <a href={phone2Link} className="hover:text-orange-400">{phone2}</a>
                {settings?.phone3 && (
                  <> <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> <a href={`tel:${settings.phone3.replace(/[^0-9+]/g, '')}`} className="hover:text-orange-400">{settings.phone3}</a></>
                )}
                {(() => {
                  const wa = settings?.whatsappNumber || '923315290155';
                  const displayWa = wa.startsWith('92') && wa.length === 12 ? `0${wa.slice(2, 5)}-${wa.slice(5)}` : wa;
                  return <> <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> <a href={`tel:+${wa}`} className="hover:text-orange-400">{displayWa}</a></>;
                })()}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-400 fill-current shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" className="text-orange-400 font-extrabold hover:underline">
                WhatsApp: <br className="sm:hidden" /> {phone1} <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> {phone2}
                {settings?.phone3 && (
                  <> <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> {settings.phone3}</>
                )}
                {(() => {
                  const wa = settings?.whatsappNumber || '923315290155';
                  const displayWa = wa.startsWith('92') && wa.length === 12 ? `0${wa.slice(2, 5)}-${wa.slice(5)}` : wa;
                  return <> <span className="hidden sm:inline">/</span> <br className="sm:hidden" /> {displayWa}</>;
                })()}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <span>info@pak99tours.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300 text-xs text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Pak99 Travel & Tours.<br className="sm:hidden" /> All rights reserved.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <button onClick={(e) => { e.preventDefault(); window.location.href='/admin'; }} className="hover:text-white transition-colors cursor-pointer">
            Admin Login
          </button>
          <a
            href="https://wa.me/923012980226"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
          >
            Developed by Saad Ali (SM IT Agency)
          </a>
        </div>
      </div>
    </footer>
  );
};
