import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iris PRO Photo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://www.paypalobjects.com/ncp/cart/cart.js" 
          data-merchant-id="TKHPUAMG5S2WG"
        />
      </head>
      <body className={`${nunito.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}