import React from 'react';
import { BookOpen, GraduationCap, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutDars() {
  return (
    <section id="about" className="w-full my-8 scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300 mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
              <span>സ്ഥാപനത്തെക്കുറിച്ച് (About Us)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              മദീനത്തുൽ ഇൽമ് ദർസ്
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
              വിശുദ്ധ ഇസ്‌ലാമിക വിജ്ഞാനവും ധാർമ്മിക സംസ്കാരവും പകർന്നുനൽകുന്ന ഉന്നത ദർസ് സംവിധാനം.
            </p>
          </div>
        </div>

        {/* Feature pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              പാരമ്പര്യ ദർസ് വിദ്യാഭ്യാസം
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ഖുർആൻ, ഹദീസ്, ഫിഖ്ഹ്, അറബിക് സാഹിത്യം എന്നിവയിൽ ആഴത്തിലുള്ള അറിവും പരിശീലനവും നൽകുന്ന ആധികാരിക സിലബസ്.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              ധാർമ്മിക ശിക്ഷണം & ആത്മീയത
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              വിദ്യാർത്ഥികളിൽ സൂക്ഷ്മതയും വിനയവും നല്ല സ്വഭാവഗുണങ്ങളും വളർത്തിയെടുക്കുന്ന പ്രായോഗിക ആത്മീയ അന്തരീക്ഷം.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              സാമൂഹിക ഉത്തരവാദിത്തം
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              സമൂഹത്തിന് പ്രയോജനപ്പെടുന്ന നേതൃപാടവമുള്ള ഉലമാക്കളെയും പണ്ഡിതന്മാരെയും നാളെയുടെ കാവലാളുകളായി വാർത്തെടുക്കൽ.
            </p>
          </div>
        </div>

        {/* Support the Dars Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-extrabold text-sm sm:text-base text-amber-300">
              ദർസ് വിദ്യാർത്ഥികൾക്ക് നിങ്ങളുടെ സ്നേഹ സഹായം നൽകാം
            </h4>
            <p className="text-xs text-emerald-100/80">
              വിജ്ഞാന ദാഹികളായ വിദ്യാർത്ഥികളുടെ ഭക്ഷണ, പഠന സൗകര്യങ്ങളിൽ പങ്കാളിയാകൂ.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs shrink-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>ദർസ് കമ്മിറ്റിയുമായി ബന്ധപ്പെടുക</span>
          </div>
        </div>
      </div>
    </section>
  );
}
