import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { studyAPI } from '../services/api';
import type { ApiStudyProgram } from '../services/api';
import { SEO } from '../components/SEO';

interface PageProps {
  slug?: string;
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const DynamicStudyPage: React.FC<PageProps> = ({ slug: propSlug, onOpenBooking, onNavigateHome }) => {
  const { slug: urlSlug } = useParams<{ slug: string }>();
  const activeSlug = propSlug || urlSlug;
  
  const [data, setData] = useState<ApiStudyProgram | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeSlug) return;
      try {
        setLoading(true);
        // Find by slug
        const allStudy = await studyAPI.getAll();
        const found = allStudy.find(s => s.slug === activeSlug);
        setData(found || null);
      } catch (err) {
        console.error('Failed to fetch study data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#ff5500] animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-xl font-bold">Page Not Found</p>
        <button onClick={onNavigateHome} className="mt-4 text-[#ff5500] font-bold hover:underline">
          Return Home
        </button>
      </div>
    );
  }

  // Helper to map string icon names to Lucide components
  const renderIcon = (iconName?: string) => {
    if (!iconName) return <CheckCircle className="w-8 h-8 text-[#ff5500] shrink-0" />;
    
    switch (iconName.toLowerCase()) {
      case 'graduationcap': return <GraduationCap className="w-8 h-8 text-[#ff5500] shrink-0" />;
      case 'award': return <Award className="w-8 h-8 text-[#ff5500] shrink-0" />;
      case 'filetext': return <FileText className="w-8 h-8 text-[#ff5500] shrink-0" />;
      default: return <CheckCircle className="w-8 h-8 text-[#ff5500] shrink-0" />;
    }
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <SEO
        title={data.title || 'Study Abroad Programs'}
        description={data.description || `Study abroad programs and university admissions assistance from Pakistan. Expert visa consultancy and scholarship guidance by Pak99 Travel & Tours Islamabad.`}
        keywords={`study abroad pakistan, ${data.slug || ''}, university admission pakistan, student visa, study in ${(data.title || '').replace('Study in ', '') || 'abroad'}, scholarship pakistan, education consultancy islamabad, overseas education pakistan`}
        canonicalPath={`/${data.slug || activeSlug}`}
      />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">{data.badgeText || 'Study'}</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            {data.badgeText && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
                {data.badgeText}
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight break-words">
              {data.title}
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium break-words">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Highlights / Cards */}
      {data.items && data.items.length > 0 && (
        <div className={`grid grid-cols-1 ${data.pageType === 'scholarship' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
          {data.items.map((item, idx) => (
            <div key={idx} className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex ${data.pageType === 'scholarship' ? 'flex-col sm:flex-row gap-4 items-start' : 'flex-col space-y-3'}`}>
              
              {data.pageType === 'destination' && renderIcon(item.icon)}
              
              <div className="space-y-2 flex-1">
                {data.pageType === 'scholarship' ? (
                  <>
                    <h3 className="text-lg font-extrabold text-[#0b2f64] break-words">{item.title}</h3>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                      {item.funding && <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{item.funding}</span>}
                      {item.target && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.target}</span>}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2 break-words">
                      {item.description}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-extrabold text-[#0b2f64] break-words">{item.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed break-words">
                      {item.description}
                    </p>
                  </>
                )}

                {item.buttonText && (
                  <button onClick={() => onOpenBooking(item.buttonText)} className="mt-2 text-xs font-bold text-[#ff5500] hover:underline cursor-pointer">
                    {item.buttonText} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      {data.ctaTitle && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4">
          <h3 className="text-2xl font-extrabold text-[#0b2f64] break-words">{data.ctaTitle}</h3>
          {data.ctaDescription && (
            <p className="text-xs text-slate-600 font-semibold max-w-xl mx-auto break-words">
              {data.ctaDescription}
            </p>
          )}
          <button
            onClick={() => onOpenBooking(data.ctaButtonText || 'Book Free Assessment')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white font-extrabold rounded-xl shadow-md text-xs cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            {data.ctaButtonText || 'Book Free Assessment'}
          </button>
        </div>
      )}
    </div>
  );
};
