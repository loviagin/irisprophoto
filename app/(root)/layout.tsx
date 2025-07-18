import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Script from "next/script";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iris PRO Photo – Art from Your Eye’s Iris",
  description: "We turn a photo of your eye’s iris into stunning artwork with effects and print it as a memorable gift. Unique, personal, and beautiful.",
  authors: [{ name: "LOVIGIN LTD", url: "https://lovigin.com" }],
  keywords: ["iris pro photo", "iris photo", "iris photography", "eye art", "iris artwork", "iris portrait", "personalized gift", "unique gift", "eye picture art", "irisprophoto", "eye print"],
  openGraph: {
    title: "Iris PRO Photo – Art from Your Eye’s Iris",
    description: "We turn a photo of your eye’s iris into stunning artwork with effects and print it as a memorable gift. Unique, personal, and beautiful.",
    images: ["/images/Galaxy 1.png"],
  },
  twitter: {  
    card: "summary_large_image",
    title: "Iris PRO Photo – Art from Your Eye’s Iris",
    description: "We turn a photo of your eye’s iris into stunning artwork with effects and print it as a memorable gift. Unique, personal, and beautiful.",
    images: ["/images/Galaxy 1.png"],
  },
  alternates: {
    canonical: "https://irisprophoto.me",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
            k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(99836759, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
            });
          `}
        </Script>
        <Script
          src="https://web.squarecdn.com/v1/square.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${nunito.className}`}>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/99836759"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Header />
        {children}
        <Footer />
      </body>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGGHDDMX');
          `,
        }}
      />
    </html>
  );
}