import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Sparkles, Send, ChevronDown } from 'lucide-react';
import { settingsAPI } from '../services/api';

interface NavbarProps {
  onOpenBooking: (tourTitle?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'home';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  // Dropdown states
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const [whyDropdownOpen, setWhyDropdownOpen] = useState(false);

  // Mobile Accordion states
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [mobileStudyOpen, setMobileStudyOpen] = useState(false);
  const [mobileWhyOpen, setMobileWhyOpen] = useState(false);

  const toursRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    settingsAPI.get().then(setSettings).catch(console.error);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toursRef.current && !toursRef.current.contains(event.target as Node)) {
        setToursDropdownOpen(false);
      }
      if (studyRef.current && !studyRef.current.contains(event.target as Node)) {
        setStudyDropdownOpen(false);
      }
      if (whyRef.current && !whyRef.current.contains(event.target as Node)) {
        setWhyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
    setToursDropdownOpen(false);
    setStudyDropdownOpen(false);
    setWhyDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOverlayMode = currentPage === 'home' || currentPage === 'pakistan-tours' || currentPage === 'international-tours' || currentPage.startsWith('tours/');
  const isTransparent = isOverlayMode && !scrolled;

  return (
    <>
      {/* Top Announcement Bar - hidden in overlay mode to match exact reference design */}
      {!isOverlayMode && settings?.showTopBanner !== false && (
        <div className="bg-[#0b2f64] text-white text-xs py-2 px-4 shadow-sm border-b border-orange-500/30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 font-medium">
              <span className="bg-[#ff5500] text-white font-extrabold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 uppercase tracking-wide shadow-sm shrink-0">
                <Sparkles className="w-3 h-3 text-amber-200 shrink-0" /> Special Offer
              </span>
              <span className="font-semibold text-slate-100 text-center">Up to 20% OFF on Hunza, Skardu, Student Visas & Umrah!</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-slate-100">
              <div className="flex items-center gap-1.5 transition-colors font-semibold text-[10px] sm:text-xs">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="whitespace-nowrap">
                  <a href={`tel:${settings?.phone1 || '+923108032999'}`} className="hover:text-orange-400">{settings?.phone1 || '0310-8032999'}</a> 
                  {' '}/ <a href={`tel:${settings?.phone2 || '+92512757282'}`} className="hover:text-orange-400">{settings?.phone2 || '051-2757282'}</a>
                  {settings?.phone3 && (
                    <>{' '}/ <a href={`tel:${settings.phone3.replace(/[^0-9+]/g, '')}`} className="hover:text-orange-400">{settings.phone3}</a></>
                  )}
                  {(() => {
                    const wa = settings?.whatsappNumber || '923315290155';
                    const displayWa = wa.startsWith('92') && wa.length === 12 ? `0${wa.slice(2, 5)}-${wa.slice(5)}` : wa;
                    return <>{' '}/ <a href={`tel:+${wa}`} className="hover:text-orange-400">{displayWa}</a></>;
                  })()}
                </span>
              </div>
              <span className="hidden sm:inline text-blue-400">|</span>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '923108032999'}?text=Hello%20Pak99%20Travel%20and%20Tours,%20I%20want%20to%20inquire%20about%20tour%20packages%20and%20Study.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-extrabold transition-colors text-[10px] sm:text-xs whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Clean White Navbar Header */}
      <header
        className={`z-40 transition-all duration-300 w-full ${
          isOverlayMode ? 'fixed top-0' : 'sticky top-0'
        } ${
          isTransparent 
            ? 'bg-transparent border-transparent py-4' 
            : 'bg-white border-b border-slate-200 shadow-md ' + (scrolled ? 'py-3' : 'py-4')
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-4 xl:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink-0">
            <div className="relative p-1 bg-white rounded-xl shadow-md border border-slate-200 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="Pak99 Travel and Tours Logo"
                className="h-8 sm:h-11 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className={`font-extrabold text-base sm:text-2xl tracking-tight leading-none transition-colors ${isTransparent ? 'text-white' : 'text-[#0b2f64]'}`}>PAK 99</span>
              <span className="text-[9px] sm:text-[9px] font-bold px-1.5 py-0.5 mt-1 rounded bg-[#ff5500] text-white uppercase shadow-sm whitespace-nowrap min-w-max inline-block">TRAVEL & TOURS</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-2 lg:gap-4 xl:gap-6 font-extrabold text-sm xl:text-base tracking-tight uppercase whitespace-nowrap ${isTransparent ? 'text-white' : 'text-[#0b2f64]'}`}>
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'home' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Home
            </button>

            {/* 1. Tours Dropdown */}
            <div
              className="relative"
              ref={toursRef}
              onMouseEnter={() => setToursDropdownOpen(true)}
              onMouseLeave={() => setToursDropdownOpen(false)}
            >
              <button
                onClick={() => setToursDropdownOpen(!toursDropdownOpen)}
                className={`hover:text-[#ff5500] transition-colors flex items-center gap-1 cursor-pointer font-extrabold py-2 ${
                  currentPage.includes('tours') && !isTransparent ? 'text-[#ff5500]' : ''
                }`}
              >
                <span>Tours</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTransparent ? 'text-white' : 'text-[#ff5500]'} ${toursDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toursDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 z-50 animate-fade-in normal-case">
                  <button
                    onClick={() => handleNavClick('pakistan-tours')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Pakistan Tours
                  </button>
                  <button
                    onClick={() => handleNavClick('international-tours')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    International Tours
                  </button>

                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('umrah')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'umrah' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Umrah
            </button>
            <button
              onClick={() => handleNavClick('visa')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'visa' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Visa
            </button>

            {/* 2. Study Dropdown */}
            <div
              className="relative"
              ref={studyRef}
              onMouseEnter={() => setStudyDropdownOpen(true)}
              onMouseLeave={() => setStudyDropdownOpen(false)}
            >
              <button
                onClick={() => setStudyDropdownOpen(!studyDropdownOpen)}
                className={`hover:text-[#ff5500] transition-colors flex items-center gap-1 cursor-pointer font-extrabold py-2 ${
                  (currentPage.includes('study') || currentPage === 'scholarships' || currentPage === 'attestation') && !isTransparent ? 'text-[#ff5500]' : ''
                }`}
              >
                <span>Study</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTransparent ? 'text-white' : 'text-[#ff5500]'} ${studyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {studyDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 z-50 animate-fade-in normal-case">
                  <button
                    onClick={() => handleNavClick('study')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Study Abroad
                  </button>
                  <button
                    onClick={() => handleNavClick('scholarships')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Scholarships & Grants
                  </button>
                  <button
                    onClick={() => handleNavClick('attestation')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Document Translation & Attestation
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('hotels')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'hotels' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Hotels
            </button>
            <button
              onClick={() => handleNavClick('tickets')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'tickets' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Tickets
            </button>
            <button
              onClick={() => handleNavClick('insurance')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'insurance' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Insurance
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className={`hover:text-[#ff5500] transition-colors cursor-pointer ${currentPage === 'blogs' && !isTransparent ? 'text-[#ff5500]' : ''}`}
            >
              Blogs
            </button>

            {/* 3. Why Pak99 Dropdown */}
            <div
              className="relative"
              ref={whyRef}
              onMouseEnter={() => setWhyDropdownOpen(true)}
              onMouseLeave={() => setWhyDropdownOpen(false)}
            >
              <button
                onClick={() => setWhyDropdownOpen(!whyDropdownOpen)}
                className={`hover:text-[#ff5500] transition-colors flex items-center gap-1 cursor-pointer font-extrabold py-2 ${
                  (currentPage === 'why-us' || currentPage === 'reviews' || currentPage === 'contact') && !isTransparent ? 'text-[#ff5500]' : ''
                }`}
              >
                <span>Why Pak99</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTransparent ? 'text-white' : 'text-[#ff5500]'} ${whyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {whyDropdownOpen && (
                <div className="absolute top-full right-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 space-y-1 z-50 animate-fade-in normal-case">
                  <button
                    onClick={() => handleNavClick('why-us')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Why Choose Pak99
                  </button>
                  <button
                    onClick={() => handleNavClick('reviews')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Customer Reviews
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-extrabold text-[#0b2f64] hover:bg-orange-50 hover:text-[#ff5500] transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-[#ff5500] via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-3 py-2 xl:px-5 xl:py-2.5 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all text-[10px] xl:text-xs flex items-center gap-2 cursor-pointer uppercase"
            >
              <Send className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="hidden xl:inline">Book Custom Tour</span>
              <span className="inline xl:hidden">Book</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors ${isTransparent ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-[#0b2f64]'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 mt-3 px-4 py-6 space-y-4 bg-white shadow-xl">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-lg"
            >
              Home
            </button>

            {/* Mobile Tours Expandable */}
            <div className="space-y-2 py-1 border-y border-slate-100">
              <button 
                onClick={() => setMobileToursOpen(!mobileToursOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="text-xs font-extrabold text-[#ff5500] uppercase tracking-wider">
                  Tours
                </div>
                <ChevronDown className={`w-4 h-4 text-[#ff5500] transition-transform ${mobileToursOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileToursOpen && (
                <div className="pl-3 space-y-2 animate-fade-in">
                  <button
                    onClick={() => handleNavClick('pakistan-tours')}
                    className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full"
                  >
                    Pakistan Tours
                  </button>
                  <button
                    onClick={() => handleNavClick('international-tours')}
                    className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full"
                  >
                    International Tours
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('umrah')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Umrah
            </button>
            <button
              onClick={() => handleNavClick('visa')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Visa
            </button>

            {/* Mobile Study Section */}
            <div className="space-y-2 py-1 border-b border-slate-100">
              <button 
                onClick={() => setMobileStudyOpen(!mobileStudyOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="text-xs font-extrabold text-[#ff5500] uppercase tracking-wider">
                  Study
                </div>
                <ChevronDown className={`w-4 h-4 text-[#ff5500] transition-transform ${mobileStudyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileStudyOpen && (
                <div className="pl-3 space-y-2 animate-fade-in">
                  <button onClick={() => handleNavClick('study')} className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full">
                    Study Abroad
                  </button>
                  <button onClick={() => handleNavClick('scholarships')} className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full">
                    Scholarships & Grants
                  </button>
                  <button onClick={() => handleNavClick('attestation')} className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full">
                    Document Translation & Attestation
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('hotels')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Hotels
            </button>
            <button
              onClick={() => handleNavClick('tickets')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Tickets
            </button>
            <button
              onClick={() => handleNavClick('insurance')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Insurance
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className="block text-[#0b2f64] hover:text-[#ff5500] font-extrabold py-1 text-left w-full text-lg"
            >
              Blogs
            </button>

            {/* Mobile Why Pak99 Expandable */}
            <div className="space-y-2 py-1 border-t border-slate-100">
              <button 
                onClick={() => setMobileWhyOpen(!mobileWhyOpen)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="text-xs font-extrabold text-[#ff5500] uppercase tracking-wider">
                  Why Pak99
                </div>
                <ChevronDown className={`w-4 h-4 text-[#ff5500] transition-transform ${mobileWhyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileWhyOpen && (
                <div className="pl-3 space-y-2 animate-fade-in">
                  <button
                    onClick={() => handleNavClick('why-us')}
                    className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full"
                  >
                    Why Choose Pak99
                  </button>
                  <button
                    onClick={() => handleNavClick('reviews')}
                    className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full"
                  >
                    Customer Reviews
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="block text-xs font-extrabold text-[#0b2f64] hover:text-[#ff5500] py-1 text-left w-full"
                  >
                    Contact Us
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-gradient-to-r from-[#ff5500] to-amber-500 text-white font-extrabold py-3 rounded-xl shadow-lg text-center flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Book Custom Tour
            </button>
          </div>
        )}
      </header>
    </>
  );
};
