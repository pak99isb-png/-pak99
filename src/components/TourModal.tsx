import { type TourPackage } from '../types';
import { X, MapPin, Clock, Star, CheckCircle, Calendar, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';

interface TourModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBookNow: (tourTitle: string) => void;
}

export const TourModal: React.FC<TourModalProps> = ({ tour, onClose, onBookNow }) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-orange-500/30 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500 text-white shadow-lg">
                {tour.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {tour.rating} ({tour.reviewsCount} reviews)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {tour.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{tour.duration}</span>
              </div>
              {tour.departure && (
                <div className="flex items-center gap-1 bg-[#ff5500]/80 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Departs: {tour.departure}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto bg-white dark:bg-slate-950">
          {/* Description */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-2">Overview</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{tour.description}</p>
          </div>

          {/* Highlights Grid */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-3">Key Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tour.highlights.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-900/70 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Day-by-Day Detailed Itinerary
            </h3>
            <div className="space-y-3">
              {tour.itinerary.map((dayItem: any) => (
                <div key={dayItem.day} className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-extrabold text-xs border border-orange-500/30">
                      Day {dayItem.day}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{dayItem.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pl-1 sm:pl-10 leading-relaxed">{dayItem.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Inclusions */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold mb-3">What's Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.inclusions.map((inc: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Pricing & Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-bold">Package Price</span>
            <div className="flex items-baseline gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
                  PKR {tour.pricePKR.toLocaleString()} <span className="text-xs text-slate-500">{tour.couplePricePKR ? '(Solo)' : ''}</span>
                </span>
                {tour.originalPricePKR && (
                  <span className="text-xs text-slate-400 line-through">
                    PKR {tour.originalPricePKR.toLocaleString()}
                  </span>
                )}
                {tour.couplePricePKR && (
                  <span className="text-lg font-bold text-[#0b2f64] dark:text-blue-300">
                    PKR {tour.couplePricePKR.toLocaleString()} <span className="text-xs text-slate-500">(Couple)</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/923315290155?text=Hello%20Pak99%20Tours,%20I%20am%20interested%20in%20${encodeURIComponent(tour.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-orange-600 dark:text-orange-400 font-bold text-xs border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
            <button
              onClick={() => {
                onClose();
                onBookNow(tour.title);
              }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              Reserve / Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

