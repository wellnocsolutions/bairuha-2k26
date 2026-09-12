'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  RotateCw,
  ZoomIn,
  Move,
  Sparkles,
  Camera,
  CheckCircle2,
  RefreshCw,
  Check
} from 'lucide-react';

type TemplateId = 'emerald' | 'azure' | 'heritage';

interface TemplateConfig {
  id: TemplateId;
  name: string;
  badge: string;
  canvasWidth: number;
  canvasHeight: number;
  frameCx: number;
  frameCy: number;
  frameR: number;
  templateSrc: string;
  aspectClass: string;
}

const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Grand 🌟',
    badge: 'എമറാൾഡ് ഗ്രാൻഡ് (ഞാനും ഉണ്ടാകും)',
    canvasWidth: 1055,
    canvasHeight: 1491,
    frameCx: 525,
    frameCy: 1045,
    frameR: 184,
    templateSrc: '/bairuha/bairuha5.png',
    aspectClass: 'aspect-[1055/1491]',
  },
  azure: {
    id: 'azure',
    name: 'Royal Teal 🌊',
    badge: 'റോയൽ ടീൽ (ഞാനും ഉണ്ടാകും)',
    canvasWidth: 1055,
    canvasHeight: 1491,
    frameCx: 523,
    frameCy: 1026,
    frameR: 183,
    templateSrc: '/bairuha/bairuha4.png',
    aspectClass: 'aspect-[1055/1491]',
  },
  heritage: {
    id: 'heritage',
    name: 'Golden Heritage ✨',
    badge: 'ഗോൾഡൻ ഹെറിറ്റേജ് (ഞാനും ഉണ്ടാകും)',
    canvasWidth: 1145,
    canvasHeight: 1374,
    frameCx: 324,
    frameCy: 801,
    frameR: 254,
    templateSrc: '/bairuha/bairuha3.png',
    aspectClass: 'aspect-[1145/1374]',
  },
};

