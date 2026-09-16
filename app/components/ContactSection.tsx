"use client";

import { useState } from "react";
import Image from "next/image";
import { ICON_WHATSAPP, MAIN, MAIN_08, MAIN_02, MAIN_01, MAIN_005, outfit, instrument } from "./assets";
import { sendContactForm } from "../lib/sendContactForm";

type Answers = Record<string, string>;

type OptionsQuestion = { key: string; title: string; options: string[] };
type StepOptions = { type: "options"; questions: OptionsQuestion[] };
type StepTextarea = { type: "textarea"; key: string; title: string; placeholder: string };
type StepForm = { type: "form" };
type Step = StepOptions | StepTextarea | StepForm;

const steps: Step[] = [
  {
    type: "options",
    questions: [
      {
        key: "objetivo",
        title: "¿Qué estás buscando hacer hoy?",
        options: [
          "Desarrollar un proyecto inmobiliario para obtener rentabilidad.",
          "Construir una vivienda para uso propio.",
          "Analizar la viabilidad de un terreno o inversión.",
          "Todavía estoy evaluando opciones.",
        ],
      },
    ],
  },
  {
    type: "options",
    questions: [
      {
        key: "terreno",
        title: "¿Ya contás con un terreno para desarrollar?",
        options: [
          "Sí, ya tengo un terreno",
          "Estoy buscando comprar uno",
          "No cuento con terreno actualmente",
        ],
      },
      {
        key: "tipo_proyecto",
        title: "¿Qué tipo de proyecto estás evaluando desarrollar?",
        options: [
          "Vivienda unifamiliar",
          "Dúplex",
          "Desarrollo multifamiliar",
          "Local comercial",
          "Aún no lo tengo definido",
        ],
      },
    ],
  },
  {
    type: "options",
    questions: [
      {
        key: "inversion",
        title: "Para poder orientarte correctamente sobre la viabilidad del proyecto, ¿Qué rango de inversión estimas destinar?",
        options: [
          "Menos de 100.000 USD",
          "100.000 a 200.000 USD",
          "200.000 a 400.000 USD",
          "Más de 400.000 USD",
        ],
      },
      {
        key: "inicio",
        title: "¿Cuándo te gustaría comenzar?",
        options: [
          "Lo antes posible",
          "Dentro de los próximos 3 meses",
          "Dentro de más de 6 meses",
          "Solo estoy investigando",
        ],
      },
    ],
  },
  {
    type: "textarea",
    key: "descripcion",
    title: "Le pediremos que nos comparta información DETALLADA acerca del proyecto que estas buscando realizar",
    placeholder: "Ejemplo: Estoy buscando construir mi casa, tengo un terreno de 1.000m2. Puntualmente una casa con cuatro dormitorios, dos baños, living, comedor y cocina.",
  },
  { type: "form" },
];

