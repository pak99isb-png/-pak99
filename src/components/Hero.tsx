import { CATEGORIES } from '../types';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, ShieldCheck, Users, Compass, ArrowRight } from 'lucide-react';
import { destinationsAPI, settingsAPI } from '../services/api';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: any) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onExploreClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImages, setSliderImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" // Initial single fallback while loading
  ]);

  useEffect(() => {
    settingsAPI.get().then((settings: any) => {
      if (settings?.heroSliderImages && settings.heroSliderImages.length > 0) {
        setSliderImages(settings.heroSliderImages);
      } else {
        // Fallback to dynamic destinations
        destinationsAPI.getAll().then((data: any) => {
          if (data && data.length > 0) {
            const allImages = data.flatMap((d: any) => d.sliderImages || []);
            const uniqueImages = Array.from(new Set(allImages)).slice(0, 6) as string[];
            if (uniqueImages.length > 0) {
              setSliderImages(uniqueImages);
            }
          }
        }).catch(() => {});
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full bg-slate-900">
        {sliderImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Beautiful destination"
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Subtle overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f64]/80 via-slate-900/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in mt-12">
        {/* Top Badge (Pakistan Tours Style) */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#0b2f64]/60 border border-slate-400/30 text-amber-300 backdrop-blur-md mx-auto">
          <ShieldCheck className="w-3.5 h-3.5" /> 
          <span>PAK 99 TRAVEL & TOURS — Pakistan's Premier Operator</span>
        </div>

        {/* Main Heading (Pakistan Tours Style) */}
        <div className="space-y-4">
          <h1 className="scroll-animate text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl tracking-tight mx-auto">
            Fly High & Explore <span className="text-[#ff5500]">Majestic Peaks</span><br />
            <span className="text-amber-400">& Holy Places</span>
          </h1>
          <p className="scroll-animate delay-100 text-slate-200 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Pak99 Travel & Tours delivers world-class travel experiences across Hunza, Skardu, Swat, Naran, customized family expeditions, and VIP Umrah packages.
          </p>
        </div>

        {/* Interactive Pure White Search Card */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#ff5500]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination (e.g. Hunza, Skardu, Umrah)..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl border border-slate-300 focus:border-[#ff5500] focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#ff5500]">
                <MapPin className="w-5 h-5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-50 text-slate-900 text-sm font-bold rounded-xl border border-slate-300 focus:border-[#ff5500] focus:ring-2 focus:ring-orange-500/30 outline-none transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map((cat: any) => (
                  <option key={cat} value={cat} className="bg-white text-slate-900 font-bold">
                    {cat === 'All' ? 'All Tour Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                onClick={onExploreClick}
                className="w-full bg-gradient-to-r from-[#ff5500] via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Find Tours</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
            <span className="font-extrabold text-[#0b2f64]">Popular:</span>
            {['Hunza', 'Skardu', 'Umrah', 'Fairy Meadows'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  onExploreClick();
                }}
                className="px-3 py-1 rounded-lg bg-slate-100 text-[#0b2f64] font-bold hover:bg-orange-500 hover:text-white border border-slate-200 transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="scroll-animate delay-300 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-2xl text-center border border-slate-200 shadow-md hover:border-orange-500/50 transition-all">
            <div className="flex justify-center text-[#ff5500] mb-1">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#0b2f64]">10,000+</div>
            <div className="text-xs text-slate-600 font-bold">Happy Travelers</div>
          </div>

          <div className="bg-white p-4 rounded-2xl text-center border border-slate-200 shadow-md hover:border-orange-500/50 transition-all">
            <div className="flex justify-center text-amber-500 mb-1">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-[#0b2f64]">4.9 / 5.0</div>
            <div className="text-xs text-slate-600 font-bold">Customer Rating</div>
          </div>

          <div className="bg-white p-4 rounded-2xl text-center border border-slate-200 shadow-md hover:border-orange-500/50 transition-all">
            <div className="flex justify-center text-[#0b2f64] mb-1">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#0b2f64]">50+</div>
            <div className="text-xs text-slate-600 font-bold">Verified Packages</div>
          </div>

          <div className="bg-white p-4 rounded-2xl text-center border border-slate-200 shadow-md hover:border-orange-500/50 transition-all">
            <div className="flex justify-center text-[#ff5500] mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-[#0b2f64]">100%</div>
            <div className="text-xs text-slate-600 font-bold">Safe & Guaranteed</div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {sliderImages.map((_, idx) => (
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
  );
};

