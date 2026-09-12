'use client';

import React, { useState } from 'react';
import { Radio, Tv, Share2, Globe, Bell, Check } from 'lucide-react';

export default function LiveStreamHub() {
  const [notified, setNotified] = useState(false);

  const handleSetReminder = () => {
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  };

  return (
    <section id="live" className="w-full my-8 scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-emerald-800/50 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold mb-2">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>തത്സമയം (Live Streaming Hub)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              പ്രവാസികൾക്കും കുടുംബങ്ങൾക്കും തത്സമയം കാണാം
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1 max-w-xl">
              ഗൾഫിലുള്ള പ്രവാസികൾക്കും നേരിട്ടെത്താൻ സാധിക്കാത്ത കുടുംബാംഗങ്ങൾക്കുമായി സമ്മേളനം തത്സമയം സംപ്രേഷണം ചെയ്യുന്നു.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSetReminder}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
            >
              {notified ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>ഓർമ്മപ്പെടുത്തൽ രേഖപ്പെടുത്തി!</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>ലൈവ് അലർട്ട് (Get Notified)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Video Player Placeholder Area */}
        <div className="mt-6 aspect-video max-w-3xl mx-auto rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center mb-4 text-emerald-300 group-hover:scale-110 transition-transform">
            <Tv className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 mb-2">
            BROADCAST STARTS AT 4:00 PM IST
          </span>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            ലൈവ് സ്ട്രീം സെപ്റ്റംബർ 17 ന് ആരംഭിക്കും
          </h3>

          <p className="text-xs text-slate-400 max-w-md">
            യൂട്യൂബ് / ഫേസ്ബുക്ക് ലൈവ് ലിങ്ക് സമ്മേളന ദിവസം ഈ സ്ക്രീനിൽ ലഭ്യമാകുന്നതാണ്. പ്രവാസികളായ കൂട്ടുകാരിലേക്ക് പങ്കുവെക്കുക.
          </p>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-300/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <Globe className="w-3.5 h-3.5" />
            <span>UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain & Global Live</span>
          </div>
        </div>
      </div>
    </section>
  );
}
