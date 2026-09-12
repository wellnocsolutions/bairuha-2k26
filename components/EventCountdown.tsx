'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Bell } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function EventCountdown() {
  // Target: September 17, 2026, 4:00 PM IST (UTC+5:30)
  const targetDate = new Date('2026-09-17T16:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCalendar = () => {
    // Google Calendar Event Link
    const title = encodeURIComponent('മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ');
    const details = encodeURIComponent(
      'മദീനത്തുൽ ഇൽമ് ദർസ് മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ 2026.\nവേദി: ഖൈമ അബൂത്വല്ഹ, SKY LINE BANQUETS ചെർക്കള\nകൂടുതൽ വിവരങ്ങൾക്ക്: https://bairuha-2k26.vercel.app/'
    );
    const location = encodeURIComponent('SKY LINE BANQUETS AND EVENTS, Cherkala, Kerala');
    const dates = '20260917T103000Z/20260917T173000Z'; // 4:00 PM to 11:00 PM IST in UTC

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full my-6 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-700/40">
      {/* Decorative Islamic geometric background glows */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Event Summary info */}
        <div className="text-center lg:text-left space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>കൗണ്ട്ഡൗൺ ലൈവ് (Countdown)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            2026 സെപ്റ്റംബർ 17, വ്യാഴം <span className="text-amber-400 font-bold">4 PM</span>
          </h2>

          <p className="text-emerald-100/80 text-xs sm:text-sm font-medium flex items-center justify-center lg:justify-start gap-1.5">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>ഖൈമ അബൂത്വല്ഹ, SKY LINE BANQUETS & EVENTS, ചെർക്കള</span>
          </p>
        </div>

        {/* Center: Live Countdown Clock Boxes */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl w-16 sm:w-20 h-20 sm:h-24 shadow-inner">
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-200 font-medium uppercase tracking-wider mt-1">
              ദിവസം
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-emerald-400/80">:</span>

          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl w-16 sm:w-20 h-20 sm:h-24 shadow-inner">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-200 font-medium uppercase tracking-wider mt-1">
              മണിക്കൂർ
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-emerald-400/80">:</span>

          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl w-16 sm:w-20 h-20 sm:h-24 shadow-inner">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-200 font-medium uppercase tracking-wider mt-1">
              മിനുട്ട്
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-emerald-400/80">:</span>

          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl w-16 sm:w-20 h-20 sm:h-24 shadow-inner">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-200 font-medium uppercase tracking-wider mt-1">
              സെക്കൻഡ്
            </span>
          </div>
        </div>

        {/* Right: Quick Action - Add to Calendar */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-2.5">
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>കലണ്ടറിൽ ചേർക്കുക (Add to Calendar)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
