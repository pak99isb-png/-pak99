import React, { useState } from 'react';
import { MessageSquare, Phone, MapPin, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Northern Pakistan Tours');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = `*Pak99 Travel Inquiry*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📌 *Service:* ${service}\n💬 *Message:* ${message || 'I am interested in your services.'}`;
    const whatsappUrl = `https://wa.me/923315290155?text=${encodeURIComponent(formattedMsg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Col: Contact Info & WhatsApp Prompt */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0b2f64] via-blue-900 to-slate-900 text-white p-8 sm:p-12 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <Sparkles className="w-3.5 h-3.5" /> Instant WhatsApp Response
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Get in Touch <span className="text-[#ff5500]">With Pak99</span>
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
              Have questions about tour itineraries, Umrah visas, or student admissions? Contact our travel desk on WhatsApp for 24/7 assistance.
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-3 bg-blue-950/60 p-3 rounded-2xl border border-blue-800">
              <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-extrabold">WhatsApp Support Desk</div>
                <a href="https://wa.me/923315290155" target="_blank" rel="noopener noreferrer" className="text-white font-extrabold text-sm hover:text-orange-400">
                  0310-8032999 / 051-2757282
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-950/60 p-3 rounded-2xl border border-blue-800">
              <Phone className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-extrabold">Phone Call Line</div>
                <div className="text-white font-extrabold text-sm">
                  <a href="tel:+923108032999" className="hover:text-orange-400">0310-8032999</a> / <a href="tel:+92512757282" className="hover:text-orange-400">051-2757282</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-950/60 p-3 rounded-2xl border border-blue-800">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-extrabold">Main Office</div>
                <div className="text-white font-bold text-xs">Office No. 03 Nawaz Arcade National Police Foundation, PWD Islamabad</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-800 text-[11px] text-slate-300 font-medium">
            ⚡ Typical WhatsApp response time: <strong>Under 5 Minutes</strong>
          </div>
        </div>

        {/* Right Col: Instant WhatsApp Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-[#0b2f64]">Send Instant WhatsApp Inquiry</h3>
            <p className="text-xs text-slate-600 font-medium">
              Fill in your trip requirements and submit to chat directly with our representative on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:border-[#ff5500] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0310-8032999 / 051-2757282"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:border-[#ff5500] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Service *</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:border-[#ff5500] outline-none"
              >
                <option>Northern Pakistan Tours (Hunza / Skardu / Swat)</option>
                <option>International Holiday Package (Dubai / Turkey)</option>
                <option>Executive Umrah Package</option>
                <option>Study Abroad & Student Visa</option>
                <option>Document Translation & Attestation</option>
                <option>Hotel Reservations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message / Requirements</label>
              <textarea
                rows={3}
                placeholder="Tell us about travel dates, number of persons, or specific preferences..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:border-[#ff5500] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold rounded-xl shadow-lg shadow-green-500/25 text-xs flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Submit & Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
