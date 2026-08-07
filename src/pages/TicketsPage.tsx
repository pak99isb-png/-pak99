import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ticketGroupsAPI } from '../services/api';
import type { ApiTicketGroup } from '../services/api';
import { Loader2 } from 'lucide-react';

interface PageProps {
  onNavigateHome: () => void;
}

export const TicketsPage: React.FC<PageProps> = ({ onNavigateHome }) => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<ApiTicketGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ticketGroupsAPI.getAll()
      .then(data => setGroups(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Flight Tickets - Group & Individual Air Tickets Pakistan"
        description="Book cheap group and individual flight tickets from Pakistan to UAE, Saudi Arabia, UK, Bahrain, Muscat & more. Best airline deals with Pak99 Travel & Tours Islamabad."
        keywords="flight tickets pakistan, cheap flights from pakistan, group tickets, air tickets islamabad, flights to dubai, flights to saudi arabia, flights to uk, airline tickets pakistan, pak99 flights, best flight deals pakistan"
        canonicalPath="/tickets"
      />
      
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-8">
          <button onClick={onNavigateHome} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#0b2f64] uppercase font-extrabold">Tickets</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#0b2f64] animate-spin" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">
            No ticket groups available at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {groups.map((group, idx) => (
            <div key={idx} className="bg-white flex flex-col shadow-lg border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Title Section */}
              <div className="py-4 px-2 text-center bg-white border-b border-slate-100">
                <h2 className="text-sm sm:text-base font-semibold text-slate-700">{group.title}</h2>
              </div>
              
              {/* Button Section */}
              <button 
                onClick={() => navigate(`/tickets/${group.buttonText.toLowerCase().replace(/\s+/g, '-')}`)}
                className="w-full py-4 bg-[#0b2f64] hover:bg-[#ff5500] text-white text-sm sm:text-base font-bold transition-colors cursor-pointer text-center"
              >
                {group.buttonText}
              </button>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
