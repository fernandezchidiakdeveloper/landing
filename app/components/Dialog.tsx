"use client";

import { useEffect, useRef } from "react";
import { MAIN, MAIN_02, MAIN_08, outfit, instrument } from "./assets";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ backgroundColor: "rgba(4,35,58,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-[1040px] w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
