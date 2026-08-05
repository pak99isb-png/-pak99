import { type VisaRequirement } from '../types';
import React from 'react';
import { ArrowRight, CheckCircle2, PlayCircle, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { visasAPI } from '../services/api';
import { Loader2 } from 'lucide-react';

interface VisaPageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
  onSelectCountry: (country: VisaRequirement) => void;
}

export const VisaPage: React.FC<VisaPageProps> = ({ onOpenBooking, onSelectCountry }) => {
  const [countries, setCountries] = React.useState<VisaRequirement[]>([]);
  const [settings, setSettings] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/settings` : (import.meta.env.PROD ? '/api/settings' : 'http://localhost:5000/api/settings');
    Promise.all([
      visasAPI.getAll(),
      fetch(fetchUrl).then(res => res.json()).catch(() => ({}))
    ])
      .then(([countriesData, settingsData]) => {
        setCountries(countriesData as any);
        setSettings(settingsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-[#0b2f64] text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-12">
          <div className="flex-1 space-y-8 w-full text-left flex flex-col justify-center">
            <div className="inline-flex px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-blue-100 text-sm font-bold tracking-wide w-max">
              🌟 Premium Visa Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Get Your <span className="text-amber-400">Done Base</span> Visa
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-medium max-w-lg leading-relaxed">
              Experience a hassle-free immigration process. <br/> <strong className="text-white">Pay Only When your Visa is Accepted.</strong>
            </p>
            
            <ul className="space-y-4 pt-2">
              {['Expert Legal Support', 'Meeting Your Unique Needs', 'Tailored Immigration Solutions'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 font-medium text-lg">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-6 inline-block">
              <button
                onClick={() => onOpenBooking('Visa Consultation')}
                className="bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Decorative Right Image */}
          <div className="hidden md:block flex-1 relative self-center">
             {/* Main Image */}
             <div className="relative h-[500px] w-full rounded-[2.5rem] shadow-2xl border-4 border-white/10 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Visa and Passport" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f64]/80 via-transparent to-transparent"></div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex items-center gap-4 animate-bounce hover:animate-none">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Success Rate</p>
                  <p className="text-2xl font-extrabold text-[#0b2f64]">99%</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Countries Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2f64]">
            Make Your Choice for the <br />
            <span className="text-slate-500">Preferred Nation</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-10">
              <Loader2 className="w-8 h-8 text-[#ff5500] animate-spin" />
            </div>
          ) : (
            countries.map((country, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCountry(country)}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 hover:shadow-md hover:border-[#ff5500]/50 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-slate-50 shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src={country.customUrl || `https://flagcdn.com/${country.code}.svg`} 
                    alt={`${country.name} flag`}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#ff5500] text-left leading-tight">
                  {country.name}
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      {/* About Us & Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 ${settings?.visaVideoLink ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-3xl font-extrabold text-[#0b2f64]">About Us</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-sm">
              We have been operating since 2013 and specialized in Tourist visas/Visit visas of more than 50 countries. 
              We are specialized in this industry and have a highly experienced team to facilitate our customers with 
              24/7 customer support. We believe in excellence and providing the latest, Authentic, Reliable information 
              in visa processing. We put our 100% efforts in processing visas and make sure that customers have maximum 
              chances to get visa approval.
            </p>
          </div>
          
          {settings?.visaVideoLink && (
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer bg-slate-900 border-4 border-white" onClick={() => window.open(settings.visaVideoLink, '_blank')}>
              <img 
                src={settings.visaVideoThumbnail || "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"} 
                alt="Visa Process Video" 
                className="w-full h-64 md:h-full min-h-[16rem] object-cover opacity-80 group-hover:opacity-60 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white group-hover:text-[#ff5500] group-hover:scale-110 transition-all drop-shadow-lg" />
                <p className="text-white font-extrabold mt-3 drop-shadow-md tracking-wider uppercase text-sm">Watch Visa Process</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="bg-[#355E9F] mt-12 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 rounded-3xl p-6 lg:p-12 border border-white/10">
            {/* Form */}
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-white text-center md:text-left">Send Us Message</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onOpenBooking('Visa Inquiry'); }}>
                <div>
                  <label className="text-xs font-bold text-blue-100 mb-1 block">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Your Name" className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] border-none" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-100 mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input type="email" placeholder="Your Email" className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] border-none" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-100 mb-1 block">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input type="tel" placeholder="Your Mobile Number" className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] border-none" required />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-100 mb-1 block">Select your desired country</label>
                  <select className="w-full bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] border-none text-slate-700">
                    <option>Select Country</option>
                    {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-100 mb-1 block">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea rows={4} placeholder="Your Message" className="w-full bg-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] border-none resize-none" required></textarea>
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold py-3 rounded-lg shadow-md transition-colors uppercase tracking-wider text-sm cursor-pointer">
                  Send
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="h-[400px] md:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/20 relative">
              <iframe 
                src="https://maps.google.com/maps?q=College%20Road,%20Chichawatni,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

