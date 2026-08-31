"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import { MAIN, MAIN_08, MAIN_02, MAIN_01, MAIN_005, outfit, instrument } from "./assets";

type Stage = "proyecto" | "construccion";

interface Step {
  n: string;
  title: string;
  desc: string;
  dialogTitle: string;
  dialogDesc: string;
  keys: string[];
}

const stepsProyecto: Step[] = [
  {
    n: "00", title: "Entrevista con el cliente",
    desc: "Evaluamos las necesidades del cliente y la futura inversión",
    dialogTitle: "Entrevista con el cliente",
    dialogDesc: "Nos reunimos con el cliente para definir necesidades, intereses variables, contextuales y gustos para evaluar las alternativas reales de inversión. También efectuamos un análisis estimativo de los costos preliminares según los requerimientos de superficie del cliente en base a los precios de mercado actual.\nGarantizamos un punto de partida seguro y realista de la inversión.",
    keys: ["Estudio de requerimientos: Definición del programa de necesidades del grupo familiar.", "Costos estimativos. Análisis preliminar de costos según requerimiento de superficie cubierta de la vivienda.", "Tiempos de obra: Estimación de plazos."],
  },
  {
    n: "01", title: "Relevamiento del terreno",
    desc: "Estudio exhaustivo del terreno. Dimensiones, topografía, orientación, niveles y normativas que condicionen el diseño proyecto.",
    dialogTitle: "Relevamiento del terreno",
    dialogDesc: "Se realiza un relevamiento preliminar del terreno con el objetivo de verificar las condiciones y limitaciones de este antes de comenzar a diseñar la vivienda. Se analizan las dimensiones, los niveles, los accesos, la orientación, las características del entorno, las construcciones existentes, los servicios disponibles y cualquier otra condición limitante.",
    keys: ["Replanteo del terreno: Definición de las dimensiones reales del lote así como también la orientación del mismo.", "Análisis de las características técnicas del lote: Verificar las limitaciones constructivas como altura máxima, retiros y cualquier otra normativa que condicione el proyecto de la vivienda.", "Estudio perimetral de implantación: Análisis de condiciones existentes como la visualización de las viviendas colindantes y la evaluación de la factibilidad de los servicios."],
  },
  {
    n: "02", title: "Propuesta arquitectónica preliminar",
    desc: "Presentación de las primeras propuestas volumétricas y la evaluación preliminar de la inversión.",
    dialogTitle: "Propuesta arquitectónica preliminar",
    dialogDesc: "Desarrollo de las primeras propuestas arquitectónicas y volumétricas definidas por los criterios de diseño, distribución, materialidad e implantación que surgen de la entrevista inicial con el cliente. Esta etapa incluye una evaluación preliminar de la inversión que permite analizar la viabilidad del proyecto y orientar las decisiones antes de avanzar con el proyecto definitivo.",
    keys: ["Propuesta arquitectónica preliminar: Se presenta los planos, detalles e imágenes necesarias para visualizar las primeras definiciones de diseño, distribución y volumetría.", "Criterios estéticos e implantación: Se establecen los criterios generales de implantación, materialidad y estética general del proyecto.", "Costos preliminares: Analizamos la inversión inicial estimando preliminarmente los costos y la viabilidad económica."],
  },
  {
    n: "03", title: "Propuesta arquitectónica y legajo técnico",
    desc: "Se entrega la propuesta arquitectónica definitiva que incluye todo el conjunto de planos y estudios necesarios para la construcción de la vivienda.",
    dialogTitle: "Propuesta arquitectónica y legajo técnico",
    dialogDesc: "Desarrollo de la propuesta arquitectónica definitiva y elaboración del legajo técnico completo, integrando el conjunto de planos, detalles, especificaciones y estudios necesarios para definir técnicamente el proyecto y avanzar de manera precisa y ordenada con la construcción de la vivienda.",
    keys: ["Propuesta definitiva: Se define integralmente el diseño arquitectónico de la vivienda.", "Legajo técnico: Se ejecuta el conjunto de planos de arquitectura, de detalles, de especificaciones y toda la documentación necesaria para la construcción de la vivienda.", "Estudios preliminares: Se coordina la ejecución del cálculo estructural y el estudio de suelos para completar el legajo técnico de obra."],
  },
  {
    n: "04", title: "Aprobación de obra",
    desc: "Solicitud de los permisos de obra necesarios para construir la vivienda ante las instituciones correspondientes.",
    dialogTitle: "Aprobación de obra",
    dialogDesc: "Gestión y tramitación de los permisos y aprobaciones necesarios para la construcción de la vivienda ante los organismos e instituciones correspondientes, asegurando el cumplimiento de la normativa vigente previo al inicio de la obra.",
    keys: ["Gestión de permiso municipal: Se presenta toda la documentación necesaria en el municipio para conseguir el permiso de obra.", "Presentación ante organismos: gestión de documentación ante las instituciones correspondientes como el Colegio de Arquitectos, la Caja de Previsión de Arquitectos y el barrio privado de corresponder.", "Cumplimiento normativo: aprobación de la obra conforme a la normativa vigente."],
  },
  {
    n: "05", title: "Supervisión técnica de obra",
    desc: "Supervisión técnica de obra semanal para verificar que lo construido sea lo efectivamente proyectado y solicitado por el cliente.",
    dialogTitle: "Supervisión técnica de obra",
    dialogDesc: "Seguimiento técnico semanal de la obra para verificar la correcta ejecución de los trabajos, asegurando que lo construido responda al proyecto aprobado, la documentación técnica y los requerimientos definidos por el cliente.",
    keys: ["Supervisión semanal: seguimiento periódico de la ejecución de la obra.", "Control del proyecto: verificación de que lo construido responda a la documentación técnica.", "Cumplimiento del cliente: control de los requerimientos y decisiones acordadas."],
  },
];

