import React from 'react';
import { MapPin, Calendar, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            ഖൈമ അബൂത്വല്ഹ, SKY LINE BANQUETS ചെർക്കള
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          സംഘാടനം: <strong className="text-slate-700">മദീനത്തുല് ഇല്മ് ദർസ്</strong> • ഒഫീഷ്യൽ ക്യാമ്പയിൻ പോസ്റ്റർ നിർമ്മാതാവ്
        </p>

        <p className="text-[11px] text-slate-400">
          © 2026 Bairuha Meelad Conference. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
