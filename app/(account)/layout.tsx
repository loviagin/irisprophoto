import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import Header from "./components/Header/Header";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Account | Iris PRO Photo",
  description: "We are a team of professional photographers and we are offering our services of iris photography for you. We are capturing the moments for a long time.",
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
