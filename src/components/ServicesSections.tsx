import React, { useState, useEffect } from 'react';
import { ShieldCheck, Hotel, BookOpen, Clock, ArrowRight, Star, MapPin, CheckCircle, GraduationCap, Loader2 } from 'lucide-react';
import { hotelsAPI, blogsAPI, type ApiHotel, type ApiBlog } from '../services/api';

interface ServicesSectionsProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesSections: React.FC<ServicesSectionsProps> = ({ onOpenBooking }) => {
  const studyDestinations = [
    {
      country: 'Study in UK',
      flag: '🇬🇧',
      highlights: ['Top Russell Group Universities', '2-Year Post-Study Work (PSW) Visa', 'No IELTS Options Available'],
      badge: 'High Visa Success'
    },
    {
      country: 'Study in Australia',
      flag: '🇦🇺',
      highlights: ['4-5 Years Post-Study Work Rights', 'PR Pathway Opportunities', 'Subclass 500 Student Visa Support'],
      badge: 'Top PR Choice'
    },
    {
      country: 'Study in Germany',
      flag: '🇩🇪',
      highlights: ['Zero Tuition Fee Public Universities', '18 Months Job Seeker Visa', 'Blocked Account Guidance'],
      badge: 'Free Tuition'
    },
    {
      country: 'Study in Canada',
      flag: '🇨🇦',
      highlights: ['3-Year PGWP Work Permit', 'Express Entry & PNP Eligibility', 'Undergraduate & Masters Programs'],
      badge: 'Direct PR Pathways'
    },
    {
      country: 'Scholarships & Grants',
      flag: '🏆',
      highlights: ['100% Fully Funded Scholarships', 'Chevening, Australia Awards & DAAD', 'University Merit Fee Concessions'],
      badge: 'Up to 100% Funded'
    },
    {
      country: 'Document Translation & Attestation',
      flag: '📑',
      highlights: ['MOFA, HEC, IBCC & Embassy Attestation', 'Certified German, French & English Translation', 'Fast-Track 24-Hour Processing'],
      badge: 'Certified Attestation'
    }
  ];

  const [partnerHotels, setPartnerHotels] = useState<ApiHotel[]>([]);
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    hotelsAPI.getAll()
      .then(data => setPartnerHotels(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoadingHotels(false));

    blogsAPI.getAll()
      .then(data => setBlogs(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoadingBlogs(false));
  }, []);

