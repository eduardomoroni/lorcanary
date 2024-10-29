import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/app/Navbar";
import { ThemeProvider } from "@/components/app/ThemeProvider";
import Footer from "@/components/app/Footer";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lorcanary",
  description: "Disney Lorcana TCG Card Library",
};

const AdsenseScript = () => {
  return (
    <Script
      // data-adtest="on"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7112315789769225"
      strategy="beforeInteractive"
      crossOrigin="anonymous"
    />
  );
};

function GoogleAnalytics({ measurementId = "G-7FCXZEL9ZX" }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}

// <script type="speculationrules">
//   {
//     "prerender": [
//   {
//     "where": {
//     "and": [
//   {"href_matches": "/*"},
//   {"not": {"href_matches": "/logout"}},
//   {"not": {"href_matches": "/*\\?*(^|&)add-to-cart=*"}},
//   {"not": {"selector_matches": ".no-prerender"}},
//   {"not": {"selector_matches": "[rel~=nofollow]"}}
//     ]
//   }
//   }
//     ],
//     "prefetch": [
//   {
//     "urls": ["next.html", "next2.html"],
//     "requires": ["anonymous-client-ip-when-cross-origin"],
//     "referrer_policy": "no-referrer"
//   }
//     ]
//   }
// </script>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      // https://github.com/pacocoursey/next-themes
      suppressHydrationWarning
      lang="en"
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-7112315789769225" />
        <link rel="dns-prefetch" href="https://six-inks.pages.dev" />
        <link rel="preconnect" href="https://six-inks.pages.dev" />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-yellow-200 dark:bg-gray-800 text-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <AdsenseScript />
      </body>
    </html>
  );
}
