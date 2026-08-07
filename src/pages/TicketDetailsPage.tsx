import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ticketGroupsAPI } from '../services/api';
import type { ApiTicketGroup } from '../services/api';

interface PageProps {
  onOpenBooking: (title?: string) => void;
}

export const TicketDetailsPage: React.FC<PageProps> = ({ onOpenBooking }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticketGroup, setTicketGroup] = useState<ApiTicketGroup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    ticketGroupsAPI.getAll()
      .then(data => {
        // Find the specific group by slugifying the button text
        const group = data.find(g => g.buttonText.toLowerCase().replace(/\s+/g, '-') === id);
        if (group) setTicketGroup(group);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Format the ID for display (e.g. uae-group -> UAE GROUP)
  const displayTitle = ticketGroup?.title || (id ? id.replace(/-/g, ' ').toUpperCase() : 'FLIGHT DETAILS');
  const routeDisplay = ticketGroup?.routeDisplay || 'N/A';
  const airlineName = ticketGroup?.airlineName || 'AIRLINE';
  const airlineLogo = ticketGroup?.airlineLogo || '';
  const flights = ticketGroup?.flights || [];

  const handleCopy = (flight: any) => {
    const text = `Flight Route: ${routeDisplay}\nDate: ${flight.date}\nTime: ${flight.time}\nBag: ${flight.bag}\nMeal: ${flight.meal ? 'YES' : 'NO'}\nFare: ${flight.fare} PKR/-`;
    navigator.clipboard.writeText(text);
    alert('Flight details copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0b2f64] animate-spin" />
      </div>
    );
  }

  if (!ticketGroup) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-2 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-700">Flight Details Not Found</h2>
        <button onClick={() => navigate('/tickets')} className="text-[#ff5500] hover:underline font-bold">Return to Tickets</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-2 sm:px-6 lg:px-8 animate-fade-in">
      <SEO title={`${displayTitle} Tickets`} description={`View available flight tickets and group details for ${displayTitle}.`} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-[#ff5500] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/tickets')} className="hover:text-[#ff5500] cursor-pointer">Tickets</button>
          <span>/</span>
          <span className="text-[#0b2f64] font-extrabold">{displayTitle}</span>
        </div>

        <div className="bg-white shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="py-6 px-8 flex flex-col md:flex-row items-center justify-between border-b-4 border-[#0b2f64] bg-white gap-6">
            <div className="flex items-center gap-3">
              {airlineLogo ? (
                <div className="w-12 h-12 flex items-center justify-center bg-white p-1 rounded-lg border border-slate-200">
                  <img src={airlineLogo} alt={airlineName} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-700">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-serif text-[#a68c53] tracking-wider font-bold uppercase">
                {airlineName}
              </h1>
            </div>



            <div className="text-2xl sm:text-3xl font-extrabold text-[#0b2f64] tracking-wide">
              {routeDisplay}
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm">
              <thead className="bg-[#0b2f64] text-white">
                <tr>
                  <th className="py-4 px-2 font-bold tracking-wider">DATE</th>
                  <th className="py-4 px-2 font-bold tracking-wider">TIME</th>
                  <th className="py-4 px-2 font-bold tracking-wider">BAG</th>
                  <th className="py-4 px-2 font-bold tracking-wider">MEAL</th>
                  <th className="py-4 px-2 font-bold tracking-wider">FARE</th>
                  <th className="py-4 px-2 font-bold tracking-wider">SEATS</th>
                  <th className="py-4 px-2 font-bold tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {flights.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">No flights available for this route currently.</td>
                  </tr>
                ) : flights.map((flight, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'} border-b border-slate-100 hover:bg-orange-50 transition-colors`}>
                    
                    <td className="py-4 px-2 text-slate-600 font-semibold align-middle">
                      <div className="flex flex-col">
                        <span>{flight.date.substring(0, 5)}-</span>
                        <span>{flight.date.substring(6)}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-2 text-slate-600 font-semibold align-middle">
                      <div className="flex flex-col">
                        <span>{flight.time.split(' - ')[0]} -</span>
                        <span>{flight.time.split(' - ')[1]}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-2 text-slate-600 font-semibold align-middle">
                      <div className="flex flex-col">
                        <span>{flight.bag.split(' ')[0]}</span>
                        <span>{flight.bag.split(' ')[1]}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-2 font-bold text-green-700 align-middle">
                      {flight.meal ? 'YES' : 'NO'}
                    </td>
                    
                    <td className="py-4 px-2 align-middle">
                      <div className="flex flex-col font-bold text-slate-700">
                        <span>{flight.fare}</span>
                        <span className="text-xs text-slate-500">PKR/-</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-2 align-middle">
                      <div className="bg-white border border-slate-200 text-slate-500 text-xs px-2 py-1.5 rounded mx-auto inline-block font-medium">
                        {flight.seats.split(' ')[0]}<br/>{flight.seats.split(' ')[1]}
                      </div>
                    </td>
                    
                    <td className="py-3 px-2 align-middle">
                      <div className="flex flex-col gap-1 items-center justify-center">
                        <button 
                          onClick={() => onOpenBooking(`Booking: ${routeDisplay} on ${flight.date}`)}
                          className="w-24 bg-[#0b2f64] hover:bg-[#ff5500] text-white text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Book Now
                        </button>
                        <button 
                          onClick={() => handleCopy(flight)}
                          className="w-24 bg-[#e74c3c] hover:bg-red-600 text-white text-xs font-bold py-1.5 rounded transition-colors cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};
