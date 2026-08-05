import { type TourPackage } from '../types';
import React, { useRef, useState, useEffect } from 'react';
import { PortraitTourCard } from '../components/PortraitTourCard';
import { toursAPI, settingsAPI } from '../services/api';
import { PhoneCall, Sparkles, ArrowRight, ArrowDown, Loader2 } from 'lucide-react';

interface PageProps {
  onSelectTour: (tour: TourPackage) => void;
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const PakistanToursPage: React.FC<PageProps> = ({ onSelectTour, onOpenBooking }) => {
  const [pakistanTours, setPakistanTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const toursSectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80"
  ]);

  useEffect(() => {
    Promise.all([
      settingsAPI.get().catch(() => ({} as any)),
      toursAPI.getAll().catch(() => [])
    ]).then(([settings, toursData]) => {
      const pakTours = (toursData as TourPackage[]).filter((t) => t.category === 'Northern Pakistan');
      setPakistanTours(pakTours);
      
      if (settings?.pakistanToursSliderImages && settings.pakistanToursSliderImages.length > 0) {
        setSliderImages(settings.pakistanToursSliderImages);
      } else if (pakTours.length > 0) {
        const uniqueImages = Array.from(new Set(pakTours.map(t => t.image).filter(Boolean))).slice(0, 4) as string[];
        if (uniqueImages.length > 0) setSliderImages(uniqueImages);
      }
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleExploreTours = () => {
    toursSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 min-h-screen">
      {/* 1. Full-Bleed Hero Section Slider */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          {sliderImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Pakistan Northern Place ${idx + 1}`}
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] transition-opacity duration-1000 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Subtle overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f64]/80 via-slate-900/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6 mt-12">
          {/* Excellence Badge */}
          <div className="scroll-animate inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#0b2f64]/60 border border-slate-400/30 text-amber-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> 10+ Years of Excellence
          </div>

          <h1 className="scroll-animate delay-100 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl tracking-tight">
            Discover the <span className="text-[#ff5500]">Majestic</span><br />
            <span className="text-amber-400">Beauty</span> of Northern Pakistan
          </h1>

          <p className="scroll-animate delay-200 text-lg sm:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
            Experience the majestic peaks of Hunza, the serene lakes of Skardu, and the lush valleys of Swat. Your ultimate adventure awaits.
          </p>

          <div className="scroll-animate delay-300 pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExploreTours}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0b2f64] to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Tours <ArrowDown className="w-4 h-4" />
            </button>
            <a
              href="tel:+923027751110"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm shadow-xl shadow-green-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {sliderImages.map((_: any, idx: number) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Destinations/Tours Section (Matching Image 2) */}
      <section ref={toursSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="scroll-animate text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-full">
              <Loader2 className="w-10 h-10 text-[#ff5500] animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0b2f64]">Curating the best packages...</h3>
            </div>
          ) : pakistanTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 col-span-full">
              {pakistanTours.map((tour, idx) => (
                <div key={tour.id || idx} className={`scroll-animate delay-${Math.min(idx * 100, 500)}`}>
                  <PortraitTourCard
                    tour={tour}
                    onSelectTour={onSelectTour}
                    onBookNow={onOpenBooking}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="scroll-animate text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm col-span-full">
              <p className="text-slate-500">No tours found at the moment.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={() => onOpenBooking('Custom Northern Pakistan Tour Inquiry')}
            className="px-8 py-3 rounded-full border-2 border-slate-200 text-[#0b2f64] hover:border-[#0b2f64] font-extrabold text-sm transition-colors flex items-center gap-2 cursor-pointer bg-white"
          >
            Request Custom Tour <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="text-[#0b2f64] text-xs font-extrabold uppercase tracking-widest">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-800">
            Travel with <span className="text-[#0b2f64]">Confidence</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-[#0b2f64] mx-auto rounded-full mt-6"></div>
          
          <p className="text-slate-500 font-medium leading-relaxed mt-8 max-w-2xl mx-auto">
            From the majestic peaks of Hunza to the lush valleys of Swat, our experienced guides and luxury transport ensure that your journey through Northern Pakistan is absolutely flawless. Let us turn your travel dreams into unforgettable memories.
          </p>
        </div>
      </section>
    </div>
  );
};

