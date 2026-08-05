import React from 'react';
import { GraduationCap, Award, FileText } from 'lucide-react';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const StudyAustraliaPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Study in Australia</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              🇦🇺 Study in Australia
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Study at Top Australian Universities & PR Pathways
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Explore Subclass 500 Student Visa options with 3-5 years Post-Study Work Rights and high PR prospects in Sydney, Melbourne, Brisbane & Perth.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <GraduationCap className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">4-5 Year PSW Rights</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Extended work rights for regional campus graduates and high-demand tech & healthcare fields.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <Award className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">Permanent Residency (PR)</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Gain extra points for Australian qualifications under Subclass 189/190/491 visas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <FileText className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">GTE & Visa Assistance</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Expert assistance for Genuine Temporary Entrant (GTE) statement drafting and COE issuance.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-[#0b2f64]">Book Free Australian Study Counseling</h3>
        <button
          onClick={() => onOpenBooking('Study in Australia Assessment')}
          className="px-8 py-3.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white font-extrabold rounded-xl shadow-md text-xs cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-2"
        >
          <GraduationCap className="w-4 h-4" /> Start Australian Application
        </button>
      </div>
    </div>
  );
};
