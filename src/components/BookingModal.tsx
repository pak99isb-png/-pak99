import React, { useState, useEffect } from 'react';
import { X, Phone, User, Calendar, Users, MessageSquare } from 'lucide-react';
import { settingsAPI } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTourTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTourTitle,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    tourTitle: initialTourTitle || 'Custom Tour Inquiry',
    travelDate: '',
    travelersCount: '2 Adults',
    notes: '',
  });

  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      settingsAPI.get().then(setSettings).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = `*Pak99 Quick Booking Request*\n\n📌 *Service:* ${formData.tourTitle}\n👤 *Name:* ${formData.fullName}\n📞 *Phone:* ${formData.phone}\n✉️ *Email:* ${formData.email || 'N/A'}\n📅 *Travel Date:* ${formData.travelDate || 'Flexible'}\n👥 *Travelers:* ${formData.travelersCount}\n💬 *Notes:* ${formData.notes || 'N/A'}`;
    const waNum = settings?.whatsappNumber || '923315290155';
    const whatsappUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(formattedMsg)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-[#0b2f64] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#ff5500] uppercase tracking-wider text-white">
              Instant Booking Desk
            </span>
            <h3 className="text-lg font-extrabold mt-1 text-white">Inquire & Book Package</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-blue-900/60 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Selected Package / Service</label>
            <input
              type="text"
              value={formData.tourTitle}
              onChange={(e) => setFormData({ ...formData, tourTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl font-extrabold text-[#0b2f64] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Muhammad Ali"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#ff5500] outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">WhatsApp / Phone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#ff5500] outline-none font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Expected Travel Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 shrink-0" />
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#ff5500] outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Number of Travelers</label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3 shrink-0" />
                <select
                  value={formData.travelersCount}
                  onChange={(e) => setFormData({ ...formData, travelersCount: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#ff5500] outline-none font-semibold"
                >
                  <option>1 Person</option>
                  <option>2 Adults (Couple)</option>
                  <option>Family (3-5 Persons)</option>
                  <option>Group (6+ Persons)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Special Requirements / Notes</label>
            <textarea
              rows={2}
              placeholder="Private Prado request, specific hotel preference..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-[#ff5500] outline-none font-semibold resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold rounded-xl shadow-lg shadow-green-500/25 text-xs flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 fill-white shrink-0" /> Send Inquiry to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
