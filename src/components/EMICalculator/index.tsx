"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import LoanSliders from "./LoanSliders";
import ResultCards from "./ResultCards";

export default function EMICalculator() {
  const { t } = useLang();

  return (
    <section id="calculator" className="py-16 px-4 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#d97706]/10 text-[#d97706] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Module 2
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f172a]">{t.calcTitle}</h2>
          <p className="text-[#64748b] mt-2">{t.calcSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sliders Panel */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6">
            <LoanSliders />
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            <ResultCards />
          </div>
        </div>
      </div>
    </section>
  );
}
