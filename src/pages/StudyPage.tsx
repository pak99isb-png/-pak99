import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Loader2 } from 'lucide-react';
import { studyAPI } from '../services/api';
import type { ApiStudyProgram } from '../services/api';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';

interface StudyPageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const StudyPage: React.FC<StudyPageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState<ApiStudyProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const allStudy = await studyAPI.getAll();
        const onlyDestinations = allStudy.filter(s => s.pageType === 'destination' || (!s.pageType && s.slug !== 'scholarships' && s.slug !== 'attestation'));
        setDestinations(onlyDestinations);
      } catch (error) {
        console.error('Failed to fetch study destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Study Abroad Programs - Pak99 Travel & Tours"
        description="Explore study abroad opportunities with Pak99 Travel & Tours. Get admissions and student visas for top destinations."
        keywords="study abroad, student visa, study in uk, study in australia, study in canada, study in germany, overseas education pakistan"
        canonicalPath="/study"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/study-hero.jpg')" }}
        ></div>
        
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f64]/95 via-[#0b2f64]/80 to-slate-900/70"></div>
        
        {/* Cube Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 text-center space-y-6">
          <div className="inline-flex px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-indigo-100 text-sm font-bold tracking-wide mx-auto items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-300" />
            Global Education Excellence
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white max-w-4xl mx-auto">
            Shape Your Future <br className="hidden md:block" />
            <span className="text-indigo-400">Study Abroad</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover top-ranked universities and secure your student visa for the best educational destinations worldwide. Let us guide your academic journey.
          </p>
          <div className="pt-6">
            <button
              onClick={() => onOpenBooking('Study Consultation')}
              className="bg-[#ff5500] hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-3 cursor-pointer group"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b2f64]">
            Choose Your <span className="text-slate-500">Study Destination</span>
          </h2>
          <p className="text-slate-600 font-medium mt-4 max-w-2xl mx-auto">
            Explore world-class educational opportunities in top countries renowned for their academic excellence and vibrant student life.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#ff5500] animate-spin" />
          </div>
        ) : destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <motion.div
                key={dest._id || dest.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => navigate(`/study/${dest.slug}`)}
                className="relative w-full h-[450px] sm:h-[500px] rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <img
                  src={dest.cardIcon || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2f64]/95 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span className="uppercase tracking-wider">{dest.badgeText || 'Study Abroad'}</span>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-white leading-tight mb-2 line-clamp-2">
                      {dest.title}
                    </h3>
                    
                    <p className="text-slate-300 text-sm font-medium line-clamp-2 mb-4 opacity-90 transition-opacity duration-300">
                      {dest.description}
                    </p>

                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-xs font-extrabold text-white uppercase tracking-wide">
                        View Details
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#ff5500] transition-colors">
                        <ArrowRight className="w-4 h-4 text-[#0b2f64] group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600">No destinations available</h3>
            <p className="text-slate-500 text-sm mt-2">Check back later for updated study programs.</p>
          </div>
        )}
      </section>
    </div>
  );
};
