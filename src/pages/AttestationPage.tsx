import React from 'react';
import { FileCheck, CheckCircle } from 'lucide-react';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const AttestationPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  const attestationServices = [
    {
      title: 'MOFA Attestation',
      desc: 'Ministry of Foreign Affairs attestation for educational degrees, marriage certificates, and police character certificates.'
    },
    {
      title: 'HEC Degree Verification',
      desc: 'Higher Education Commission verification for Bachelor’s, Master’s, and PhD transcripts & degree parchments.'
    },
    {
      title: 'IBCC Equivalence & Stamp',
      desc: 'Inter Board Coordination Commission equivalence for Matriculation & Intermediate certificates.'
    },
    {
      title: 'Foreign Embassy Attestation',
      desc: 'Saudi, UAE, Qatar, German, Italian, Spanish, and European Embassy stamp clearance.'
    },
    {
      title: 'Certified Sworn Translation',
      desc: 'Official certified translations in German, French, Italian, Arabic, Spanish, and Turkish.'
    },
    {
      title: 'Fast-Track 24-Hour Processing',
      desc: 'Urgent door-to-door document pick-up, stamp processing, and courier return across Pakistan.'
    }
  ];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Document Translation & Attestation</span>
        </div>

        <div className="bg-gradient-to-r from-[#0b2f64] via-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <FileCheck className="w-4 h-4 text-amber-200" /> Government & Embassy Stamp Services
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Document Translation & MOFA/HEC Attestation
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Avoid long queues and embassy rejections. Pak99 manages complete HEC degree verification, MOFA stamps, IBCC certificates, certified translations, and foreign embassy legalizations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attestationServices.map((srv, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#ff5500]">
                <CheckCircle className="w-5 h-5" />
                <h3 className="text-base font-extrabold text-[#0b2f64]">{srv.title}</h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{srv.desc}</p>
            </div>

            <button
              onClick={() => onOpenBooking(`Attestation Inquiry: ${srv.title}`)}
              className="w-full py-2.5 bg-slate-100 hover:bg-[#ff5500] text-[#0b2f64] hover:text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer text-center"
            >
              Request Attestation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
