import { type DepartureCity, type PackageTier } from '../types';
import React, { useState } from 'react';
import { Sparkles, MapPin, Building, PlaneTakeoff, CalendarDays, Users, Info } from 'lucide-react';
import { umrahAPI, type ApiUmrahPackage } from '../services/api';
import { Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

const CITIES: DepartureCity[] = ['Lahore', 'Islamabad', 'Faisalabad', 'Multan'];
const TIERS: PackageTier[] = ['Economy', 'Star'];

export const UmrahPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  const [selectedCity, setSelectedCity] = useState<DepartureCity>('Faisalabad');
  const [selectedTier, setSelectedTier] = useState<PackageTier>('Economy');
  const [packages, setPackages] = useState<ApiUmrahPackage[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    umrahAPI.getAll()
      .then(setPackages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredPackages = packages.filter(
    (pkg) => pkg.city === selectedCity && pkg.tier === selectedTier
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20 animate-fade-in">
      <SEO
        title="Umrah Packages 2025 - Economy & Luxury Umrah from Pakistan"
        description="Book Umrah packages from Islamabad, Lahore, Faisalabad & Multan. Economy & 5-Star luxury Umrah with hotels near Haram. Walking distance Makkah & Madinah hotels. Pak99 Travel & Tours — trusted Umrah operator."
        keywords="umrah packages pakistan, umrah packages islamabad, umrah packages lahore, umrah packages faisalabad, cheap umrah packages, luxury umrah packages, 5 star umrah packages, umrah 2025, umrah booking pakistan, umrah travel agent islamabad, walking distance haram hotel, makkah hotel near haram, madinah hotel booking, economy umrah packages, best umrah packages pakistan"
        canonicalPath="/umrah"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer transition-colors">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Umrah Packages</span>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-[#0b2f64] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-white text-amber-900 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" /> Sacred Pilgrimage Excellence
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Premium Umrah Packages
            </h1>
            <p className="text-amber-100 text-sm leading-relaxed font-medium">
              Perform your holy pilgrimage with complete peace of mind. Guaranteed Saudi Visa approval, 
              comfortable hotels in Makkah & Madinah, and confirmed flight bookings.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 space-y-6">
          {/* City Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#0b2f64] uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ff5500]" /> Select Departure City
            </h3>
            <div className="flex flex-wrap gap-3">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#0b2f64] text-white shadow-lg shadow-blue-900/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0b2f64]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Tier Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#0b2f64] uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-[#ff5500]" /> Select Package Type
            </h3>
            <div className="flex flex-wrap gap-3">
              {TIERS.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer border-2 ${
                    selectedTier === tier
                      ? 'border-[#ff5500] bg-orange-50 text-[#ff5500]'
                      : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tier === 'Star' ? <Sparkles className="w-4 h-4" /> : null}
                  <span className="whitespace-nowrap">{tier} Package</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-[#0b2f64]">
              {selectedTier} Packages from {selectedCity}
            </h2>
            <span className="text-sm font-bold text-slate-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-200 w-fit whitespace-nowrap">
              {filteredPackages.length} Packages Found
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#ff5500] animate-spin" />
            </div>
          ) : filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg._id || pkg.packageId} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden group">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#0b2f64] to-[#1a4a8c] p-5 text-white flex justify-between items-start relative gap-3">
                    <div className="space-y-1 relative z-10 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-[#ff5500] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm whitespace-nowrap">
                          {pkg.packageId}
                        </span>
                        {pkg.seatsAvailable && (
                          <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm whitespace-nowrap">
                            <Users className="w-3 h-3" /> {pkg.seatsAvailable} Seats Left
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-2">
                        <CalendarDays className="w-5 h-5 text-amber-400" />
                        {pkg.departureDate}
                      </h3>
                      <p className="text-blue-200 text-sm font-medium flex items-center gap-1">
                        {pkg.durationText}
                      </p>
                    </div>
                    {/* Airline Badge */}
                    <div className="bg-white text-[#0b2f64] p-2 rounded-xl text-center min-w-[80px] shadow-lg relative z-10 shrink-0">
                      {pkg.airlineLogo ? (
                        <img src={pkg.airlineLogo} alt={pkg.airline} className="h-6 w-auto mx-auto mb-1 object-contain" />
                      ) : (
                        <PlaneTakeoff className="w-6 h-6 mx-auto mb-1 text-[#ff5500]" />
                      )}
                      <div className="text-[10px] font-extrabold uppercase">{pkg.airline}</div>
                      <div className="text-[9px] font-bold text-slate-500 border-t border-slate-200 mt-1 pt-1">{pkg.flightRoute.split(' ')[0]}</div>
                    </div>
                  </div>

                  {/* Hotels */}
                  <div className="p-6 space-y-4 bg-slate-50 border-b border-slate-200">
                    <h4 className="text-xs font-extrabold text-[#0b2f64] uppercase tracking-wider flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-slate-400" /> Included Hotels
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <img src={pkg.makkahHotelIcon || "https://cdn-icons-png.flaticon.com/512/2983/2983713.png"} alt="Kaaba" className="w-6 h-6 opacity-80 object-contain" />
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold text-[#ff5500] uppercase tracking-wide">Makkah Hotel</div>
                          <div className="text-sm font-bold text-[#0b2f64]">{pkg.hotels.makkah}</div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <img src={pkg.madinahHotelIcon || "https://cdn-icons-png.flaticon.com/512/2983/2983756.png"} alt="Masjid Nabawi" className="w-6 h-6 opacity-80 object-contain" />
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold text-green-600 uppercase tracking-wide">Madinah Hotel</div>
                          <div className="text-sm font-bold text-[#0b2f64]">{pkg.hotels.madinah}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className="p-6">
                    <h4 className="text-xs font-extrabold text-[#0b2f64] uppercase tracking-wider mb-3">
                      Package Pricing (PKR)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Sharing</div>
                        <div className="text-sm font-extrabold text-[#0b2f64] mt-1">{pkg.pricing?.sharing || '-'}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Quad</div>
                        <div className="text-sm font-extrabold text-[#0b2f64] mt-1">{pkg.pricing?.quad || '-'}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Triple</div>
                        <div className="text-sm font-extrabold text-[#0b2f64] mt-1">{pkg.pricing?.triple || '-'}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Double</div>
                        <div className="text-sm font-extrabold text-[#0b2f64] mt-1">{pkg.pricing?.double || '-'}</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => onOpenBooking(`${pkg.packageId} - ${pkg.city} ${pkg.tier}`)}
                        className="w-full bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm"
                      >
                        Book This Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <Info className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0b2f64]">No Packages Available</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">
                Currently, we don't have {selectedTier} packages available departing from {selectedCity}. 
                Please select <strong className="text-[#0b2f64]">Faisalabad</strong> to view available packages or check back later!
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSelectedCity('Faisalabad')}
                  className="bg-[#0b2f64] hover:bg-blue-900 text-white font-extrabold px-6 py-2.5 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  View Faisalabad Packages
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