  return (
    <div className="space-y-24">
      {/* 1. Study Abroad & Document Attestation Section */}
      <section id="study-abroad" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#0b2f64] text-white shadow-sm">
              <GraduationCap className="w-4 h-4 text-orange-400" /> Student Visas, Admissions & Attestations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64] mt-2">
              Study Abroad, Scholarships & <span className="text-gradient">Document Attestation</span>
            </h2>
            <p className="text-sm text-slate-600 font-semibold max-w-2xl">
              Pak99 Educational Consultancy provides end-to-end university admissions, student visa processing, MOFA/HEC document translation & attestation services.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('Study Abroad Free Consultation')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff5500] via-orange-600 to-amber-500 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" /> Book Free Assessment
          </button>
        </div>

        {/* Study Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {studyDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md hover:shadow-xl hover:border-[#ff5500]/60 transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dest.flag}</span>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-orange-500/10 text-[#ff5500] border border-orange-500/30">
                    {dest.badge}
                  </span>
                </div>

                <h3 className="text-xs font-extrabold text-[#0b2f64] group-hover:text-[#ff5500] transition-colors leading-snug">
                  {dest.country}
                </h3>

                <ul className="space-y-1 text-[11px] text-slate-600 font-medium">
                  {dest.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <CheckCircle className="w-3 h-3 text-[#ff5500] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenBooking(`Inquiry: ${dest.country}`)}
                className="w-full py-2 bg-slate-100 group-hover:bg-[#ff5500] text-[#0b2f64] group-hover:text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer text-center"
              >
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Travel Insurance Section */}
      <section id="insurance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-blue-900 via-[#0b2f64] to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-blue-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-200" /> Worldwide Travel Protection
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Comprehensive <span className="text-[#ff5500]">Travel & Medical Insurance</span>
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium max-w-xl">
                Travel with 100% confidence. Pak99 provides instant Schengen, Saudi Umrah, USA, Europe, and Asia medical insurance with zero hassle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 bg-blue-950/60 p-2.5 rounded-xl border border-blue-800">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Emergency Medical & Hospital Expenses</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-950/60 p-2.5 rounded-xl border border-blue-800">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Flight Cancellation & Delay Coverage</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-950/60 p-2.5 rounded-xl border border-blue-800">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Lost Baggage & Passport Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-950/60 p-2.5 rounded-xl border border-blue-800">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Instant E-Policy Issued in 15 Minutes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl text-slate-900 space-y-4 shadow-xl border border-slate-200">
              <h3 className="text-lg font-extrabold text-[#0b2f64]">Get Instant Insurance Quote</h3>
              <p className="text-xs text-slate-600 font-medium">Approved for Schengen Visas, Umrah, and Global Destinations.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Destination Country</label>
                  <input
                    type="text"
                    placeholder="e.g., Saudi Arabia, Turkey, Schengen/Europe"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:border-[#ff5500] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Trip Duration</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:border-[#ff5500] outline-none">
                      <option>7 Days</option>
                      <option>15 Days</option>
                      <option>30 Days</option>
                      <option>1 Year Multi-Entry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Age of Traveler</label>
                    <input
                      type="number"
                      placeholder="e.g. 35"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:border-[#ff5500] outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking('Travel Insurance Policy Request')}
                  className="w-full py-3 bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold rounded-xl shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" /> Issue Insurance Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hotel Booking Section */}
      <section id="hotels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/10 text-[#0b2f64] border border-blue-500/30">
              <Hotel className="w-3.5 h-3.5 text-[#0b2f64]" /> Premium Accommodations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64] mt-2">
              Worldwide & Pakistan <span className="text-gradient">Hotel Reservations</span>
            </h2>
            <p className="text-sm text-slate-600 font-semibold max-w-xl">
              Book discounted 4-Star & 5-Star hotels in Makkah, Madinah, Hunza, Skardu, Swat, Dubai, and major world cities.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('Custom Hotel Reservation')}
            className="px-5 py-2.5 rounded-xl bg-[#0b2f64] text-white font-extrabold text-xs shadow-md hover:bg-blue-900 flex items-center gap-2 cursor-pointer"
          >
            <Hotel className="w-4 h-4 text-orange-400" /> Reserve Custom Hotel
          </button>
        </div>

        {/* Hotel Cards Grid */}
        {loadingHotels ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-[#0b2f64] animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerHotels.map((hotel, idx) => (
              <div key={hotel._id || idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.95]"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500] transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {hotel.price && <div className="text-sm font-extrabold text-[#ff5500]">{hotel.price}</div>}
                    <button
                      onClick={() => onOpenBooking(`Hotel Booking: ${hotel.name}`)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-[#ff5500] text-[#0b2f64] hover:text-white rounded-lg text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Blogs & Travel Guides Section */}
      <section id="blogs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/10 text-[#ff5500] border border-orange-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Travel Insights & Advice
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">
            Latest <span className="text-gradient">Travel Blogs & Guides</span>
          </h2>
          <p className="text-sm text-slate-600 font-semibold">
            Expert tips, weather insights, packing lists, and destination guides for Northern Pakistan and Umrah journeys.
          </p>
        </div>

        {loadingBlogs ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-[#0b2f64] animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, idx) => (
              <article key={blog._id || idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.95]"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#ff5500] text-white shadow-md">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                      <span>{blog.date}</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3 text-[#ff5500]" /> {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenBooking(`Blog Article Inquiry: ${blog.title}`)}
                      className="text-xs font-extrabold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};



