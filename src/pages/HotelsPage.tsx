import React from 'react';
import { Hotel, MapPin, Star, CheckCircle, Loader2 } from 'lucide-react';
import { hotelsAPI, type ApiHotel } from '../services/api';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const HotelsPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  const [hotelList, setHotelList] = React.useState<ApiHotel[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    hotelsAPI.getAll()
      .then(setHotelList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Hotel Booking</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <Hotel className="w-4 h-4 text-amber-200" /> Worldwide & Pakistan Hotel Reservations
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Book Discounted 4-Star & 5-Star Hotels
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Guaranteed lowest rates for hotels near Haram in Makkah & Madinah, mountain resorts in Hunza & Skardu, and luxury hotels in Dubai & Europe.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin" />
          </div>
        ) : (
          hotelList.map((h, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="relative h-56 overflow-hidden">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{h.rating}</span>
                </div>
              </div>
  
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-[#0b2f64]">{h.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{h.location}</span>
                  </div>
  
                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs text-slate-700 font-medium">
                    {h.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#ff5500]" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {h.price && <div className="text-base font-extrabold text-[#ff5500]">{h.price}</div>}
                  <button
                    onClick={() => onOpenBooking(`Hotel Reservation: ${h.name}`)}
                    className="px-5 py-2.5 bg-[#0b2f64] hover:bg-blue-900 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    Reserve Room
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
