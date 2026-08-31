import type { Metadata } from "next";
import { Outfit, Instrument_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Arq. Noelia Fernández Chidiak",
  description: "Estudio de arquitectura en Córdoba, Argentina. Diseño y construcción de viviendas con foco en rentabilidad y calidad.",
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
