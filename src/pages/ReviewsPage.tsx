import React from 'react';
import { Testimonials } from '../components/Testimonials';
import { SEO } from '../components/SEO';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const ReviewsPage: React.FC<PageProps> = ({ onNavigateHome }) => {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO
        title="Customer Reviews - Verified Traveler Testimonials"
        description="Read verified reviews from 5,000+ happy travelers who booked with Pak99 Travel & Tours. Real stories from families, couples, Umrah pilgrims & student visa applicants."
        keywords="pak99 reviews, pak99 travel reviews, travel agency reviews islamabad, tour operator reviews pakistan, customer testimonials, verified traveler reviews, umrah reviews, tour reviews pakistan"
        canonicalPath="/reviews"
      />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Customer Reviews</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              ⭐⭐⭐⭐⭐ Verified Traveler Reviews
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Hear From Our 5,000+ Happy Travelers
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Read real stories and verified ratings from families, honeymoon couples, student visa applicants, and Umrah pilgrims who traveled with Pak99.
            </p>
          </div>
        </div>
      </div>

      <Testimonials />
    </div>
  );
};
