import React from 'react';
import { Award } from 'lucide-react';

interface PageProps {
  onOpenBooking: (title?: string) => void;
  onNavigateHome: () => void;
}

export const ScholarshipsPage: React.FC<PageProps> = ({ onOpenBooking, onNavigateHome }) => {
  const scholarshipList = [
    {
      title: 'Chevening UK Scholarship',
      funding: '100% Fully Funded',
      coverage: 'Full tuition fees, monthly living stipend, return economy flights & visa costs.',
      target: 'UK Master’s Degree Programs'
    },
    {
      title: 'DAAD Germany Scholarship',
      funding: '100% Fully Funded',
      coverage: 'Monthly stipend of €934 - €1,200, travel allowance, health insurance.',
      target: 'German Master’s & PhD Programs'
    },
    {
      title: 'Australia Awards Scholarship',
      funding: '100% Fully Funded',
      coverage: 'Full tuition, return air travel, establishment allowance, contribution to living expenses.',
      target: 'Australian Master’s Programs'
    },
    {
      title: 'University Merit Fee Discounts',
      funding: 'Partial (20% to 50% Off)',
      coverage: 'Direct reduction in annual university tuition fees based on academic excellence.',
      target: 'UK, Australia & Canada Universities'
    }
  ];

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Scholarships & Grants</span>
        </div>

        <div className="bg-gradient-to-r from-amber-600 via-[#0b2f64] to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#ff5500] text-white">
              <Award className="w-4 h-4" /> Global Financial Aid
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Fully Funded Scholarships & University Fee Grants
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed font-medium">
              Study abroad without financial burden. Pak99 helps Pakistani students secure 100% fully funded government scholarships and merit-based university fee waivers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarshipList.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-extrabold rounded-full">
                  {item.funding}
                </span>
                <span className="text-xs text-slate-500 font-bold">{item.target}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#0b2f64]">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.coverage}</p>
            </div>

            <button
              onClick={() => onOpenBooking(`Scholarship Inquiry: ${item.title}`)}
              className="w-full py-2.5 bg-slate-100 hover:bg-[#ff5500] text-[#0b2f64] hover:text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer text-center"
            >
              Apply for Scholarship
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
