import { MAIN_08, MAIN_01, instrument } from "./assets";

const socials = [
  { label: "Linkedin",  href: "https://www.linkedin.com/in/noelia-fernandez-chidiak-6a733523/" },
  { label: "Instagram", href: "https://www.instagram.com/noeliafcarq/" },
  { label: "Facebook",  href: "https://www.facebook.com/arqnoeliafernandezchidiak" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-5 md:px-10 lg:px-20 py-8 lg:py-10 border-t text-[13px]" style={{ borderColor: MAIN_01, color: MAIN_08 }}>
      <p className="font-normal opacity-50" style={instrument}>
        © 2026 Arq. Noelia Fernández Chidiak. Todos los derechos reservados.
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1 font-medium" style={instrument}>
        <a href="tel:+5493512191137" className="opacity-60 hover:opacity-100 transition-opacity">
          Telefono
        </a>
        <a href="mailto:fernandezchidiakarq@gmail.com" className="opacity-60 hover:opacity-100 transition-opacity">
          Mail
        </a>
        {socials.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">{label}</a>
        ))}
      </div>
    </footer>
  );
}