const stepsConstruccion: Step[] = [
  {
    n: "00", title: "Presupuesto global y cronograma de obra",
    desc: "Análisis detallado de costos y planificación de etapas mediante Diagrama de Gantt.",
    dialogTitle: "Presupuesto global y cronograma de obra",
    dialogDesc: "Elaboración del presupuesto final de la obra, acompañado por un flujo de caja mensual y un cronograma de ejecución mediante Diagrama de Gantt. Esta documentación permite visualizar de manera clara la inversión, los plazos de obra y los desembolsos previstos mes a mes, facilitando la planificación y el control integral del proyecto.",
    keys: ["Presupuesto global: definición de la inversión final estimada para la obra.", "Cronograma de obra: planificación de etapas y plazos mediante Diagrama de Gantt.", "Flujo de caja: proyección mensual de los desembolsos durante la construcción."],
  },
  {
    n: "01", title: "Comparativas y selección de proveedores",
    desc: "Análisis de propuestas y evaluación de alternativas que optimicen costos y garanticen calidad.",
    dialogTitle: "Comparativas y selección de proveedores",
    dialogDesc: "Elaboración de comparativas de precios por rubro entre proveedores previamente seleccionados, evaluando costos, calidad y condiciones de contratación. Este proceso permite elegir las alternativas más convenientes, optimizando la inversión y garantizando la calidad del producto final.",
    keys: ["Comparativa de precios: análisis de propuestas y costos por cada rubro.", "Selección de proveedores: evaluación de opciones previamente calificadas.", "Calidad e inversión: elección de alternativas que optimicen costos y garanticen el resultado final."],
  },
  {
    n: "02", title: "Gestiones preliminares y altas de servicios",
    desc: "Coordinación de conexiones y materiales necesarios para dar inicio a la construcción.",
    dialogTitle: "Gestiones preliminares y altas de servicios",
    dialogDesc: "Gestión y coordinación de las altas de servicios e instalaciones necesarias para dar inicio a la construcción y asegurar el correcto comienzo de la misma. Esta etapa permite preparar el terreno para la ejecución de la obra y garantizar las condiciones necesarias para su futura habitabilidad.",
    keys: ["Alta de servicios: gestión de las conexiones necesarias para la ejecución de la obra.", "Preparación para construcción: coordinación de los alquileres y materiales necesarios para el comienzo de la construcción.", "Avisos de inicio de obra: informar del comienzo de la misma a proveedores y a cualquier persona involucrada en esta etapa."],
  },
  {
    n: "03", title: "Dirección técnica de obra",
    desc: "Coordinación y control de cada etapa de la construcción para garantizar calidad y plazos.",
    dialogTitle: "Dirección técnica de obra",
    dialogDesc: "Gestión y dirección técnica integral de la obra, coordinando y controlando cada etapa de la construcción para garantizar el cumplimiento del proyecto, los plazos y la calidad prevista, brindando al cliente tranquilidad y acompañamiento durante todo el proceso.",
    keys: ["Dirección integral: coordinación técnica de todas las etapas de la obra.", "Control de ejecución: seguimiento de calidad, proyecto y plazos previstos.", "Tranquilidad del cliente: gestión y acompañamiento durante todo el proceso."],
  },
  {
    n: "04", title: "Terminaciones, equipamiento e interiorismo",
    desc: "Diseño y coordinación integral de terminaciones y equipamiento para la entrega final.",
    dialogTitle: "Terminaciones, equipamiento e interiorismo",
    dialogDesc: "Diseño, cotización y coordinación integral de las terminaciones, el equipamiento y el interiorismo de la vivienda, definiendo cada detalle necesario para lograr un resultado funcional y estéticamente coherente, dejando todo resuelto y listo para su entrega final.",
    keys: ["Diseño integral: definición de terminaciones, equipamiento e interiorismo así como la ejecución de la documentación necesaria para su correcta cotización y ejecución.", "Cotización y coordinación: gestión de proveedores, materiales y ejecución.", "Calidad: supervisión del producto final para garantizar la satisfacción del cliente y entregar la vivienda terminada y lista para disfrutar."],
  },
  {
    n: "05", title: "Inspección final y entrega de la vivienda",
    desc: "Revisión integral de calidad y entrega formal de la vivienda completamente terminada.",
    dialogTitle: "Inspección final y entrega de la vivienda",
    dialogDesc: "Realizamos una inspección integral de la vivienda, verificando la calidad de ejecución y terminación de cada espacio. Una vez completados los controles finales, efectuamos la entrega formal de la vivienda, completamente terminada y lista para habitar.",
    keys: ["Inspección final: revisión integral de cada espacio de la vivienda.", "Control de calidad: verificación de ejecución, detalles y terminaciones.", "Entrega formal: vivienda completamente terminada y lista para habitar."],
  },
];

