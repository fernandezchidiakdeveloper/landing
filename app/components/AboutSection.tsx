import Image from "next/image";
import { PORTRAIT, ICON_SUN, ICON_FEATHER, ICON_LAYERS, MAIN, MAIN_08, MAIN_02, MAIN_01, MAIN_005, outfit, instrument } from "./assets";

const pillars = [
  { icon: ICON_SUN, title: "Arquitectura que potencia", desc: "Creamos diseños únicos y contemporáneos que incrementan la rentabilidad de tu inversión y mejoran la calidad de vida de las personas que los habitan." },
  { icon: ICON_FEATHER, title: "Trabajo de calidad", desc: "Nos esforzamos para entregar un trabajo de alta calidad constructiva acompañado con una rigurosa metodología de trabajo que garantice el cuidado de los plazos y los costos que necesitas." },
  { icon: ICON_LAYERS, title: "Visión integral", desc: "Desde el bosquejo inicial hasta la entrega de la llave, un solo equipo coordinando todo." },
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="flex flex-col gap-10 lg:gap-14 px-5 md:px-10 lg:px-20 pt-12 lg:pt-24 pb-8 lg:pb-12 bg-white">
      {/* Portrait + bio */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-center">
        <div className="relative w-full lg:w-[480px] h-[280px] md:h-[380px] lg:h-[560px] rounded-2xl overflow-hidden lg:shrink-0">
          <Image src={PORTRAIT} alt="Arq. Noelia Fernández Chidiak" fill className="object-cover" unoptimized />
        </div>
        <div className="flex flex-col gap-14 flex-1">
          <h2 className="text-[36px] font-[800] leading-[1.25]" style={{ ...outfit, color: MAIN_08 }}>
            Sobre nosotros
          </h2>
          <div className="flex flex-col gap-10">
            <p className="text-base font-normal leading-[1.85] opacity-80" style={{ ...instrument, color: MAIN_08 }}>
              Nuestro estudio fue fundado en la Ciudad de Córdoba, Argentina, en el año 2010, por la arquitecta Noelia Fernandez Chidiak.<br/>
              Creamos proyectos que dialogan con el entorno en donde la materialidad, las formas y la luz crean una arquitectura contemporánea
              de alta calidad que protege tu capital desde el diseño. Cuidamos no solo la estética, si no que también los costos y la
              rentabilidad de nuestros proyectos. Poseemos más de 15 años de trayectoria que respaldan nuestro trabajo.
            </p>
            <div className="flex gap-6">
              {[
                { stat: "+15 Años", label: "En el área de proyecto, dirección y construcción de obra" },
                { stat: "+50 Clientes", label: "Satisfechos" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex-1 flex flex-col gap-2 p-5 rounded-xl border" style={{ backgroundColor: MAIN_005, borderColor: MAIN_02 }}>
                  <p className="text-2xl lg:text-[40px] font-extrabold leading-tight" style={{ ...outfit, color: MAIN }}>{stat}</p>
                  <p className="text-[13px] font-normal leading-[1.5] opacity-80" style={{ ...instrument, color: MAIN_08 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillar cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border" style={{ borderColor: MAIN_01 }}>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl border" style={{ backgroundColor: MAIN_005, borderColor: MAIN_02 }}>
              <Image src={icon} alt="" width={24} height={24} unoptimized />
            </div>
            <p className="text-lg font-bold" style={{ ...outfit, color: MAIN_08 }}>{title}</p>
            <p className="text-sm font-normal leading-[1.5] opacity-75" style={{ ...instrument, color: MAIN_08 }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
