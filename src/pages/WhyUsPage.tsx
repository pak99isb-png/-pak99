import React from 'react';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SEO } from '../components/SEO';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const WhyUsPage: React.FC<PageProps> = ({ onNavigateHome }) => {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO
        title="Why Choose Pak99 - Pakistan's Top Travel Agency"
        description="Why Pak99 Travel & Tours is Pakistan's most trusted travel agency — own Prado fleet, direct hotel partnerships, 24/7 support, 5,000+ happy travelers. Best tour operator in Islamabad."
        keywords="why pak99, best travel agency pakistan, best tour operator islamabad, trusted travel agency, pak99 travel reviews, top travel agency pakistan, luxury travel pakistan, prado fleet tours"
        canonicalPath="/why-us"
      />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Why Choose Pak99</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              ⭐ Premier Travel Partner
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Why Pak99 Travel & Tours is Pakistan's Top Choice
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              We own an executive 4x4 Prado fleet, work directly with 4-star mountain hotels, and provide 24/7 dedicated travel support for thousands of satisfied explorers every year.
            </p>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
};
