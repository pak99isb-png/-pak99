import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { visasAPI } from '../services/api';
import { SEO } from '../components/SEO';
import { CheckCircle2, AlertCircle, FileText, Scale, Phone, Loader2 } from 'lucide-react';

interface VisaDetailsPageProps {
  onOpenBooking: (title?: string) => void;
}


const STANDARD_TERMS = [
  "If You Select Our Done Base Package Then 100% Charges Are Refundable In Case Of Visa Rejection.",
  "If You Select Our Normal Base Package 100% Charges Are Non Refundable In Case of Visa Rejection",
  "All Rates Can Be Change Any Time Without Prior Notice.",
  "All Payment Will Be Required in Advance At The Time of Booking Case Otherwise Process Will Not Start.",
  "All Documents For Processing E-Visa Must In Good Scanning Form, In Case of Any Tempered or Fake Document Then Applicant is Responsible.",
  "We Process Every Case Immediatelly After Receiving Documents and Payment But Somtimes Embassy Take Longer Time Than Usual, In That Case We Will Not Responsible.",
  "We Are Responsible To Process Only Visa Not AnyThing Else If Our Visa Is Fake or Wrong Only Then We Are Responsible.",
  "We Process Only Visa And Will Not Be Resposible For Customer’s Travelling Matters Like Boarding Pass, Ok To Board, Airport or Immigration Clearance, Transit Visas Enroot To Their Destinations or Any Other Immigration Requirement.",
  "We Are Not Responsible For Any Loss Occures Due To Delay in Visa Like, Prepaid Tickets, Hotel Booking or Any Other Thing."
];

export const VisaDetailsPage: React.FC<VisaDetailsPageProps> = ({ 
  onOpenBooking,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    visasAPI.getAll()
      .then((data) => setCountries(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const country = countries.find(c => c.code === id || c.id === id || c._id === id);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-10 h-10 text-[#ff5500] animate-spin" /></div>;
  }

  if (!country) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50"><h2 className="text-2xl font-bold text-[#0b2f64]">Visa Country not found</h2><Link to="/visa" className="mt-4 text-[#ff5500] hover:underline">Return to Visas</Link></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      <SEO 
        title={`${country.name} Visa Requirements`} 
        description={`Get complete visa processing guidelines and requirements for ${country.name} through Pak99 Traveling & Tours.`}
        keywords={`${country.name} visa, visa requirements, travel to ${country.name}`}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0b2f64] to-[#1a4a8c] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full p-2 mb-6 shadow-xl border-4 border-white/20">
            <img 
              src={country.customUrl || (country.code ? `https://flagcdn.com/${country.code}.svg` : '/default-flag.png')} 
              alt={`${country.name} flag`} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {country.name} <span className="text-[#ff5500]">Visa</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-medium">
            Complete visa processing guidelines and requirements for {country.name}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Sidebar - Quick Navigation */}
          <div className="lg:col-span-4 space-y-6">
            {/* Country Switcher */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg shadow-blue-900/5">
              <h3 className="text-lg font-extrabold text-[#0b2f64] mb-4 flex items-center gap-2">
                <GlobeIcon /> Other Destinations
              </h3>
              <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {countries.map((c) => (
                  <button
                    key={c.name || c.id}
                    onClick={() => {
                      navigate(`/visas/${c.code || c.id || c._id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-3 w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      c.name === country.name 
                        ? 'border-[#ff5500] bg-orange-50' 
                        : 'border-slate-100 hover:border-[#ff5500]/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <img 
                        src={c.customUrl || (c.code ? `https://flagcdn.com/${c.code}.svg` : '/default-flag.png')} 
                        alt={`${c.name} flag`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className={`text-sm font-bold ${c.name === country.name ? 'text-[#ff5500]' : 'text-slate-700'}`}>
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Box */}
            <div className="bg-gradient-to-br from-[#0b2f64] to-[#1a4a8c] rounded-3xl p-8 border-4 border-white shadow-xl text-center text-white space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#ff5500] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 mb-2">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-extrabold leading-tight">
                Assured Approval <br /> Guaranteed
              </h3>
              <p className="text-xs text-blue-200 font-medium">
                Let our experts handle the hassle of visa processing for you.
              </p>
              <button 
                onClick={() => onOpenBooking(`${country.name} Visa`)}
                className="mt-4 w-full bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" /> Get In Touch
              </button>
            </div>
          </div>

          {/* Right Content - Requirements */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-4">
              <h2 className="text-3xl font-extrabold text-[#0b2f64]">{country.name}</h2>
              <span className="bg-[#ff5500]/10 text-[#ff5500] text-xs font-extrabold px-3 py-1 rounded-full border border-[#ff5500]/20">
                Visa Requirements
              </span>
            </div>

            {country.note && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 text-blue-900">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{country.note}</p>
              </div>
            )}

            {/* Documents Sections */}
            <div className="space-y-10">
              {country.normalDocs && country.normalDocs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  <h3 className="text-lg font-extrabold text-[#0b2f64] flex items-center gap-2 mb-6">
                    <FileText className="text-[#ff5500] w-5 h-5" />
                    Documents Required For Normal Processing
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {country.normalDocs.map((doc: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#0b2f64] flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-slate-700 font-semibold pt-1">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {country.doneBaseDocs && country.doneBaseDocs.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  <h3 className="text-lg font-extrabold text-[#0b2f64] flex items-center gap-2 mb-6">
                    <CheckCircle2 className="text-[#25D366] w-5 h-5" />
                    Documents Required For Done Base Processing
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {country.doneBaseDocs.map((doc: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-slate-700 font-semibold pt-1">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(!country.normalDocs || country.normalDocs.length === 0) && (!country.doneBaseDocs || country.doneBaseDocs.length === 0) && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center">
                  <p className="text-slate-500 font-semibold">Please contact us for specific requirements for {country.name}.</p>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mt-12">
              <h3 className="text-lg font-extrabold text-[#0b2f64] flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Scale className="text-slate-400 w-5 h-5" />
                Terms & Conditions
              </h3>
              <div className="space-y-4">
                {STANDARD_TERMS.map((term: string, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5500] mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{term}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff5500]">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);
