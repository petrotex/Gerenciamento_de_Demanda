import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderController } from '@/componentes/HeaderController/HeaderController'
import { FooterController } from '@/componentes/FooterController/FooterController'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EscutamAqui — Gerenciamento de Reclamações Públicas",
  description: "Faça suas reclamações aqui e veja elas serem respondidas pelo governo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
    <HeaderController />
    <main className="flex-grow">
      {children}
    </main>
    <FooterController />
  </div>
</body>
    </html>
  );
}