export default function PosterMaker() {
  // Active Template (Default: Emerald Grand)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('emerald');
  const currentTemplate = TEMPLATES[selectedTemplate];

  // User input state
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [userName, setUserName] = useState('');

  // Transform controls
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Pinch-to-zoom state on mobile
  const [pinchDistance, setPinchDistance] = useState<number | null>(null);

  // Status
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emeraldLoaded, setEmeraldLoaded] = useState(false);
  const [azureLoaded, setAzureLoaded] = useState(false);
  const [heritageLoaded, setHeritageLoaded] = useState(false);

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emeraldImgRef = useRef<HTMLImageElement | null>(null);
  const azureImgRef = useRef<HTMLImageElement | null>(null);
  const heritageImgRef = useRef<HTMLImageElement | null>(null);

  // Preload Emerald Grand template (bairuha5.png)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = TEMPLATES.emerald.templateSrc;
    img.onload = () => {
      emeraldImgRef.current = img;
      setEmeraldLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load Emerald template');
    };
  }, []);

  // Preload Royal Teal template (bairuha4.png)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = TEMPLATES.azure.templateSrc;
    img.onload = () => {
      azureImgRef.current = img;
      setAzureLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load Royal Teal template');
    };
  }, []);

  // Preload Golden Heritage template (bairuha3.png)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = TEMPLATES.heritage.templateSrc;
    img.onload = () => {
      heritageImgRef.current = img;
      setHeritageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load Golden Heritage template');
    };
  }, []);

  const isTemplateReady =
    selectedTemplate === 'emerald'
      ? emeraldLoaded
      : selectedTemplate === 'azure'
      ? azureLoaded
      : heritageLoaded;

  // Handle Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        setZoom(1.0);
        setRotation(0);
        setPan({ x: 0, y: 0 });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Render canvas
  const renderPoster = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const bgImg =
      selectedTemplate === 'emerald'
        ? emeraldImgRef.current
        : selectedTemplate === 'azure'
        ? azureImgRef.current
        : heritageImgRef.current;
    if (!bgImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { canvasWidth, canvasHeight, frameCx, frameCy, frameR } = currentTemplate;

    // Set canvas dimensions to exact template resolution
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 1. Draw base template poster
    ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);

    // 2. Render photo inside circular frame (or fallback invitation emblem)
    if (userImage) {
      ctx.save();
      // Clip inside circular frame
      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Clean white backing
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(frameCx - frameR, frameCy - frameR, frameR * 2, frameR * 2);

      // User image transformation
      ctx.translate(frameCx + pan.x, frameCy + pan.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Fit photo to circle
      const minDim = Math.min(userImage.width, userImage.height);
      const scaleToFit = (frameR * 2) / minDim;
      const drawW = userImage.width * scaleToFit;
      const drawH = userImage.height * scaleToFit;

      ctx.drawImage(userImage, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Refined inner gold border ring for flawless transition
      ctx.save();
      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR - 1, 0, Math.PI * 2, false);
      ctx.strokeStyle = 'rgba(205, 161, 66, 0.5)';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    } else {
      // Fallback invitation text inside circle when no photo attached
      ctx.save();
      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = '#f0fdf4';
      ctx.fill();

      // Inner concentric rings
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR - 12, 0, Math.PI * 2, true);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (selectedTemplate === 'heritage') {
        ctx.font = 'bold 34px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#065f46';
        ctx.fillText('ഏവർക്കും', frameCx, frameCy - 55);

        ctx.font = 'bold 38px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#b45309';
        ctx.fillText('ഹൃദ്യമായ', frameCx, frameCy);

        ctx.font = 'bold 42px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#065f46';
        ctx.fillText('സ്വാഗതം', frameCx, frameCy + 55);
      } else {
        ctx.font = 'bold 28px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#065f46';
        ctx.fillText('ഏവർക്കും', frameCx, frameCy - 45);

        ctx.font = 'bold 32px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#b45309';
        ctx.fillText('ഹൃദ്യമായ', frameCx, frameCy);

        ctx.font = 'bold 36px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#065f46';
        ctx.fillText('സ്വാഗതം', frameCx, frameCy + 45);
      }
      ctx.restore();
    }

    // Outer framing concentric borders
    ctx.save();
    if (selectedTemplate === 'azure') {
      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR + 1, 0, Math.PI * 2, false);
      ctx.strokeStyle = '#024b52';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR + 4, 0, Math.PI * 2, false);
      ctx.strokeStyle = '#e58007';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR + 1, 0, Math.PI * 2, false);
      ctx.strokeStyle = '#003624';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(frameCx, frameCy, frameR + 4, 0, Math.PI * 2, false);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();

    // 3. Render Attendee Name
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const displayName = userName.trim();

    if (displayName) {
      if (selectedTemplate === 'azure') {
        // Royal Teal template (bairuha4.png)
        ctx.font = '800 44px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#024b52';
        ctx.fillText(displayName, canvasWidth / 2, 1400);
      } else if (selectedTemplate === 'emerald') {
        // Emerald Grand template (bairuha5.png)
        ctx.font = '800 44px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#003624';
        ctx.fillText(displayName, canvasWidth / 2, 1395);
      } else {
        // Golden Heritage template (bairuha3.png)
        ctx.font = '800 48px "Anek Malayalam", "Manjari", sans-serif';
        ctx.fillStyle = '#003624';
        ctx.fillText(displayName, canvasWidth / 2, 1250);
      }
    }

    ctx.restore();
  }, [selectedTemplate, currentTemplate, userImage, userName, zoom, rotation, pan]);

  // Re-render whenever properties change or template finishes loading
  useEffect(() => {
    if (isTemplateReady) {
      renderPoster();
    }
  }, [isTemplateReady, renderPoster]);

  // Transform canvas mouse coordinates
  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = currentTemplate.canvasWidth / rect.width;
    const scaleY = currentTemplate.canvasHeight / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!userImage) {
      fileInputRef.current?.click();
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) {
      fileInputRef.current?.click();
      return;
    }
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) return;
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && pinchDistance !== null) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = newDist / pinchDistance;
      setZoom((prev) => Math.min(3.0, Math.max(0.5, prev * factor)));
      setPinchDistance(newDist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setPinchDistance(null);
  };

  // Download high-resolution poster
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    setTimeout(() => {
      try {
        const link = document.createElement('a');
        const prefix =
          selectedTemplate === 'emerald'
            ? 'Bairuha_Emerald'
            : selectedTemplate === 'azure'
            ? 'Bairuha_Royal_Teal'
            : 'Bairuha_Golden_Heritage';
        const fileName = userName.trim()
          ? `${prefix}_${userName.trim().replace(/\s+/g, '_')}.png`
          : `${prefix}_Campaign_Poster.png`;
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Celebratory confetti animation
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#10b981', '#f59e0b', '#047857', '#fbbf24'],
        });

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } catch (err) {
        console.error('Download failed:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 100);
  };

  // WhatsApp Share State & Handler
  const [shareUrl, setShareUrl] = useState('https://bairuha-2k26.vercel.app/');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href) {
      setShareUrl(window.location.href);
    }
  }, []);

  const whatsappShareText = useMemo(() => {
    return encodeURIComponent(
      `മദീനത്തുല് ഇല്മ് ദർസ് - മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ (2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM).\n\nനിങ്ങളുടെ ഫോട്ടോയും പേരും ചേർത്തുള്ള ഒഫീഷ്യൽ പോസ്റ്റർ തയ്യാറാക്കൂ:\n${shareUrl}`
    );
  }, [shareUrl]);

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = typeof window !== 'undefined' && window.location.href ? window.location.href : shareUrl;
    const message = `മദീനത്തുല് ഇല്മ് ദർസ് - മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ (2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM).\n\nനിങ്ങളുടെ ഫോട്ടോയും പേരും ചേർത്തുള്ള ഒഫീഷ്യൽ പോസ്റ്റർ തയ്യാറാക്കൂ:\n${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Dynamic hotspot style on the poster circle
  const hotspotStyle = useMemo(() => {
    const { canvasWidth, canvasHeight, frameCx, frameCy, frameR } = currentTemplate;
    return {
      left: `${(frameCx / canvasWidth) * 100}%`,
      top: `${(frameCy / canvasHeight) * 100}%`,
      width: `${((frameR * 2) / canvasWidth) * 100}%`,
      height: `${((frameR * 2) / canvasHeight) * 100}%`,
      transform: 'translate(-50%, -50%)',
    };
  }, [currentTemplate]);

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="photo-upload-bairuha"
      />

      <div className="space-y-4 sm:space-y-6">
        
        {/* In-Page Template Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-semibold self-start sm:self-auto">
            <span>ഡിസൈൻ തിരഞ്ഞെടുക്കുക:</span>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-200/90 backdrop-blur-md border border-slate-300 shadow-sm self-stretch sm:self-auto justify-center overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedTemplate('emerald')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTemplate === 'emerald'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>Emerald Grand 🌟</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTemplate('azure')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTemplate === 'azure'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>Royal Teal 🌊</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTemplate('heritage')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTemplate === 'heritage'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>Golden Heritage ✨</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide border border-emerald-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            സെപ്റ്റംബർ 17, വ്യാഴം 4 PM • {currentTemplate.badge}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ്{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
              പോസ്റ്റർ തയ്യാറാക്കൂ
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            പോസ്റ്ററിലെ വട്ടത്തിൽ തൊട്ട് ഫോട്ടോ മാറ്റാം. താഴെ പേര് നൽകി ഉടൻ ഡൗൺലോഡ് ചെയ്യാം.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* POSTER CANVAS (TOP on Mobile, RIGHT on Desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl border bg-white border-slate-200 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Poster Preview ({currentTemplate.name})
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {userImage ? 'ഫോട്ടോ ഡ്രാഗ് ചെയ്യാം / സൂം ചെയ്യാം' : 'വട്ടത്തിൽ തൊട്ട് ഫോട്ടോ ചേർക്കാം'}
                </span>
              </div>

              {/* Interactive Canvas Viewport */}
              <div
                ref={canvasContainerRef}
                className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-1 sm:p-3 transition-all select-none bg-slate-100"
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`w-full max-w-[460px] h-auto ${currentTemplate.aspectClass} rounded-lg sm:rounded-xl shadow-lg transition-transform ${
                    userImage ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                  }`}
                  style={{ touchAction: 'none' }}
                />

                {/* Hotspot indicator over circle when no image uploaded */}
                {!userImage && isTemplateReady && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={hotspotStyle}
                    className="absolute rounded-full border-2 border-dashed border-emerald-500/80 bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group z-10"
                    title="ക്ലിക്ക് ചെയ്ത് ഫോട്ടോ തിരഞ്ഞെടുക്കുക"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 shadow-md text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                      ഫോട്ടോ ചേർക്കുക
                    </span>
                  </button>
                )}

                {/* Quick Floating Download Button on Poster Canvas */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
                  title="പോസ്റ്റർ ഉടൻ ഡൗൺലോഡ് ചെയ്യുക"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ഡൗൺലോഡ്</span>
                </button>
              </div>

              {/* Guarantees Badge */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>✓ വാട്ടർമാർക്കുകളില്ല</span>
                <span>✓ 100% സൗജന്യം</span>
                <span>✓ സ്വകാര്യം (On Device)</span>
              </div>
            </div>
          </div>

          {/* CONTROLS COLUMN (Step 1 Name & Step 2 Photo) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
            
            {/* STEP 1: Enter Name (First & Prominent) */}
            <div className="p-4 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2 mb-3 text-slate-900">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                നിങ്ങളുടെ പേര് നൽകുക (Enter Name)
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  പേര് (Your Name)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="ഉദാ: അബ്ദുല്ല ഹാജി / Muhammed Ali"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-white"
                />
                <p className="text-[11px] text-emerald-700 mt-1.5 font-semibold">
                  ⚡ ടൈപ്പ് ചെയ്യുമ്പോൾ തന്നെ മുകളിലെ പോസ്റ്ററിൽ പേര് പ്രത്യക്ഷപ്പെടും.
                </p>
              </div>
            </div>

            {/* STEP 2: Photo Selection & Adjustments */}
            <div className="p-4 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  ഫോട്ടോ ക്രമീകരണം (Photo)
                </h2>
                {userImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setUserImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-rose-500 hover:text-rose-600 text-xs font-medium cursor-pointer"
                  >
                    മാറ്റുക (Remove)
                  </button>
                )}
              </div>

              {userImage ? (
                /* When photo is selected: Zoom, Rotate & Reset */
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                        വലുപ്പം (Zoom): {Math.round(zoom * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setZoom(1.0);
                          setRotation(0);
                          setPan({ x: 0, y: 0 });
                        }}
                        className="text-[10px] text-slate-500 hover:text-slate-700 flex items-center gap-0.5 cursor-pointer font-semibold"
                      >
                        <RefreshCw className="w-3 h-3" /> റീസെറ്റ്
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setRotation((prev) => (prev + 90) % 360)}
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      തിരിക്കുക ({rotation}°)
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      മറ്റൊരു ഫോട്ടോ
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <Move className="w-3.5 h-3.5 text-slate-400" />
                    പോസ്റ്ററിലെ ഫോട്ടോയിൽ വിരലമർത്തി നീക്കി അഡ്ജസ്റ്റ് ചെയ്യാം.
                  </p>
                </div>
              ) : (
                /* When no photo: Big clickable upload dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-5 text-center cursor-pointer transition-all hover:bg-emerald-50/50 group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                    + ഗാലറിയിൽ നിന്നോ ക്യാമറയിൽ നിന്നോ തിരഞ്ഞെടുക്കുക
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    (പോസ്റ്ററിലെ വട്ടത്തിൽ നേരിട്ട് തൊട്ടും ഫോട്ടോ നൽകാം)
                  </p>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS: Download HD & Share on WhatsApp */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    തയ്യാറാക്കുന്നു...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    പോസ്റ്റർ ഡൗൺലോഡ് ചെയ്യുക (Download HD)
                  </>
                )}
              </button>

              {downloadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  പോസ്റ്റർ വിജയകരമായി ഡൗൺലോഡ് ചെയ്തു!
                </div>
              )}

              <a
                href={`https://api.whatsapp.com/send?text=${whatsappShareText}`}
                onClick={handleWhatsAppShare}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-100/70 hover:bg-emerald-100 border border-emerald-300 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                കൂട്ടുകാർക്ക് പങ്കുവെക്കുക (Share on WhatsApp)
              </a>
            </div>

            {/* Program Details Card */}
            <div className="p-4 rounded-2xl border bg-white border-slate-200 shadow-sm space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                പരിപാടിയെക്കുറിച്ച് (Program Details):
              </h3>
              <ul className="text-xs space-y-1.5 text-slate-700 font-medium">
                <li>• <strong>പരിപാടി:</strong> മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ</li>
                <li>• <strong>തിയ്യതി & സമയം:</strong> 2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM</li>
                <li>• <strong>വേദി:</strong> ഖൈമ അബൂത്വല്ഹ, SKY LINE BANQUETS ചെർക്കള</li>
                <li>• <strong>സംഘാടനം:</strong> മദീനത്തുല് ഇല്മ് ദർസ്</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
