import Image from "next/image";
import { ICON_REFRESH, ICON_LOCK, ICON_CLOCK, ICON_ROCKET, ICON_USER, ICON_KEY, MAIN, MAIN_08, MAIN_02, MAIN_005, outfit, instrument } from "./assets";

const guarantees = [
  { icon: ICON_REFRESH, title: "Revisiones Ilimitadas", desc: "Nos tomamos el tiempo de hacer las revisiones necesarias con vos hasta llegar a la propuesta ideal." },
  { icon: ICON_LOCK, title: "Cuidamos tu inversión", desc: "Diseñamos tu proyecto pensado, exclusivamente en optimizar los costos y maximizar el valor de reventa por su diseño y funcionalidad, generando un margen de ganancia." },
  { icon: ICON_CLOCK, title: "Respetamos los plazos", desc: "Entendemos que el tiempo es una prioridad para cualquier inversor, por eso te mostramos exactamente cuánto vas a invertir y cómo se mueve el flujo de caja mes a mes hasta llegar a la fecha de entrega acordada." },
  { icon: ICON_ROCKET, title: "Primeros resultados en 15 días", desc: "Sabemos que quieres avanzar rápido. Por eso, en dos semanas tendrás las primeras propuestas visuales de tu proyecto." },
  { icon: ICON_USER, title: "Trato 1 a 1 con el director general", desc: "Entendemos que tu próxima inversión no es un proyecto más. Por esta razón, te garantizamos un trato personalizado que priorice tu proyecto, tus tiempos y tu inversión." },
  { icon: ICON_KEY, title: "Diseño y construcción llave en mano", desc: "Nos encargamos de todo para que no tengas que preocuparte por nada, desde el diseño de la vivienda hasta el alta de los servicios y los trámites finales." },
];

export default function GuaranteesSection() {
  return (
    <section id="garantias" className="flex flex-col gap-10 lg:gap-14 px-5 md:px-10 lg:px-20 py-12 lg:py-24" style={{ backgroundColor: "rgba(4,35,58,0.05)" }}>
      <div className="flex flex-col gap-4">
        <h2 className="text-[36px] font-[800]" style={{ ...outfit, color: MAIN_08 }}>Garantías</h2>
        <div className="w-20 h-1 rounded-full" style={{ backgroundColor: MAIN }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {guarantees.map(({ icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-5 p-8 rounded-2xl border shadow-sm" style={{ backgroundColor: MAIN_005, borderColor: MAIN_02 }}>
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white">
              <Image src={icon} alt="" width={20} height={20} unoptimized />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold leading-[1.3]" style={{ ...outfit, color: MAIN_08 }}>{title}</p>
              <p className="text-[13px] font-normal leading-[1.5] opacity-80" style={{ ...instrument, color: MAIN_08 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
