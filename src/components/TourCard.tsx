import { type TourPackage } from '../types';
import { MapPin, Clock, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TourCardProps {
  tour: TourPackage;
  onSelectTour: (tour: TourPackage) => void;
  onBookNow: (tourTitle: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelectTour, onBookNow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 shadow-lg border border-slate-200 hover:border-[#ff5500]/60 hover:shadow-xl">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#0b2f64] text-white shadow-md">
            {tour.category}
          </span>
          {tour.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#ff5500] to-amber-500 text-white flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-amber-200" /> Featured
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-900 border border-slate-200 backdrop-blur-md flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-extrabold">{tour.rating}</span>
          <span className="text-slate-500 text-[10px]">({tour.reviewsCount})</span>
        </div>

        {/* Location & Duration Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold flex-wrap gap-1">
          <div className="flex items-center gap-1.5 bg-[#0b2f64]/90 px-2.5 py-1 rounded-lg border border-blue-900 backdrop-blur-sm shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[140px]">{tour.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0b2f64]/90 px-2.5 py-1 rounded-lg border border-blue-900 backdrop-blur-sm shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{tour.duration}</span>
          </div>
          {tour.departure && (
            <div className="flex items-center gap-1.5 bg-[#ff5500]/90 px-2.5 py-1 rounded-lg border border-orange-600 backdrop-blur-sm shadow-sm w-full mt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Departs:</span>
              <span className="font-bold">{tour.departure}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div>
          <h3 className="text-lg font-extrabold text-[#0b2f64] group-hover:text-[#ff5500] transition-colors line-clamp-2 leading-snug">
            {tour.title}
          </h3>
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
            {tour.description}
          </p>
        </div>

        {/* Top Highlights Preview */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
          {tour.highlights.slice(0, 2).map((highlight: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
              <span className="truncate font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Starting From</div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                {tour.pricePKR > 0 && (
                  <span className="text-lg font-extrabold text-[#ff5500]">
                    PKR {tour.pricePKR.toLocaleString()} <span className="text-[10px] text-slate-500 font-medium">{tour.couplePricePKR ? '(Solo)' : ''}</span>
                  </span>
                )}
                {tour.originalPricePKR && (
                  <span className="text-xs text-slate-400 line-through">
                    PKR {tour.originalPricePKR.toLocaleString()}
                  </span>
                )}
              </div>
              {tour.couplePricePKR && (
                <span className="text-xs font-bold text-[#0b2f64]">
                  PKR {tour.couplePricePKR.toLocaleString()} <span className="text-[10px] text-slate-500 font-medium">(Couple)</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTour(tour)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0b2f64] border border-slate-200 transition-colors text-xs font-extrabold cursor-pointer"
              title="View Itinerary Details"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(tour.title)}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

