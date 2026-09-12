'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ് 2026 | ഒഫീഷ്യൽ പോസ്റ്റർ മേക്കർ',
      text: '✨ മദീനത്തുല് ഇല്മ് ദര്സ് - മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ (2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM).\n\nനിങ്ങളുടെ ഫോട്ടോയും പേരും ചേർത്തുള്ള ഒഫീഷ്യൽ പോസ്റ്റർ തയ്യാറാക്കൂ:',
      url: typeof window !== 'undefined' ? window.location.href : '',
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

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand Event Tag */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-none">
              ബൈറുഹാ 2026
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              Official
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none mt-1">
            മദീനത്തുൽ ഇൽമ് ദർസ്
          </p>
        </div>

        {/* Action Controls: Privacy Badge + Share */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% Client-Side Privacy
          </div>

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
        </div>
      </div>
    </header>
  );
}