const TOTAL_STEPS = steps.length;

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({ name: "", surname: "", phone: "", email: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const step = steps[currentStep];

  const canContinue = (() => {
    if (step.type === "options") return step.questions.every((q) => !!answers[q.key]);
    if (step.type === "textarea") return description.trim() !== "";
    return formData.name.trim() !== "" && formData.email.trim() !== "";
  })();

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }
    const fullName = `${formData.name} ${formData.surname}`.trim();
    const lines = [
      "EVALUACIÓN INICIAL — NUEVA CONSULTA",
      "===================================",
      "",
      `¿Qué estás buscando hacer hoy?\n   → ${answers["objetivo"] ?? "(sin respuesta)"}`,
      "",
      `¿Ya contás con un terreno para desarrollar?\n   → ${answers["terreno"] ?? "(sin respuesta)"}`,
      "",
      `¿Qué tipo de proyecto estás evaluando desarrollar?\n   → ${answers["tipo_proyecto"] ?? "(sin respuesta)"}`,
      "",
      `¿Qué rango de inversión estimas destinar?\n   → ${answers["inversion"] ?? "(sin respuesta)"}`,
      "",
      `¿Cuándo te gustaría comenzar?\n   → ${answers["inicio"] ?? "(sin respuesta)"}`,
      "",
      "Descripción del proyecto:",
      description || "(sin descripción)",
      "",
      "DATOS DE CONTACTO",
      "-----------------",
      `Nombre:    ${fullName}`,
      `Teléfono:  ${formData.phone || "(no informado)"}`,
      `Email:     ${formData.email}`,
      `Ubicación: ${formData.location || "(no informado)"}`,
    ];
    setSendError(null);
    setIsSending(true);
    try {
      await sendContactForm({ name: fullName, email: formData.email, message: lines.join("\n") });
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Error al enviar. Intenta nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setDescription("");
    setFormData({ name: "", surname: "", phone: "", email: "", location: "" });
    setSubmitted(false);
    setSendError(null);
  };

  const inputStyle = { borderColor: MAIN_02, fontFamily: "var(--font-instrument-sans)", color: MAIN_08, outlineColor: MAIN } as React.CSSProperties;

  return (
    <section id="contacto" className="px-5 md:px-10 lg:px-20 py-12 lg:py-20 bg-white">
      <div
        className="flex flex-col gap-8 lg:gap-10 items-center px-5 md:px-8 lg:px-10 py-12 lg:py-20 rounded-3xl border"
        style={{ backgroundColor: MAIN_01, borderColor: MAIN_02 }}
      >
        <div className="flex flex-col gap-3 items-center text-center">
          <h2 className="text-[36px] font-extrabold" style={{ ...outfit, color: MAIN_08 }}>Contacto</h2>
          <p className="text-lg font-normal opacity-70" style={{ ...instrument, color: MAIN_08 }}>
            Elegí cómo preferís comunicarte con nosotros
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full">
          {/* WhatsApp column */}
          <div className="flex-1 flex flex-col gap-6 items-center justify-center p-8 rounded-2xl" style={{ backgroundColor: MAIN_01 }}>
            <h3 className="text-2xl font-bold text-center" style={{ ...outfit, color: MAIN_08 }}>Escribinos por WhatsApp</h3>
            <p className="text-base font-normal opacity-70 text-center" style={{ ...instrument, color: MAIN_08 }}>
              Contactate con nosotros a través de nuestro canal
            </p>
            <a
              href="https://wa.me/5493512191137"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white"
              style={{ ...instrument, backgroundColor: MAIN }}
            >
              <Image src={ICON_WHATSAPP} alt="" width={16} height={16} unoptimized />
              Contacto vía Whatsapp
            </a>
          </div>

          <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: MAIN_02 }} />

          {/* Wizard form column */}
          <div className="flex-1 flex flex-col gap-6 items-center p-8 rounded-2xl" style={{ backgroundColor: MAIN_01 }}>
            <h3 className="text-2xl font-bold text-center" style={{ ...outfit, color: MAIN_08 }}>Completá el formulario</h3>
            <p className="text-base font-normal opacity-70 text-center" style={{ ...instrument, color: MAIN_08 }}>
              Solicitá tu primera reunión gratuita con nosotros:
            </p>

            <div className="bg-white rounded-2xl p-6 lg:p-8 w-full shadow-sm flex flex-col gap-6">
              {submitted ? (
                <div className="flex flex-col gap-4 items-center text-center py-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: MAIN_005, color: MAIN }}>✓</div>
                  <p className="text-xl font-bold" style={{ ...outfit, color: MAIN_08 }}>¡Gracias por contactarnos!</p>
                  <p className="text-sm font-normal opacity-70" style={{ ...instrument, color: MAIN_08 }}>
                    Recibimos tu consulta. Te responderemos dentro de las 48 horas hábiles.
                  </p>
                  <button onClick={handleReset} className="text-sm font-semibold underline opacity-60 hover:opacity-100" style={{ ...instrument, color: MAIN_08 }}>
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold" style={{ ...outfit, color: MAIN_08 }}>Evaluación inicial</p>
                    <p className="text-[13px] font-normal opacity-60" style={{ ...instrument, color: MAIN_08 }}>
                      Queremos entender tu idea. Paso {currentStep + 1} de {TOTAL_STEPS}.
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    {steps.map((_, i) => (
                      <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{ backgroundColor: i <= currentStep ? MAIN : MAIN_02 }} />
                    ))}
                  </div>

                  {step.type === "options" && (
                    <div className="flex flex-col gap-6">
                      {step.questions.map((q) => (
                        <div key={q.key} className="flex flex-col gap-3">
                          <p className="text-[15px] font-semibold" style={{ ...instrument, color: MAIN_08 }}>{q.title}</p>
                          {q.options.map((opt) => {
                            const selected = answers[q.key] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt }))}
                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-[1.5px] text-left transition-all"
                                style={{ backgroundColor: selected ? MAIN_01 : "white", borderColor: selected ? MAIN : MAIN_01 }}
                              >
                                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all" style={{ borderColor: MAIN, opacity: selected ? 1 : 0.3 }}>
                                  {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: MAIN }} />}
                                </div>
                                <span className="flex-1 text-sm font-medium" style={{ ...instrument, color: MAIN_08 }}>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.type === "textarea" && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[15px] font-semibold" style={{ ...instrument, color: MAIN_08 }}>{step.title}</p>
                      <textarea
                        rows={5}
                        placeholder={step.placeholder}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all resize-none"
                        style={inputStyle}
                      />
                    </div>
                  )}

                  {step.type === "form" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[15px] font-semibold" style={{ ...instrument, color: MAIN_08 }}>Información de contacto</p>
                        <p className="text-[13px] font-normal opacity-60" style={{ ...instrument, color: MAIN_08 }}>
                          Su información solo se utilizará para entrar en contacto con usted y brindarle el presupuesto adecuado para su proyecto.
                        </p>
                      </div>
                      {([
                        { key: "name",     label: "Nombre",                 placeholder: "Nombre",                      type: "text"  },
                        { key: "surname",  label: "Apellido",               placeholder: "Apellido",                    type: "text"  },
                        { key: "phone",    label: "Número de teléfono",     placeholder: "Número de teléfono",          type: "text"  },
                        { key: "email",    label: "Email",                  placeholder: "Email",                       type: "email" },
                        { key: "location", label: "Ubicación del proyecto", placeholder: "Localidad / Barrio / Ciudad", type: "text"  },
                      ] as const).map(({ key, label, placeholder, type }) => (
                        <div key={key} className="flex flex-col gap-1">
                          <label className="text-[13px] font-semibold" style={{ ...instrument, color: MAIN_08 }}>{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={formData[key]}
                            onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                            style={inputStyle}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {currentStep > 0 && (
                      <button
                        onClick={() => setCurrentStep((s) => s - 1)}
                        className="flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold border-[1.5px]"
                        style={{ ...instrument, borderColor: MAIN_02, color: MAIN_08 }}
                      >
                        Atrás
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={!canContinue || isSending}
                      className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                      style={{ ...instrument, backgroundColor: MAIN }}
                    >
                      {isSending ? "Enviando..." : currentStep < TOTAL_STEPS - 1 ? "Siguiente paso" : "Enviar"}
                    </button>
                  </div>
                  {sendError && <p className="text-xs text-red-600 text-center" style={instrument}>{sendError}</p>}
                </>
              )}
            </div>

            <p className="text-xs font-normal opacity-50 text-center" style={{ ...instrument, color: MAIN_08 }}>
              Sin compromisos comerciales. Respuesta garantizada dentro de las 48 horas hábiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
