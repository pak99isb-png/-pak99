import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { SEO } from '../components/SEO';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<PageProps> = ({ onNavigateHome }) => {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO
        title="Contact Pak99 Travel & Tours - Islamabad Travel Agency"
        description="Contact Pak99 Travel & Tours for tour bookings, Umrah packages, visa services & travel inquiries. Visit us at Office No. 03 Nawaz Arcade, National Police Foundation, PWD Islamabad. Call 0310-8032999 or 051-2757282. WhatsApp available."
        keywords="contact pak99 travel, travel agency islamabad contact, pak99 phone number, pak99 address, travel agent islamabad contact, tour booking islamabad, pak99 office location, pak99 whatsapp, travel agency near me islamabad, travel agency pwd islamabad, travel company contact pakistan"
        canonicalPath="/contact"
      />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Contact Us</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              📞 24/7 Travel Support
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Contact Pak99 Travel & Tours
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              We are here to assist you with customized tour packages, student visas, Umrah services, and more. Get in touch with our support desk for instant responses.
            </p>
          </div>
        </div>
      </div>

      <ContactSection />

      {/* Google Map Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <h2 className="text-2xl font-extrabold text-[#0b2f64]">Our Location</h2>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Visit our office in Rawalpindi for a cup of tea and a chat about your next adventure.
          </p>
        </div>
        <div className="w-full h-[400px]">
          <iframe
            src="https://maps.google.com/maps?q=PAK+99+TRAVEL+AND+CONSULTANT+Police+Foundation+Rawalpindi&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
