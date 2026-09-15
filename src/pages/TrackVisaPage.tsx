import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, CheckCircle2, XCircle, Clock, Loader2, FileText, AlertCircle, MessageSquare, Watch } from 'lucide-react';
import { SEO } from '../components/SEO';
import { visaApplicationsAPI, settingsAPI } from '../services/api';
import type { ApiVisaApplication } from '../services/api';

export const TrackVisaPage: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<ApiVisaApplication | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    settingsAPI.get().then(setSettings).catch(console.error);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceNumber.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setApplication(null);

    try {
      const data = await visaApplicationsAPI.track(referenceNumber.trim());
      setApplication(data);
    } catch (err: any) {
      setError(err.message || 'Visa application not found. Please check your reference number.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400';
      case 'Rejected': return 'bg-red-500/20 border-red-500/40 text-red-400';
      case 'Under Process': return 'bg-blue-500/20 border-blue-500/40 text-blue-400';
      default: return 'bg-amber-500/20 border-amber-500/40 text-amber-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 className="w-8 h-8 text-emerald-400" />;
      case 'Rejected': return <XCircle className="w-8 h-8 text-red-400" />;
      case 'Under Process': return <Clock className="w-8 h-8 text-blue-400" />;
      default: return <Clock className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative pt-24 sm:pt-32">
      <SEO
        title="Track Your Visa Application - Pak99 Travel & Tours"
        description="Easily track the status of your visa application with Pak99 Travel & Tours using your reference number."
        canonicalPath="/track-visa"
      />

      {/* Hero Section */}
      <div className="absolute inset-0 bg-[#0b2f64] overflow-hidden h-[50vh]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2f64] via-[#0b2f64]/90 to-slate-50" />
      </div>

      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Search className="w-3.5 h-3.5" /> Track Status
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#ff5500]">Visa</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            Enter your unique reference number to check the real-time status of your visa application.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-w-2xl mx-auto mb-12"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                  placeholder="Enter Reference Number"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 text-base sm:text-lg font-bold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#ff5500] focus:bg-white transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#ff5500] to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-70 cursor-pointer"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-5 h-5" />}
                <span>Track Now</span>
              </button>
            </form>
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-400 hidden sm:block" />
            <span className="text-sm font-medium text-slate-500">Need help with your visa application?</span>
            <a
              href={`https://wa.me/${settings?.whatsappNumber || '923108032999'}?text=Hello%20Pak99%20Travel,%20I%20need%20help%20tracking%20my%20visa%20application.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff5500] font-extrabold text-sm hover:underline flex items-center gap-1"
            >
              Contact Support
            </a>
          </div>
        </motion.div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {hasSearched && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {error ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center space-y-4 shadow-lg">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-red-700">Application Not Found</h3>
                  <p className="text-red-600/80 font-medium">{error}</p>
                  <p className="text-sm text-red-500 font-bold mt-4">Please verify the reference or passport number with our support team if you believe this is an error.</p>
                </div>
              ) : application ? (
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                  <div className="bg-[#0b2f64] p-6 sm:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-300 uppercase tracking-widest">Applicant</div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-400 capitalize">{application.customerName}</h2>
                        <div className="flex items-center gap-2 text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg inline-flex mt-2">
                          <FileText className="w-4 h-4 text-[#ff5500]" />
                          <span className="font-mono font-bold tracking-wider">{application.referenceNumber}</span>
                        </div>
                      </div>

                      <div className={`flex flex-col items-center justify-center px-6 py-4 rounded-2xl border-2 backdrop-blur-md ${getStatusColor(application.status === 'Processing' ? 'Under Process' : application.status)}`}>
                        {getStatusIcon(application.status === 'Processing' ? 'Under Process' : application.status)}
                        <span className="mt-2 font-extrabold tracking-wide uppercase text-sm">{application.status === 'Processing' ? 'Under Process' : application.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 bg-white grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Visa Type</span>
                      <p className="text-lg font-extrabold text-[#0b2f64]">{application.visaType}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Expected Date</span>
                      <p className="text-lg font-extrabold text-[#0b2f64]">
                        {application.expectedDate ? new Date(application.expectedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                      </p>
                    </div>

                    {application.passportNumber && (
                      <div className="space-y-1 col-span-1 sm:col-span-2 pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passport Number</span>
                        <p className="text-base font-bold text-slate-700">{application.passportNumber}</p>
                      </div>
                    )}

                    {application.notes && (
                      <div className="space-y-1 col-span-1 sm:col-span-2 pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agent Notes</span>
                        <p className="text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                          {application.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