export default function MethodologySection() {
  const [stage, setStage] = useState<Stage>("proyecto");
  const [activeStep, setActiveStep] = useState<Step | null>(null);

  const steps = stage === "proyecto" ? stepsProyecto : stepsConstruccion;
  const stageLabel = stage === "proyecto" ? "ETAPA PROYECTO" : "ETAPA CONSTRUCCIÓN";

  return (
    <section id="nuestra-metodologia" className="flex flex-col gap-10 lg:gap-14 px-5 md:px-10 lg:px-20 py-12 lg:py-24 bg-white">
      {/* Header row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-[32px] font-[800]" style={{ ...outfit, color: MAIN_08 }}>Nuestra Metodología</h2>
          <p className="text-[15px] font-normal opacity-60" style={{ ...instrument, color: MAIN_08 }}>
            Un flujo de trabajo ordenado y transparente de punta a punta.
          </p>
        </div>
        {/* Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-full border w-full lg:w-auto" style={{ backgroundColor: MAIN_005, borderColor: MAIN_01 }}>
          {(["proyecto", "construccion"] as Stage[]).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className="flex flex-1 lg:flex-none items-center justify-center gap-1.5 px-4 py-2 rounded-full transition-all text-[13px] font-semibold whitespace-nowrap"
              style={stage === s
                ? { backgroundColor: MAIN, color: "white", ...instrument }
                : { color: MAIN_08, opacity: 0.6, fontWeight: 500, ...instrument }
              }
            >
              {stage === s && <span className="w-2 h-2 rounded-full bg-white shrink-0" />}
              {s === "proyecto" ? "Etapa Proyecto" : "Etapa Construcción"}
            </button>
          ))}
        </div>
      </div>

      {/* Steps list */}
      <div className="flex flex-col gap-4">
        {steps.map((step) => (
          <button
            key={step.n}
            onClick={() => setActiveStep(step)}
            className="flex items-center gap-4 lg:gap-10 p-4 lg:p-6 rounded-2xl border cursor-pointer transition-all hover:bg-[rgba(4,35,58,0.05)] hover:shadow-sm text-left w-full"
            style={{ borderColor: MAIN_02 }}
          >
            <span className="text-2xl lg:text-[32px] font-extrabold w-10 lg:w-16 shrink-0" style={{ ...outfit, color: MAIN }}>{step.n}</span>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-lg font-bold" style={{ ...outfit, color: MAIN_08 }}>{step.title}</p>
              <p className="text-sm font-normal leading-[1.5] opacity-70" style={{ ...instrument, color: MAIN_08 }}>{step.desc}</p>
            </div>
            <span className="flex items-center gap-1 shrink-0" style={{ color: MAIN }}>
              <span className="text-[13px] font-semibold" style={instrument}>Ver más</span>
              <span className="text-xs" style={instrument}>+</span>
            </span>
          </button>
        ))}
      </div>

      {/* Step detail dialog — layout fiel al diseño Figma pro00–cro05 */}
      <Dialog open={!!activeStep} onClose={() => setActiveStep(null)}>
        {activeStep && (
          <div className="flex flex-col gap-6 lg:gap-8 p-6 lg:p-12">
            {/* Badge + close — matches Figma header-row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center px-3.5 py-1.5 rounded-full" style={{ backgroundColor: MAIN_01 }}>
                <span className="text-[12px] font-bold uppercase tracking-wide" style={{ ...instrument, color: MAIN }}>
                  Paso {activeStep.n} · {stageLabel}
                </span>
              </div>
              <button
                onClick={() => setActiveStep(null)}
                className="flex items-center justify-center w-8 h-8 rounded-2xl"
                style={{ backgroundColor: "#f3f7f9" }}
                aria-label="Cerrar"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="#2c2c2a" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Title + description */}
            <div className="flex flex-col gap-4">
              <p className="text-[28px] font-extrabold leading-normal" style={{ ...outfit, color: "#2c2c2a" }}>
                {activeStep.dialogTitle}
              </p>
              <p className="text-[15px] font-normal leading-[1.6]" style={{ ...instrument, color: "#2c2c2a" }}>
                {activeStep.dialogDesc.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            {/* Summary box with left border — matches Figma summary-box */}
            <div className="flex flex-col gap-4 p-6 rounded-tr-2xl rounded-br-2xl rounded-bl-sm rounded-tl-sm border-l-4"
              style={{ backgroundColor: MAIN_01, borderLeftColor: MAIN }}>
              <p className="text-[14px] font-bold uppercase tracking-wide" style={{ ...outfit, color: "#2c2c2a" }}>
                Resultados Clave de la Etapa:
              </p>
              <div className="flex flex-col gap-2.5">
                {activeStep.keys.map((key) => (
                  <div key={key} className="flex gap-2 items-start">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#04233a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[14px] font-normal leading-normal flex-1" style={{ ...instrument, color: "#2c2c2a" }}>{key}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Entendido button */}
            <button
              onClick={() => setActiveStep(null)}
              className="w-full py-4 rounded-xl text-sm font-semibold text-white"
              style={{ ...instrument, backgroundColor: MAIN }}
            >
              Entendido
            </button>
          </div>
        )}
      </Dialog>
    </section>
  );
}
