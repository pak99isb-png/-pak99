import React from 'react';
import { GraduationCap, Award, FileText } from 'lucide-react';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const StudyCanadaPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Study in Canada</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              🇨🇦 Study in Canada
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Study at DLI Colleges & Public Canadian Universities
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Obtain your Canadian Study Permit with 3-Year Post-Graduation Work Permit (PGWP) eligibility and direct pathways to Express Entry & Provincial Nominee Programs (PNP).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <GraduationCap className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">3-Year PGWP Permit</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Graduating from eligible Canadian DLI institutions grants up to 3 years of open work permit.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <Award className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">PR Express Entry Points</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Earn high CRS score points for Canadian educational credentials and skilled work experience.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <FileText className="w-8 h-8 text-[#ff5500]" />
          <h3 className="text-base font-extrabold text-[#0b2f64]">SDS Fast-Track Visa</h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Fast student visa approval via Student Direct Stream (SDS) for eligible IELTS test takers.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-[#0b2f64]">Apply for Canadian Student Visa</h3>
        <button
          onClick={() => onOpenBooking('Study in Canada Free Assessment')}
          className="px-8 py-3.5 bg-gradient-to-r from-[#ff5500] to-amber-500 text-white font-extrabold rounded-xl shadow-md text-xs cursor-pointer hover:scale-105 transition-all inline-flex items-center gap-2"
        >
          <GraduationCap className="w-4 h-4" /> Start Canadian Application
        </button>
      </div>
    </div>
  );
};
