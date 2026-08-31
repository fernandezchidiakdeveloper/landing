import Image from "next/image";
import { LOGO, MAIN, MAIN_08, instrument } from "./assets";

const navLinks = ["Inicio", "Sobre nosotros", "Garantías", "Nuestra metodología", "Proyectos"];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 md:px-10 lg:px-20 py-5 lg:py-6 h-16 lg:h-24">
      <Image src={LOGO} alt="Noelia Fernández Chidiak" width={94} height={45} className="object-contain" unoptimized />
      <nav className="flex items-center gap-4 lg:gap-10">
        <div className="hidden lg:flex gap-7 text-sm" style={{ ...instrument, color: MAIN_08 }}>
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
              className={i === 0 ? "font-medium" : "font-medium opacity-70 hover:opacity-100 transition-opacity"}
            >
              {link}
            </a>
          ))}
        </div>
        <a
          href="#contacto"
          className="flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold text-white"
          style={{ ...instrument, backgroundColor: MAIN }}
        >
          Contacto
        </a>
      </nav>
    </header>
  );
}
