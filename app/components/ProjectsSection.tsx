"use client";

import { useState } from "react";
import Image from "next/image";
import Dialog from "./Dialog";
import {
  PROJECT_VI00, PROJECT_VI01, PROJECT_VI02, PROJECT_VI03, PROJECT_VI04,
  PROJECT_VI05, PROJECT_VI06, PROJECT_VI07, PROJECT_VI08, PROJECT_VI09,
  MAIN, MAIN_08, MAIN_02, outfit, instrument,
} from "./assets";

interface Project {
  img: string;
  images: string[];
  badge: string;
  title: string;
  desc: string;
  locationFull: string;
  area: string;
  terrain: string;
}

const projects: Project[] = [
  {
    img: PROJECT_VI00,
    images: [
      "/images/projects/vi00/vi00-la-deseada.png",
      "/images/projects/vi00/D1.jpeg",
      "/images/projects/vi00/D3.jpeg",
      "/images/projects/vi00/D4.jpeg",
      "/images/projects/vi00/IMG_1876.jpg",
      "/images/projects/vi00/IMG_1877.jpg",
      "/images/projects/vi00/IMG_1878.jpg",
      "/images/projects/vi00/PA%20D1-web.jpg",
      "/images/projects/vi00/PB%20D1-web.jpg",
    ],
    badge: "Vivienda La Deseada | 2027",
    title: "Vivienda La Deseada",
    desc: "Terreno de 1.200 m². Construcción de 370 m² cubiertos.",
    locationFull: "Country La Deseada, Córdoba, Argentina · 2027",
    area: "370 m² cubiertos",
    terrain: "1.200 m²",
  },
  {
    img: PROJECT_VI01,
    images: [
      "/images/projects/vi01/vi01-manantiales.png",
      "/images/projects/vi01/IMG_5565-web.jpg",
      "/images/projects/vi01/IMG_5592-web.jpg",
      "/images/projects/vi01/IMG_5694-web.jpg",
      "/images/projects/vi01/IMG_5700-web.jpg",
      "/images/projects/vi01/IMG_5701-web.jpg",
      "/images/projects/vi01/IMG_5723-web.jpg",
      "/images/projects/vi01/IMG_5729-web.jpg",
      "/images/projects/vi01/IMG_5747-web.jpg",
      "/images/projects/vi01/IMG_5794-web.jpg",
      "/images/projects/vi01/IMG_5803-web.jpg",
      "/images/projects/vi01/IMG_6914-web.jpg",
      "/images/projects/vi01/IMG_6933-web.jpg",
      "/images/projects/vi01/IMG_6977-web.jpg",
      "/images/projects/vi01/IMG_6980-web.jpg",
      "/images/projects/vi01/IMG_6984-web.jpg",
      "/images/projects/vi01/IMG_6997-web.jpg",
      "/images/projects/vi01/IMG_6998-web.jpg",
      "/images/projects/vi01/IMG_7004-web.jpg",
      "/images/projects/vi01/IMG_7005-web.jpg",
      "/images/projects/vi01/IMG_7109-web.jpg",
      "/images/projects/vi01/IMG_7143-web.jpg",
      "/images/projects/vi01/IMG_7147-web.jpg",
      "/images/projects/vi01/IMG_7173-web.jpg",
      "/images/projects/vi01/IMG_7178-web.jpg",
      "/images/projects/vi01/M1-web.jpg",
      "/images/projects/vi01/M10-web.jpg",
      "/images/projects/vi01/M11-web.jpg",
      "/images/projects/vi01/M12-web.jpg",
      "/images/projects/vi01/M13-web.jpg",
      "/images/projects/vi01/M14-web.jpg",
      "/images/projects/vi01/M15-web.jpg",
      "/images/projects/vi01/M2-web.jpg",
      "/images/projects/vi01/M3-web.jpg",
      "/images/projects/vi01/M4-web.jpg",
      "/images/projects/vi01/M5-web.jpg",
      "/images/projects/vi01/M6-web.jpg",
      "/images/projects/vi01/M7-web.jpg",
      "/images/projects/vi01/M8-web.jpg",
      "/images/projects/vi01/M9-web.jpg",
      "/images/projects/vi01/PA%20MM2-web.jpg",
      "/images/projects/vi01/PB%20MM2-web.jpg",
      "/images/projects/vi01/VIVIENDA%20MANANTIALES%2012-web.jpg",
      "/images/projects/vi01/VIVIENDA%20MANANTIALES%2013-web.jpg",
    ],
    badge: "Vivienda Manantiales | 2025",
    title: "Vivienda Manantiales",
    desc: "Terreno de 260 m². Construcción de 260 m² cubiertos.",
    locationFull: "Manantiales, Córdoba, Argentina · 2025",
    area: "260 m² cubiertos",
    terrain: "260 m²",
  },
  {
    img: PROJECT_VI09,
    images: [
      "/images/projects/vi09/vi09-terron-golf.png",
      "/images/projects/vi09/310484AA-2E1F-4540-A738-6CF29055862A-web.jpg",
      "/images/projects/vi09/433810F9-C20D-4464-8DEE-7B6721BDC5C2-web.jpg",
      "/images/projects/vi09/5F6CF48F-6A11-4228-913C-E87FFAF755DE-web.jpg",
      "/images/projects/vi09/8497242A-6EF2-44A4-A162-0A2A2AAC1C50-web.jpg",
      "/images/projects/vi09/9661166D-51E0-4CCF-A190-FE7598DC57F4-web.jpg",
      "/images/projects/vi09/D343210F-5186-440F-8C23-5EECE334DA95-web.jpg",
      "/images/projects/vi09/DCTF6626.JPG",
      "/images/projects/vi09/DLOF4265-web.jpg",
      "/images/projects/vi09/GHCY5371-web.jpg",
      "/images/projects/vi09/GXOR5072-web.jpg",
      "/images/projects/vi09/IMG_8915.jpeg",
      "/images/projects/vi09/IMG_9059.jpeg",
      "/images/projects/vi09/IMG_9081.jpeg",
      "/images/projects/vi09/IMG_9083.jpeg",
      "/images/projects/vi09/IMG_9480.jpeg",
      "/images/projects/vi09/IMG_9485.jpeg",
      "/images/projects/vi09/IMG_9490.jpeg",
      "/images/projects/vi09/MORL2956.JPG",
      "/images/projects/vi09/NUPO7509-web.jpg",
      "/images/projects/vi09/PA%20VC-web.jpg",
      "/images/projects/vi09/PB%20VC-web.jpg",
      "/images/projects/vi09/PRGO3537-web.jpg",
      "/images/projects/vi09/T10.jpeg",
      "/images/projects/vi09/T11.jpeg",
      "/images/projects/vi09/T12.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%201.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%2010.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%2011.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%2016-web.jpg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%202.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%203.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%204.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%205.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%207.jpeg",
      "/images/projects/vi09/VIVIENDA%20EL%20TERRON%208.jpeg",
      "/images/projects/vi09/WAYG2005-web.jpg",
    ],
    badge: "Vivienda Country El Terrón Golf | 2025",
    title: "Vivienda Country El Terrón Golf",
    desc: "Terreno de 400 m². Construcción de 1.000 m² cubiertos.",
    locationFull: "Country El Terrón Golf, Mendiolaza, Córdoba, Argentina · 2025",
    area: "1.000 m² cubiertos",
    terrain: "400 m²",
  },
  {
    img: PROJECT_VI02,
    images: [
      "/images/projects/vi02/vi02-duplex-manantiales.png",
      "/images/projects/vi02/DUPLEXS%20MANANTIALES%201-web.jpg",
      "/images/projects/vi02/DUPLEXS%20MANANTIALES%202-web.jpg",
      "/images/projects/vi02/DUPLEXS%20MANANTIALES%203-web.jpg",
      "/images/projects/vi02/DUPLEXS%20MANANTIALES%204-web.jpg",
      "/images/projects/vi02/M1-web.jpg",
      "/images/projects/vi02/M2-web.jpg",
      "/images/projects/vi02/M3-web.jpg",
      "/images/projects/vi02/M4-web.jpg",
      "/images/projects/vi02/M5-web.jpg",
      "/images/projects/vi02/PA%20DPX-web.jpg",
      "/images/projects/vi02/PB%20DPX-web.jpg",
    ],
    badge: "Duplex Manantiales | 2020",
    title: "Duplex Manantiales",
    desc: "Terreno de 260 m². Construcción de 260 m² cubiertos.",
    locationFull: "Manantiales, Córdoba, Argentina · 2020",
    area: "260 m² cubiertos",
    terrain: "260 m²",
  },
  {
    img: PROJECT_VI03,
    images: [
      "/images/projects/vi03/vi03-la-cuesta.png",
      "/images/projects/vi03/LC1.jpeg",
      "/images/projects/vi03/LC2.jpeg",
      "/images/projects/vi03/LC3.jpeg",
      "/images/projects/vi03/LC4-web.jpg",
      "/images/projects/vi03/LC5-web.jpg",
      "/images/projects/vi03/LC6-web.jpg",
      "/images/projects/vi03/LC7-web.jpg",
      "/images/projects/vi03/LC8-web.jpg",
      "/images/projects/vi03/LC9-web.jpg",
      "/images/projects/vi03/VIVIENDA%20LA%20CUESTA%204.jpeg",
      "/images/projects/vi03/VIVIENDA%20LA%20CUESTA%205.jpeg",
      "/images/projects/vi03/VIVIENDA%20LA%20CUESTA%206.jpeg",
    ],
    badge: "Vivienda La Cuesta | 2026",
    title: "Vivienda La Cuesta",
    desc: "Terreno de 1.200 m². Construcción de 280 m² cubiertos.",
    locationFull: "Country La Cuesta, Córdoba, Argentina · 2026",
    area: "280 m² cubiertos",
    terrain: "1.200 m²",
  },
  {
    img: PROJECT_VI04,
    images: [
      "/images/projects/vi04/vi04-recoleta.png",
      "/images/projects/vi04/image0-web.jpg",
      "/images/projects/vi04/IMG_2411.WEBP",
      "/images/projects/vi04/IMG_2412.WEBP",
      "/images/projects/vi04/IMG_2413.WEBP",
      "/images/projects/vi04/IMG_2414.WEBP",
      "/images/projects/vi04/IMG_2415.WEBP",
      "/images/projects/vi04/IMG_2416.WEBP",
      "/images/projects/vi04/IMG_2417.WEBP",
      "/images/projects/vi04/IMG_2419.WEBP",
      "/images/projects/vi04/IMG_2420.WEBP",
      "/images/projects/vi04/IMG_2427.JPG",
      "/images/projects/vi04/IMG_2428.JPG",
      "/images/projects/vi04/IMG_2429.JPG",
      "/images/projects/vi04/IMG_2431.JPG",
      "/images/projects/vi04/IMG_2432.JPG",
      "/images/projects/vi04/IMG_2433.JPG",
      "/images/projects/vi04/IMG_2434.JPG",
    ],
    badge: "Departamento Recoleta | 2022",
    title: "Departamento Recoleta",
    desc: "Construcción de 250 m² cubiertos.",
    locationFull: "Recoleta, Capital Federal, Bs As, Argentina · 2022",
    area: "250 m² cubiertos",
    terrain: "—",
  },
  {
    img: PROJECT_VI05,
    images: [
      "/images/projects/vi05/vi05-claros-del-bosque.png",
      "/images/projects/vi05/D1.jpg",
      "/images/projects/vi05/LIVING%201.jpeg",
      "/images/projects/vi05/LIVING%2014.jpeg",
      "/images/projects/vi05/LIVING%2015.jpeg",
      "/images/projects/vi05/LIVING%202.jpeg",
      "/images/projects/vi05/SUITE%2002.jpg",
      "/images/projects/vi05/V1.jpg",
    ],
    badge: "Vivienda Claros del Bosque | 2025",
    title: "Vivienda Country Claros del Bosque",
    desc: "Terreno de 360 m². Construcción de 200 m² cubiertos.",
    locationFull: "Country Claros del Bosque, Córdoba, Argentina · 2025",
    area: "200 m² cubiertos",
    terrain: "360 m²",
  },
  {
    img: PROJECT_VI06,
    images: [
      "/images/projects/vi06/vi06-estancia-q2.png",
      "/images/projects/vi06/1D23B3BB-51EC-4249-BE2E-558A3D49857F-web.jpg",
      "/images/projects/vi06/A40CD30A-7CE0-4870-8969-A464465205B4-web.jpg",
      "/images/projects/vi06/C730B748-78B7-415E-9CDA-646A71BAD4D9-web.jpg",
      "/images/projects/vi06/DAA2EA94-F57F-4277-BB71-E2FD7EB5D0F9-web.jpg",
      "/images/projects/vi06/DE23642C-D458-4E90-B2D1-C65B3ABABB07-web.jpg",
      "/images/projects/vi06/PAQ2-web.jpg",
      "/images/projects/vi06/PBQ2-web.jpg",
    ],
    badge: "Vivienda Estancia Q2 | 2028",
    title: "Vivienda Estancia Q2",
    desc: "Terreno de 1.300 m². Construcción de 300 m² cubiertos.",
    locationFull: "Country Estancia Q2, Mendiolaza, Argentina · 2028",
    area: "300 m² cubiertos",
    terrain: "1.300 m²",
  },
  {
    img: PROJECT_VI07,
    images: [
      "/images/projects/vi07/vi07-santina-norte.png",
      "/images/projects/vi07/SN-1.jpeg",
      "/images/projects/vi07/SN-2.jpeg",
      "/images/projects/vi07/SN3.jpeg",
      "/images/projects/vi07/SN7.jpeg",
    ],
    badge: "Vivienda Santina Norte | 2024",
    title: "Vivienda Santina Norte",
    desc: "Terreno de 600 m². Construcción de 250 m² cubiertos.",
    locationFull: "Country Santina Norte, Cordoba, Argentina · 2024",
    area: "250 m² cubiertos",
    terrain: "600 m²",
  },
  {
    img: PROJECT_VI08,
    images: [
      "/images/projects/vi08/vi08-valle-escondido.png",
      "/images/projects/vi08/IMG_1958.JPG",
      "/images/projects/vi08/IMG_1959.JPG",
      "/images/projects/vi08/VA1-web.jpg",
      "/images/projects/vi08/VA2-web.jpg",
      "/images/projects/vi08/VA3-web.jpg",
      "/images/projects/vi08/VA4-web.jpg",
      "/images/projects/vi08/VA5-web.jpg",
      "/images/projects/vi08/VA6-web.jpg",
    ],
    badge: "Vivienda Valle Escondido | 2028",
    title: "Vivienda Valle Escondido",
    desc: "Terreno de 600 m². Construcción de 300 m² cubiertos.",
    locationFull: "Valle Escondido, Córdoba, Argentina · 2028",
    area: "300 m² cubiertos",
    terrain: "600 m²",
  },
];

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="proyectos" className="flex flex-col gap-8 lg:gap-12 px-5 md:px-10 lg:px-20 py-12 lg:py-24" style={{ backgroundColor: "rgba(4,35,58,0.05)" }}>
      <div className="flex flex-col gap-3">
        <h2 className="text-[36px] font-extrabold" style={{ ...outfit, color: MAIN_08 }}>Proyectos</h2>
        <div className="w-20 h-1 rounded-full" style={{ backgroundColor: MAIN }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((project) => (
          <button
            key={project.title}
            onClick={() => { setActive(project); setCarouselIndex(0); }}
            className="flex flex-col gap-4 text-left group"
          >
            <div className="relative h-[380px] rounded-2xl overflow-hidden">
              <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: "rgba(4,35,58,0.4)" }} />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md" style={{ ...instrument, color: MAIN_08 }}>
                  {project.badge}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold" style={{ ...outfit, color: MAIN_08 }}>{project.title}</p>
              <p className="text-[13px] font-normal opacity-65" style={{ ...instrument, color: MAIN_08 }}>{project.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            if (showAll) {
              setShowAll(false);
              document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
            } else {
              setShowAll(true);
            }
          }}
          className="flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold text-white"
          style={{ ...instrument, backgroundColor: MAIN }}
        >
          {showAll ? "Ver menos proyectos" : "Ver más proyectos"}
        </button>
      </div>

      <Dialog open={!!active} onClose={() => { setActive(null); setCarouselIndex(0); }}>
        {active && (
          <div className="flex flex-col lg:flex-row lg:h-[680px]">
            <div className="flex flex-col gap-4 lg:gap-6 p-6 lg:p-10 lg:shrink-0 lg:w-[520px] h-[220px] lg:h-full" style={{ backgroundColor: "rgba(4,35,58,0.1)" }}>
              <div className="relative flex-1 rounded-2xl overflow-hidden min-h-0">
                <Image src={active.images[carouselIndex]} alt={active.title} fill className="object-cover" />
                {active.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCarouselIndex(i => (i - 1 + active.images.length) % active.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-xl font-bold shadow"
                      style={{ backgroundColor: "rgba(255,255,255,0.85)", color: MAIN }}
                      aria-label="Anterior"
                    >&#8249;</button>
                    <button
                      onClick={() => setCarouselIndex(i => (i + 1) % active.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-xl font-bold shadow"
                      style={{ backgroundColor: "rgba(255,255,255,0.85)", color: MAIN }}
                      aria-label="Siguiente"
                    >&#8250;</button>
                    <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "#fff" }}>
                      {carouselIndex + 1} / {active.images.length}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col p-6 lg:p-12 lg:w-[520px] overflow-y-auto">
              <div className="flex items-center justify-between pb-5">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ ...instrument, backgroundColor: "rgba(4,35,58,0.1)", color: MAIN }}>
                  {active.locationFull}
                </span>
                <button
                  onClick={() => { setActive(null); setCarouselIndex(0); }}
                  className="flex items-center justify-center w-8 h-8 rounded-2xl text-base leading-none"
                  style={{ backgroundColor: "#f6f6f6", color: MAIN_08 }}
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>
              <p className="text-[32px] font-extrabold mb-3" style={{ ...outfit, color: "#2c2c2a" }}>
                {active.title}
              </p>
              <div className="flex flex-col gap-3">
                {active.terrain !== "—" && (
                  <div className="flex flex-col gap-1 p-4 rounded-xl" style={{ backgroundColor: "#f6f6f6", border: "1px solid #ece7e0" }}>
                    <p className="text-xs uppercase" style={{ ...instrument, color: "rgba(44,44,42,0.6)" }}>Terreno</p>
                    <p className="text-base font-bold" style={{ ...outfit, color: "#2c2c2a" }}>{active.terrain}</p>
                  </div>
                )}
                <div className="flex flex-col gap-1 p-4 rounded-xl" style={{ backgroundColor: "#f6f6f6", border: "1px solid #ece7e0" }}>
                  <p className="text-xs uppercase" style={{ ...instrument, color: "rgba(44,44,42,0.6)" }}>Construcción</p>
                  <p className="text-base font-bold" style={{ ...outfit, color: "#2c2c2a" }}>{active.area}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
