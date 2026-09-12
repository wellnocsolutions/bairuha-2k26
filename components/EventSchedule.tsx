import React from 'react';
import { Clock, Sparkles, BookOpen, Heart, Award, Users } from 'lucide-react';

interface ScheduleItem {
  time: string;
  session: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const SCHEDULE: ScheduleItem[] = [
  {
    time: '04:00 PM',
    session: 'ഉദ്ഘാടന സമ്മേളനം & സ്വാഗതം',
    description: 'സാദാത്തീങ്ങളുടെ സാന്നിധ്യത്തിൽ മൗലിക പ്രാർത്ഥനയോടെ തുടക്കം. പ്രമുഖ പണ്ഡിതന്മാരും നേതാക്കളും സംബന്ധിക്കുന്നു.',
    tag: 'ആരംഭം',
    icon: <Users className="w-5 h-5 text-emerald-600" />,
  },
  {
    time: '05:30 PM',
    session: 'മൗലിദ് ജൽസ & സ്വലാത്ത് മജ്‌ലിസ്',
    description: 'മദീനത്തുൽ ഇൽമ് ദർസ് വിദ്യാർത്ഥികൾ നയിക്കുന്ന പവിത്രമായ മൗലിദ് പാരായണവും കൂട്ടായ സ്വലാത്ത് മജ്‌ലിസും.',
    tag: 'ആത്മീയ സദസ്സ്',
    icon: <BookOpen className="w-5 h-5 text-teal-600" />,
  },
  {
    time: '07:00 PM',
    session: 'ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ & മുഖ്യപ്രഭാഷണം',
    description: 'വിദ്യാർത്ഥികളുടെ പ്രതിഭാ പ്രകടനങ്ങളുടെ ഗ്രാൻഡ് ഫിനാലെയും പ്രശസ്ത പ്രാസംഗികന്റെ വിജ്ഞാനപ്രദമായ മുഖ്യപ്രഭാഷണവും.',
    tag: 'മുഖ്യ പരിപാടി',
    icon: <Award className="w-5 h-5 text-amber-600" />,
    highlight: true,
  },
  {
    time: '09:30 PM',
    session: 'കൂട്ട ദുആ മജ്‌ലിസ് & സമാപനം',
    description: 'നാടിനും ജനങ്ങൾക്കും പ്രവാസികൾക്കും വേണ്ടിയുള്ള സമാപന പ്രാർത്ഥനാ സദസ്സ്. തബറുക് വിതരണത്തോടെ പരിപാടി സമാപിക്കുന്നു.',
    tag: 'സമാപന ദുആ',
    icon: <Heart className="w-5 h-5 text-rose-600" />,
  },
];

export default function EventSchedule() {
  return (
    <section id="schedule" className="w-full my-8 scroll-mt-20">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <Clock className="w-3.5 h-3.5 text-emerald-700" />
          <span>കാര്യപരിപാടികൾ (Schedule)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          സമ്മേളന സമയക്രമം & സെഷനുകൾ
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          2026 സെപ്റ്റംബർ 17 വ്യാഴാഴ്ച വൈകുന്നേരം 4 മണിക്ക് ആരംഭിക്കുന്ന സദസ്സിന്റെ വിശദമായ സമയക്രമം.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEDULE.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
              item.highlight
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {item.time}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {item.tag}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-1">
              {item.session}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
