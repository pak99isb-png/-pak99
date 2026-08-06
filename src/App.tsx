import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TourCard } from './components/TourCard';
import { TourModal } from './components/TourModal';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { type TourPackage } from './types';
import { toursAPI } from './services/api';
import { Compass, Sparkles, GraduationCap, Hotel, ArrowRight } from 'lucide-react';

import { Suspense, lazy } from 'react';

// Lazy load all pages to drastically reduce the initial bundle size
const PakistanToursPage = lazy(() => import('./pages/PakistanToursPage').then(m => ({ default: m.PakistanToursPage })));
const UmrahPage = lazy(() => import('./pages/UmrahPage').then(m => ({ default: m.UmrahPage })));
const StudyUkPage = lazy(() => import('./pages/StudyUkPage').then(m => ({ default: m.StudyUkPage })));
const StudyAustraliaPage = lazy(() => import('./pages/StudyAustraliaPage').then(m => ({ default: m.StudyAustraliaPage })));
const StudyGermanyPage = lazy(() => import('./pages/StudyGermanyPage').then(m => ({ default: m.StudyGermanyPage })));
const StudyCanadaPage = lazy(() => import('./pages/StudyCanadaPage').then(m => ({ default: m.StudyCanadaPage })));
const ScholarshipsPage = lazy(() => import('./pages/ScholarshipsPage').then(m => ({ default: m.ScholarshipsPage })));
const AttestationPage = lazy(() => import('./pages/AttestationPage').then(m => ({ default: m.AttestationPage })));
const HotelsPage = lazy(() => import('./pages/HotelsPage').then(m => ({ default: m.HotelsPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(m => ({ default: m.BlogsPage })));
const BlogDetailsPage = lazy(() => import('./pages/BlogDetailsPage').then(m => ({ default: m.BlogDetailsPage })));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage').then(m => ({ default: m.WhyUsPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TourDetailsPage = lazy(() => import('./pages/TourDetailsPage').then(m => ({ default: m.TourDetailsPage })));
const VisaPage = lazy(() => import('./pages/VisaPage').then(m => ({ default: m.VisaPage })));
const VisaDetailsPage = lazy(() => import('./pages/VisaDetailsPage').then(m => ({ default: m.VisaDetailsPage })));
const AdminApp = lazy(() => import('./admin/AdminApp').then(m => ({ default: m.AdminApp })));

export function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTourModal, setActiveTourModal] = useState<TourPackage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTourTitle, setBookingTourTitle] = useState<string | undefined>(undefined);
  const [allTours, setAllTours] = useState<TourPackage[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    toursAPI.getAll().then((data) => setAllTours(data as unknown as TourPackage[])).catch(console.error);
  }, []);

  // Clear residual dark class
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('pak99_theme');
  }, []);

  // Filter packages based on search query or category, otherwise just show featured tours
  const displayHomeTours = allTours.filter(t => {
    const isSearching = searchQuery.trim() !== '' || selectedCategory !== 'All';
    
    if (isSearching) {
      const matchesSearch = !searchQuery || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
    
    return t.featured;
  });

  // If no tours are featured and user isn't searching, fallback to showing the first 3 tours
  const finalDisplayTours = (displayHomeTours.length === 0 && searchQuery.trim() === '' && selectedCategory === 'All') 
    ? allTours.slice(0, 3) 
    : displayHomeTours;

  const handleOpenBooking = (tourTitle?: string) => {
    setBookingTourTitle(tourTitle);
    setIsBookingOpen(true);
  };

  const handleNavigateToTour = (keyword: string) => {
    const tour = allTours.find(t => t.title.toLowerCase().includes(keyword.toLowerCase()) || (t.location && t.location.toLowerCase().includes(keyword.toLowerCase())));
    if (tour) {
      navigate(`/tours/${tour.id}`);
    } else {
      navigate('/pakistan-tours');
    }
  };

  const isRouteAdmin = location.pathname.startsWith('/admin');

  if (isRouteAdmin) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col relative">
      <Navbar onOpenBooking={handleOpenBooking} />

      <Suspense fallback={
        <div className="w-full h-[100svh] flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5500]"></div>
        </div>
      }>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col">
              <SEO title="Home" />
              <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onExploreClick={() => { const sec = document.getElementById('tours-section'); if (sec) sec.scrollIntoView({ behavior: 'smooth' }); }} />
              <main className="flex-1 space-y-20 py-12 bg-slate-50">
                <section id="home-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
                  <div className="text-center space-y-2 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500/10 text-[#ff5500] border border-orange-500/30">
                      <Compass className="w-3.5 h-3.5" /> What Are You Looking For?
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">
                      Explore Our <span className="text-gradient">Primary Services</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.button onClick={() => navigate('/pakistan-tours')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#ff5500]/60 transition-all text-left group space-y-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#ff5500] flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform">🇵🇰</div>
                      <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500]">Pakistan Tours</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Hunza, Skardu, Swat, Naran & Fairy Meadows.</p>
                      <div className="text-xs font-extrabold text-[#ff5500] flex items-center gap-1 pt-2"><span>View Packages</span><ArrowRight className="w-3.5 h-3.5" /></div>
                    </motion.button>
                    <motion.button onClick={() => navigate('/umrah')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#ff5500]/60 transition-all text-left group space-y-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform"><Sparkles className="w-6 h-6 text-amber-600" /></div>
                      <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500]">Umrah Services</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Walking distance Haram 4 & 5-Star hotels.</p>
                      <div className="text-xs font-extrabold text-[#ff5500] flex items-center gap-1 pt-2"><span>View Umrah Plans</span><ArrowRight className="w-3.5 h-3.5" /></div>
                    </motion.button>
                    <motion.button onClick={() => navigate('/study-uk')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#ff5500]/60 transition-all text-left group space-y-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform"><GraduationCap className="w-6 h-6 text-indigo-600" /></div>
                      <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500]">Study Abroad</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">UK, Australia, Germany & Canada Visas.</p>
                      <div className="text-xs font-extrabold text-[#ff5500] flex items-center gap-1 pt-2"><span>Explore Admissions</span><ArrowRight className="w-3.5 h-3.5" /></div>
                    </motion.button>
                    <motion.button onClick={() => navigate('/hotels')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-[#ff5500]/60 transition-all text-left group space-y-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-extrabold text-xl group-hover:scale-110 transition-transform"><Hotel className="w-6 h-6 text-emerald-600" /></div>
                      <h3 className="text-base font-extrabold text-[#0b2f64] group-hover:text-[#ff5500]">Hotel Booking</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">Discounted luxury resort reservations.</p>
                      <div className="text-xs font-extrabold text-[#ff5500] flex items-center gap-1 pt-2"><span>Reserve Hotels</span><ArrowRight className="w-3.5 h-3.5" /></div>
                    </motion.button>
                  </div>
                </section>
                <section id="tours-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                      {searchQuery || selectedCategory !== 'All' ? (
                        <>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">
                            {searchQuery ? (
                              <>Search results for <span className="text-gradient">"{searchQuery}"</span></>
                            ) : (
                              <>Search <span className="text-gradient">Results</span></>
                            )}
                          </h2>
                          <p className="text-sm text-slate-600 font-semibold mt-1">Found {finalDisplayTours.length} packages matching your criteria.</p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b2f64]">Featured <span className="text-gradient">Travel Packages</span></h2>
                          <p className="text-sm text-slate-600 font-semibold mt-1">Our top recommended luxury travel itineraries for families, couples & adventurers.</p>
                        </>
                      )}
                    </div>
                    <button onClick={() => navigate('/pakistan-tours')} className="text-xs font-extrabold text-[#ff5500] hover:underline flex items-center gap-1 cursor-pointer">
                      <span>View All Packages</span><ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {finalDisplayTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {finalDisplayTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} onSelectTour={(t) => navigate(`/tours/${t.id}`)} onBookNow={(title) => handleOpenBooking(title)} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 font-bold bg-white rounded-3xl border border-slate-200">
                      No tours found matching your search criteria.
                    </div>
                  )}
                </section>
                <ContactSection />
              </main>
            </motion.div>
          } />

          {/* Standard Routes */}
          <Route path="/pakistan-tours" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PakistanToursPage onSelectTour={(t) => navigate(`/tours/${t.id}`)} onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/umrah" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><UmrahPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/study-uk" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudyUkPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/study-australia" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudyAustraliaPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/study-germany" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudyGermanyPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/study-canada" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StudyCanadaPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/scholarships" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ScholarshipsPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/attestation" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AttestationPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/hotels" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><HotelsPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/blogs" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogsPage onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/blog/:id" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BlogDetailsPage /></motion.div>} />
          <Route path="/why-us" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><WhyUsPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/contact" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ContactPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} /></motion.div>} />
          <Route path="/visa" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><VisaPage onOpenBooking={handleOpenBooking} onNavigateHome={() => navigate('/')} onSelectCountry={(c) => navigate(`/visa/${c.code}`)} /></motion.div>} />
          
          <Route path="/tours/:id" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TourDetailsPage onNavigate={(p) => navigate(`/${p}`)} onOpenBooking={handleOpenBooking} /></motion.div>} />
          <Route path="/visas/:id" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><VisaDetailsPage onOpenBooking={handleOpenBooking} /></motion.div>} />
          
          {/* Admin Area */}
          <Route path="/admin/*" element={<AdminApp />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      </Suspense>

      <Footer onNavigateToTour={handleNavigateToTour} />

      <WhatsAppFloating />

      <TourModal tour={activeTourModal} onClose={() => setActiveTourModal(null)} onBookNow={(title) => handleOpenBooking(title)} />

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} initialTourTitle={bookingTourTitle} />
    </div>
  );
}

export default App;

