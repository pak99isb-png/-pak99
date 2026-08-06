import { type TourPackage } from '../types';
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortraitTourCardProps {
  tour: TourPackage;
  onSelectTour: (tour: TourPackage) => void;
  onBookNow: (tourTitle: string) => void;
}

export const PortraitTourCard: React.FC<PortraitTourCardProps> = ({ tour, onSelectTour }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => onSelectTour(tour)}
      className="relative w-full h-[450px] sm:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    >
      <img
        src={tour.image}
        alt={tour.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f64]/95 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{tour.departure || tour.duration}</span>
          </div>
          
          <h3 className="text-2xl font-extrabold text-white leading-tight mb-1 line-clamp-2">
            {tour.title}
          </h3>
          
          <p className="text-slate-300 text-sm font-medium line-clamp-1 mb-4 opacity-100 transition-opacity duration-300">
            {tour.location}
          </p>

          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="flex items-baseline gap-1.5 text-white">
              <span className="text-xs text-slate-300">From</span>
              {tour.pricePKR > 0 && <span className="text-lg font-extrabold text-[#ff5500]">PKR {tour.pricePKR.toLocaleString()}</span>}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectTour(tour);
              }}
              className="text-amber-400 font-bold text-sm flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              Explore <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

