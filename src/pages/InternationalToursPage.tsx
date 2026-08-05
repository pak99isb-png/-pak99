import { type TourPackage } from '../types';
import React from 'react';
import { TourCard } from '../components/TourCard';
import { toursAPI } from '../services/api';
import { Globe, ShieldCheck, Sparkles, PhoneCall, CheckCircle, Loader2 } from 'lucide-react';

interface PageProps {
  onSelectTour: (tour: TourPackage) => void;
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const InternationalToursPage: React.FC<PageProps> = ({ onSelectTour, onOpenBooking, onNavigateHome }) => {
  const [internationalTours, setInternationalTours] = React.useState<TourPackage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    toursAPI.getAll()
      .then(tours => {
        setInternationalTours((tours as unknown as TourPackage[]).filter((t) => t.category === 'International'));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">International Tours</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <Globe className="w-4 h-4" /> Global Expeditions
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Dubai, Turkey, Thailand & World Destinations
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Explore luxury global holidays with guaranteed Tourist Visas, 4-star city center hotels, airport transfers, and guided sightseeing.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#ff5500]" /> Fast Visa Processing</span>
              <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-300" /> 4-Star Hotel Accommodation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Cards Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-[#0b2f64] flex items-center gap-2">
          <Globe className="w-6 h-6 text-[#ff5500]" /> Featured International Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin" />
            </div>
          ) : internationalTours.length === 0 ? (
            <div className="col-span-full text-center py-10 text-slate-500">
              No international tours available at the moment.
            </div>
          ) : (
            internationalTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelectTour={onSelectTour}
                onBookNow={onOpenBooking}
              />
            ))
          )}
        </div>
      </div>

      {/* Included Services */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
        <h3 className="text-xl font-extrabold text-[#0b2f64]">What's Included in International Holiday Packages?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>Express Tourist Visa & Insurance</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>4-Star City Center Hotel Stay</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>Daily Buffet Breakfast</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>Burj Khalifa / Desert Safari Tickets</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>Private Airport Transfers</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <CheckCircle className="w-4 h-4 text-[#ff5500] shrink-0" />
            <span>English/Urdu Speaking Tour Coordinator</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-medium">Planning a custom trip to Europe, Turkey or Malaysia?</div>
          <button
            onClick={() => onOpenBooking('Custom International Tour Inquiry')}
            className="px-6 py-3 bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold rounded-xl shadow-md text-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <PhoneCall className="w-4 h-4" /> Custom International Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

