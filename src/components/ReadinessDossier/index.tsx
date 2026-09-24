"use client";

import React, { useState, useRef } from "react";
import { useLang } from "@/context/LangContext";
import DossierContent from "./DossierContent";
import { FileText, X } from "lucide-react";

export default function ReadinessDossier() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  return (
    <section id="dossier" className="py-16 px-4 bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section Header */}
        <span className="inline-block bg-[#d97706]/10 text-[#d97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          Module 4
        </span>
        <h2 className="text-3xl font-extrabold text-[#0f172a]">{t.dossierTitle}</h2>
        <p className="text-[#64748b] mt-2 mb-8">{t.dossierSubtitle}</p>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg text-base animate-pulse-glow"
        >
          <FileText className="w-5 h-5" />
          {t.openDossier}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-[#0f172a]/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
              <h3 className="font-bold text-[#0f172a]">{t.dossierTitle}</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-[#f8fafc] text-[#64748b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div ref={contentRef} className="px-6 py-6">
              <DossierContent onPrint={handlePrint} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
