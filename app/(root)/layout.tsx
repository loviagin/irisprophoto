import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import Header from "../components/Header/Header";

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
      <body className={`${nunito.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}