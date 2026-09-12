import React from 'react';
import { MapPin, Navigation, Car, Bus, ExternalLink, CheckCircle } from 'lucide-react';

export default function VenueGuide() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Sky+Line+Banquets+and+Events+Cherkala';

  return (
    <section id="venue" className="w-full my-8 scroll-mt-20">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 mb-2">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>സമ്മേളന വേദി (Venue)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                ഖൈമ അബൂത്വല്ഹ, SKY LINE BANQUETS
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
                SKY LINE BANQUETS AND EVENTS, ചെർക്കള, കാസർഗോഡ്, കേരളം
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>ഗൂഗിൾ മാപ്പിൽ കാണുക (Open Google Maps)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Travel & Parking Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1.5">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>പാർക്കിംഗ് സൗകര്യം</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ആഡിറ്റോറിയം അങ്കണത്തിലും സമീപത്തുമായി ഇരുചക്ര-നാലുചക്ര വാഹനങ്ങൾക്ക് സുഗമമായ വിശാല പാർക്കിംഗ് സൗകര്യം ഉണ്ടായിരിക്കും.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1.5">
                <Bus className="w-4 h-4 text-emerald-600" />
                <span>ബസ്സ് റൂട്ട് & എളുപ്പവഴി</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ദേശീയപാത 66 (NH 66) വഴി ചെർക്കള ജംഗ്ഷനിൽ നിന്നും എളുപ്പത്തിൽ എത്തിച്ചേരാവുന്ന സൗകര്യപ്രദമായ വേദി.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>സൗകര്യങ്ങൾ</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                സുഖപ്രദമായ ഇരിപ്പിടങ്ങൾ, കുടിവെള്ളം, വുളൂഅ് സൗകര്യം, നമസ്കാര ഇടം എന്നിവ ഒരുക്കിയിരിക്കുന്നു.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
