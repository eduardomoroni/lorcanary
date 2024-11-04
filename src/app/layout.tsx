import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/app/Navbar";
import { ThemeProvider } from "@/components/app/ThemeProvider";
import Footer from "@/components/app/Footer";
import Script from "next/script";

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
      strategy="worker"
      crossOrigin="anonymous"
    />
  );
};

function GoogleAnalytics({ measurementId = "G-7FCXZEL9ZX" }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="worker"
      />
      <Script id="google-analytics" strategy="worker">
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="google-adsense-account" content="ca-pub-7112315789769225" />
        <link rel="dns-prefetch" href="https://six-inks.pages.dev" />
        <link rel="preconnect" href="https://six-inks.pages.dev" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistMono.variable} antialiased bg-yellow-200 dark:bg-gray-800 text-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
