import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bairuha2026.wellnoc.com'),
  title: "ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ് 2026 | ഒഫീഷ്യൽ പോസ്റ്റർ മേക്കർ",
  description: "മദീനത്തുൽ ഇൽമ് ദർസ് - മീലാദ് കോൺഫ്രൻസ് & ബൈറുഹാ ഗ്രാൻഡ് ഫിനാലെ (2026 സെപ്റ്റംബർ 17, വ്യാഴം 4 PM). നിങ്ങളുടെ ഫോട്ടോയും പേരും ചേർത്തുള്ള ഒഫീഷ്യൽ പോസ്റ്റർ തയ്യാറാക്കൂ!",
  keywords: ["Bairuha 2026", "Meelad Conference", "Madinathul Ilm Dars", "Poster Maker", "Cherkala", "ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ്"],
  openGraph: {
    title: "ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ് 2026 | ഒഫീഷ്യൽ പോസ്റ്റർ മേക്കർ",
    description: "നിങ്ങളുടെ ഫോട്ടോയും പേരും നൽകി ഒഫീഷ്യൽ ക്യാമ്പയിൻ പോസ്റ്റർ തയ്യാറാക്കൂ!",
    images: [
      {
        url: "/og-image.png",
        width: 1055,
        height: 1491,
        alt: "Bairuha Meelad Conference 2026 Poster",
      },
    ],
    locale: "ml_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ബൈറുഹാ മീലാദ് കോൺഫ്രൻസ് 2026 | ഒഫീഷ്യൽ പോസ്റ്റർ മേക്കർ",
    description: "നിങ്ങളുടെ ഫോട്ടോയും പേരും നൽകി ഒഫീഷ്യൽ ക്യാമ്പയിൻ പോസ്റ്റർ തയ്യാറാക്കൂ!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ml" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#003624" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
