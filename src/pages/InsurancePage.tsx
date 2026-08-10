import React, { useEffect, useState } from 'react';
import { ShieldCheck, Phone, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { insuranceAPI, settingsAPI } from '../services/api';
import type { ApiInsuranceService } from '../services/api';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const InsurancePage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  const [services, setServices] = useState<ApiInsuranceService[]>([]);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      insuranceAPI.getAll(),
      settingsAPI.get()
    ]).then(([servicesData, settingsData]) => {
      setServices(servicesData);
      setSettings(settingsData || {});
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5500]"></div>
      </div>
    );
  }

  const defaultTitle = "Global Ticketing & Travel Insurance Services";
  const defaultDesc = "Enjoy peace of mind with our instant ticketing for domestic and international flights, trains, and comprehensive travel insurance for Schengen, USA, and Umrah.";

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO
        title="Travel Insurance Pakistan - Medical, Trip & Schengen Insurance"
        description="Get comprehensive travel medical insurance for international trips from Pakistan. Schengen visa insurance, trip cancellation coverage, Umrah insurance, flight insurance & worldwide medical coverage. Instant policy from Pak99 Travel & Tours."
        keywords="travel insurance pakistan, travel medical insurance, schengen visa insurance, schengen travel insurance, trip insurance pakistan, travel insurance islamabad, international travel insurance, flight insurance pakistan, travel health insurance, umrah travel insurance, trip cancellation insurance, travel insurance for visa, cheap travel insurance pakistan, best travel insurance, worldwide medical insurance, travel insurance online pakistan, insurance for international travel"
        canonicalPath="/insurance"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Travel Insurance Services",
          "description": "Comprehensive travel medical insurance, Schengen visa insurance, trip cancellation and flight insurance from Pakistan.",
          "serviceType": "Travel Insurance",
          "provider": {
            "@type": "TravelAgency",
            "name": "Pak99 Travel & Tours",
            "url": "https://www.pak99travels.com"
          }
        }}
      />
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Insurance Services</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <ShieldCheck className="w-3.5 h-3.5" /> Bookings & Protection
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {settings.insurance_page_title || defaultTitle}
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              {settings.insurance_page_description || defaultDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={service._id || index} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all hover:-translate-y-1 duration-300">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  {service.title}
                </h2>
              </div>
            </div>
            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-sm text-slate-600 font-medium">
                  {service.description}
                </p>
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-bold">
                        <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" /> {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={() => onOpenBooking(service.inquiryType)}
                className="w-full py-3.5 bg-gradient-to-r from-[#ff5500] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl shadow-md text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" /> {service.buttonText}
              </button>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
            No insurance services added yet. Add them from the Admin Panel.
          </div>
        )}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-[#0b2f64]">Need Urgent Help?</h3>
          <p className="text-sm text-slate-600 font-medium max-w-lg">
            Whether you need a last-minute flight change or an emergency travel insurance policy issued within 10 minutes, our dedicated team is here for you 24/7.
          </p>
        </div>
        <a
          href={settings?.phone1 ? `tel:${settings.phone1.replace(/[^0-9+]/g, '')}` : 'tel:+923108032999'}
          className="shrink-0 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm shadow-xl shadow-green-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone className="w-4 h-4" /> Call Us Directly
        </a>
      </div>
    </div>
  );
};
