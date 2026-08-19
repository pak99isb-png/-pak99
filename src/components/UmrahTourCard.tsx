import React from 'react';
import { type TourPackage } from '../types';
import { MapPin, Clock, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface UmrahTourCardProps {
  tour: TourPackage;
  onSelectTour: (tour: TourPackage) => void;
  onBookNow: (tourTitle: string) => void;
}

export const UmrahTourCard: React.FC<UmrahTourCardProps> = ({ tour, onSelectTour, onBookNow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5 shadow-lg border border-slate-200 hover:border-amber-500/60 hover:shadow-xl relative">
        
        {/* Header Section without Main Image */}
        <div className="relative p-6 bg-gradient-to-br from-amber-600 via-[#0b2f64] to-slate-900 text-white overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Badges */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md shadow-sm border border-white/30">
                  {tour.category}
                </span>
                {tour.featured && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-[#0b2f64] flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{tour.rating}</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-extrabold leading-snug line-clamp-2 text-white">
                {tour.title}
              </h3>
              <p className="text-amber-100 text-xs font-medium mt-1 line-clamp-2">
                {tour.description}
              </p>
            </div>
            
            {/* Highlights quick view */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="flex flex-col gap-1 pt-2 border-t border-white/20">
                {tour.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-amber-50">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-4">
          
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff5500] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase text-slate-400 font-bold">Location</div>
                <div className="text-xs font-extrabold text-[#0b2f64] truncate">{tour.location}</div>
              </div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase text-slate-400 font-bold">Duration</div>
                <div className="text-xs font-extrabold text-[#0b2f64] truncate">{tour.duration}</div>
              </div>
            </div>
          </div>
          
          {tour.departure && (
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span>Departure:</span>
              <span className="text-[#ff5500]">{tour.departure}</span>
            </div>
          )}

          {/* Pricing & Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Starting From</div>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                {tour.pricePKR > 0 && (
                  <span className="text-lg font-extrabold text-[#ff5500]">
                    PKR {tour.pricePKR.toLocaleString()}
                  </span>
                )}
                {tour.originalPricePKR && (
                  <span className="text-xs text-slate-400 line-through whitespace-nowrap">
                    PKR {tour.originalPricePKR.toLocaleString()}
                  </span>
                )}
              </div>
              {tour.couplePricePKR && (
                <div className="text-[10px] font-bold text-[#0b2f64] mt-0.5">
                  Couple: PKR {tour.couplePricePKR.toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onSelectTour(tour)}
                className="flex-1 sm:flex-none p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0b2f64] border border-slate-200 transition-colors text-xs font-extrabold text-center"
              >
                Details
              </button>
              <button
                onClick={() => onBookNow(tour.title)}
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1"
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
