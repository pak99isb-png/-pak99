import React from 'react';
import { ShieldCheck, Award, Headset, Car, HeartHandshake, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-[#ff5500]" />,
      title: 'Certified Mountain Guides',
      description: 'Experienced local guides with deep knowledge of Hunza, Skardu, Swat, and Northern terrain.'
    },
    {
      icon: <Car className="w-8 h-8 text-[#0b2f64]" />,
      title: 'Luxury Prado & Coaster Fleet',
      description: 'Air-conditioned 4x4 Land Cruisers, Prados, and executive Grand Cabins for ultimate mountain comfort.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#ff5500]" />,
      title: '100% Guaranteed & Verified',
      description: 'Registered tour operator with transparent pricing, zero hidden costs, and safety first protocol.'
    },
    {
      icon: <Headset className="w-8 h-8 text-amber-500" />,
      title: '24/7 Dedicated Support',
      description: 'On-call tour coordinators assisting you before, during, and after your trip.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#ff5500]" />,
      title: 'Tailor-Made Custom Packages',
      description: 'We personalize itineraries for families, honeymoon couples, groups, and corporate tours.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#0b2f64]" />,
      title: 'VIP Umrah & International',
      description: 'Haram walking-distance hotels, VIP transport, and complete Ziyarat guidance in Saudi Arabia.'
    }
  ];

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/10 text-[#ff5500] border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Why Pak99 Travel & Tours
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">
            Crafting Unforgettable <span className="text-gradient">Travel Experiences</span>
          </h2>
          <p className="text-sm text-slate-600 font-semibold">
            We are dedicated to providing seamless, luxurious, and affordable journeys across Pakistan and global destinations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md hover:border-[#ff5500]/60 hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#0b2f64] group-hover:text-[#ff5500] transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
