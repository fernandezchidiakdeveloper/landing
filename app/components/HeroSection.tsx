import Image from "next/image";
import { HERO_BG, MAIN, MAIN_08, outfit, instrument } from "./assets";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative flex items-center px-5 md:px-10 lg:px-20 pt-10 pb-14 lg:pt-20 lg:pb-24 min-h-[400px] lg:h-[626px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover" unoptimized />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 55%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.35) 100%)" }}
        />
      </div>
      <div className="relative flex flex-col gap-8 lg:gap-16 max-w-4xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-[1.2]" style={{ ...outfit, color: MAIN_08 }}>
            Diseñamos y construimos tu vivienda<br />
            con foco en proteger tu rentabilidad a través del diseño,<br />
            cuidando los costos y los tiempos<br />
            para que tengas la claridad que necesitas.
          </h1>
          <p className="text-base lg:text-[18px] font-normal leading-relaxed opacity-80" style={{ ...instrument, color: MAIN_08 }}>
            Planificación y previsibilidad con un único responsable creativo, legal y técnico.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:gap-4">
          <a
            href="#contacto"
            className="flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold text-white"
            style={{ ...instrument, backgroundColor: MAIN }}
          >
            Evaluación inicial
          </a>
          <a
            href="#proyectos"
            className="flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold border-[1.5px]"
            style={{ ...instrument, borderColor: MAIN, color: MAIN_08 }}
          >
            Nuestros proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
