import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type TourPackage } from '../types';
import { toursAPI } from '../services/api';
import { SEO } from '../components/SEO';
import { Calendar, ChevronRight, CheckCircle2, Clock, MapPin, Send, Loader2 } from 'lucide-react';

interface TourDetailsPageProps {
  onNavigate?: (page: string) => void;
  onOpenBooking: (title?: string) => void;
}

export const TourDetailsPage: React.FC<TourDetailsPageProps> = ({ onOpenBooking }) => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      toursAPI.getAll().then((tours: any) => {
        const found = tours.find((t: any) => t.id === id || t._id === id);
        setTour(found || null);
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-10 h-10 text-[#ff5500] animate-spin" /></div>;
  }

  if (!tour) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50"><h2 className="text-2xl font-bold text-[#0b2f64]">Tour not found</h2><Link to="/" className="mt-4 text-[#ff5500] hover:underline">Return to Home</Link></div>;
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      <SEO 
        title={tour.seoTitle || tour.title} 
        description={tour.seoDescription || tour.aboutInfo?.substring(0, 150) || `Book the amazing ${tour.title} package with Pak99 Traveling & Tours.`}
        keywords={tour.seoKeywords || `tour, ${tour.location}, ${tour.category}, travel pakistan`}
      />
      {/* 1. Full 100vh Hero Slider */}
      <section className="relative w-full h-screen overflow-hidden bg-slate-900">
        <img
          src={tour.image}
          alt={tour.title}
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.6]"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          
          {/* Breadcrumb matching the image aligned with container */}
          <div className="absolute top-32 inset-x-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs sm:text-sm font-semibold text-white/80 space-x-2 uppercase tracking-widest">
              <Link to="/" className="hover:text-white cursor-pointer transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/pakistan-tours" className="hover:text-white cursor-pointer transition-colors">Destinations</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-amber-400 font-bold">{tour.title}</span>
            </div>
          </div>

          <div className="mt-16 animate-fade-in space-y-4 max-w-4xl">
            <p className="text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
              {tour.location}
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              {tour.title}
            </h1>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white font-medium text-sm drop-shadow-md">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Category: <span className="font-bold text-amber-300">{tour.category}</span></span>
            </div>
          </div>
        </div>


      </section>

      {/* 2. Destination Information & Fun Facts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* About the Tour */}
            {tour.aboutInfo && (
              <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-3xl font-extrabold text-[#0b2f64] mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-[#ff5500]" />
                  About {tour.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8 font-medium whitespace-pre-wrap">
                  {tour.aboutInfo}
                </p>
                
                {/* Fun Facts */}
                {tour.funFacts && tour.funFacts.length > 0 && (
                  <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100">
                    <h3 className="text-xl font-bold text-[#ff5500] mb-4 flex items-center gap-2">
                      <span className="bg-[#ff5500] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">?</span>
                      Did you know?
                    </h3>
                    <ul className="space-y-3">
                      {tour.funFacts.map((fact: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-slate-700">
                          <div className="mt-1 flex-shrink-0 text-amber-500">•</div>
                          <span className="font-semibold">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tour Package Details */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-3xl font-extrabold text-[#0b2f64] mb-6">
                {tour.title}
              </h2>
              
              {/* Highlights */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider">Tour Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Day by Day Itinerary */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider">Detailed Itinerary</h3>
                <div className="space-y-6">
                  {tour.itinerary.map((day: any, idx: number) => (
                    <div key={idx} className="relative pl-6 sm:pl-8">
                      {/* Timeline Line */}
                      {idx !== tour.itinerary.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-200" />
                      )}
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-[3px] border-[#ff5500] rounded-full z-10" />
                      
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-extrabold text-lg text-[#0b2f64] mb-1">Day {day.day}</div>
                        <h4 className="font-bold text-[#ff5500] mb-3 text-sm uppercase tracking-wide">{day.title}</h4>
                        <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                          {day.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies and Items to Bring */}
              <div className="mt-12 pt-10 border-t border-slate-100">
                <h3 className="text-xl font-bold text-[#0b2f64] mb-6 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#ff5500]" />
                  Pakistan Tours Policies & Guidelines
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Booking & Cancellation */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-extrabold text-[#ff5500] mb-4 text-sm uppercase">For Booking & Registration</h4>
                      <ul className="space-y-3 text-sm text-slate-700 font-medium">
                        <li className="flex gap-2 items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>50% Payment Advance & remaining 50% will be clear on departure time in the shape of cash only.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Must send a screenshot of payment and your full name.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-extrabold text-red-600 mb-4 text-sm uppercase">Cancellation Policy</h4>
                      <ul className="space-y-3 text-sm text-slate-700 font-medium">
                        <li className="flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <span>7 Days before departure: <strong>50% Deduction</strong>.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <span>3 Days before departure: <strong>75% Deduction</strong>.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <span>Less than 3 Days before departure: <strong>100% Deduction</strong>.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Items to Bring & Footer */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h4 className="font-extrabold text-[#0b2f64] mb-4 text-sm uppercase">👕 Items to bring with you 👜</h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-sm text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> CNIC (Compulsory)</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Power Bank & Charger</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Warm Clothes / Jacket</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Joggers</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Personal Belongings</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Normal Clothes</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Handsfree</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Water Bottle</div>
                        <div className="flex items-center gap-1.5"><span className="text-amber-500">👉</span> Medicines</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0b2f64] to-[#ff5500] p-6 rounded-2xl text-white text-center shadow-md">
                      <p className="font-semibold text-sm leading-relaxed">
                        Pak99 Travel & Tours provides the best services for tourism all across Pakistan! Come join us ❤️
                      </p>
                      <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide">
                        Departures from Lahore / Islamabad weekly 😍
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar for Pricing & Booking */}
          <div className="lg:col-span-4">
            <div className="sticky top-[120px] bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 border-t-4 border-t-[#ff5500]">
              <div className="text-center mb-6 border-b border-slate-100 pb-6">
                <div className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-2">Duration</div>
                <div className="text-2xl font-extrabold text-[#0b2f64] flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6 text-amber-500" />
                  {tour.duration}
                </div>
              </div>

              {/* Pricing Blocks */}
              <div className="space-y-4 mb-8">
                {/* Solo Price */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Individual / Solo</div>
                  <div className="text-3xl font-extrabold text-[#ff5500]">
                    <span className="text-lg">PKR</span> {tour.pricePKR.toLocaleString()}
                  </div>
                </div>

                {/* Couple Price */}
                {tour.couplePricePKR && (
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <div className="text-xs font-extrabold text-amber-600 uppercase tracking-widest mb-1">For Couples</div>
                    <div className="text-3xl font-extrabold text-amber-600">
                      <span className="text-lg">PKR</span> {tour.couplePricePKR.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {tour.departure && (
                <div className="bg-slate-100 p-4 rounded-xl text-center mb-6">
                  <span className="text-xs font-bold text-slate-500 uppercase">Departure</span>
                  <div className="font-extrabold text-[#0b2f64] mt-1">{tour.departure}</div>
                </div>
              )}

              <button
                onClick={() => onOpenBooking(tour.title)}
                className="w-full bg-gradient-to-r from-[#ff5500] via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-4 px-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg cursor-pointer"
              >
                <Send className="w-5 h-5" />
                Book This Tour
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

