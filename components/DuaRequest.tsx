'use client';

import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

export default function DuaRequest() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [category, setCategory] = useState('രോഗശമനം (Health & Healing)');
  const [intention, setIntention] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'രോഗശമനം (Health & Healing)',
    'കടബാധ്യതയിൽ നിന്നുള്ള മോചനം (Relief from Debts)',
    'കുടുംബ സമാധാനവും ഐശ്വര്യവും (Family Peace)',
    'മക്കൾക്ക് സന്മാർഗ്ഗവും ഉന്നതിയും (Children Success)',
    'ബിസിനസ്സ് & ജോലിയിലെ അഭിവൃദ്ധി (Job/Business Barakah)',
    'മർഹൂമീങ്ങൾക്ക് മഗ്ഫിറത്ത് (For Deceased Souls)',
    'മറ്റു പ്രാർത്ഥനകൾ (General Dua)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `🤲 *ദുആ വസിയ്യത്ത് (Dua Request)*\n` +
      `*പേര്:* ${name.trim()}\n` +
      `*സ്ഥലം:* ${place.trim() || 'പ്രത്യേകം പരാമർശിച്ചിട്ടില്ല'}\n` +
      `*വിഷയം:* ${category}\n` +
      (intention.trim() ? `*വിശദാംശം:* ${intention.trim()}\n\n` : '\n') +
      `മദീനത്തുൽ ഇൽമ് ദർസ് - മീലാദ് കോൺഫ്രൻസ് സമാപന ദുആ മജ്‌ലിസിൽ ഉൾപ്പെടുത്താൻ അപേക്ഷിക്കുന്നു.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setName('');
    setPlace('');
    setIntention('');
    setSubmitted(false);
  };

  return (
    <section id="dua" className="w-full my-8 scroll-mt-20">
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>ദുആ വസിയ്യത്ത് (Online Dua Request)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            സമാപന പ്രാർത്ഥനാ സദസ്സിലേക്ക് നിങ്ങളുടെ പ്രാർത്ഥനാ വിഷയം സമർപ്പിക്കാം
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            സെപ്റ്റംബർ 17 ന് നടക്കുന്ന സമാപന ദുആ മജ്‌ലിസിൽ സാദാത്തീങ്ങളും പണ്ഡിതന്മാരും സദസ്സും നിങ്ങളുടെ വിഷയം പ്രത്യേകം ഉൾപ്പെടുത്തി പ്രാർത്ഥിക്കുന്നതാണ്.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-md text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              പ്രാർത്ഥനാ വിഷയം രേഖപ്പെടുത്തി
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              അല്ലാഹു നിങ്ങളുടെ എല്ലാ നല്ല ഉദ്ദേശ്യങ്ങളും സ്വീകരിക്കുകയും സമാപന മജ്‌ലിസിലെ പുണ്യങ്ങളാൽ അനുഗ്രഹിക്കുകയും ചെയ്യുമാറാകട്ടെ (ആമീൻ).
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-700">
              <p><strong>പേര്:</strong> {name}</p>
              {place && <p><strong>സ്ഥലം:</strong> {place}</p>}
              <p><strong>വിഷയം:</strong> {category}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>വാട്സാപ്പിലൂടെ പങ്കുവെക്കുക</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                മറ്റൊന്ന് സമർപ്പിക്കുക
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                നിങ്ങളുടെ പേര് (Name) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ഉദാ: മുഹമ്മദ് അലി / ആമിന"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                സ്ഥലം / രാജ്യം (Place / Country)
              </label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="ഉദാ: ദുബായ്, യുഎഇ / കാസർഗോഡ്"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                പ്രാർത്ഥനാ വിഷയം (Dua Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                വിശദാംശങ്ങൾ (കൂടുതൽ വിവരങ്ങൾ ഉണ്ടെങ്കിൽ - ഓപ്ഷണൽ)
              </label>
              <textarea
                rows={2}
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                placeholder="പ്രത്യേകം ദുആ ചെയ്യേണ്ട കാര്യം ചുരുക്കത്തിൽ..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>ദുആ വസിയ്യത്ത് സമർപ്പിക്കുക</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
