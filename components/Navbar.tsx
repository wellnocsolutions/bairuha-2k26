'use client';

import React, { useState } from 'react';
import { Share2, Check, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' && window.location.href ? window.location.href : 'https://bairuha-2k26.vercel.app/';
    const shareData = {
      title: 'ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ് 2026 | ഒഫീഷ്യൽ പോസ്റ്റർ മേക്കർ',
      text: 'മദീനത്തുല് ഇല്മ് ദർസ് - മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ (2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM).\n\nനിങ്ങളുടെ ഫോട്ടോയും പേരും ചേർത്തുള്ള ഒഫീഷ്യൽ പോസ്റ്റർ തയ്യാറാക്കൂ:',
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const navLinks = [
    { label: 'പോസ്റ്റർ', href: '#poster-maker' },
    { label: 'കാര്യപരിപാടികൾ', href: '#schedule' },
    { label: 'വേദി', href: '#venue' },
    { label: 'ലൈവ്', href: '#live' },
    { label: 'ദുആ വസിയ്യത്ത്', href: '#dua' },
    { label: 'ദർസ്', href: '#about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Event Tag */}
        <a href="#poster-maker" className="flex flex-col group">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
              ബൈറുഹാ 2026
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              Official
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none mt-1">
            മദീനത്തുൽ ഇൽമ് ദർസ്
          </p>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Share + Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            title="സുഹൃത്തുക്കളുമായി പങ്കുവെക്കുക"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>ലിങ്ക് കോപ്പിയായി!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>ഷെയർ</span>
              </>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
