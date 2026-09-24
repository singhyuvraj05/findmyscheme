"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { useAppState } from "@/context/AppStateContext";
import { compareLoans } from "./calcEngine";
import { formatINR } from "@/lib/format";
import { TrendingDown, Banknote, PiggyBank } from "lucide-react";

const COMMERCIAL_RATE = 13.5;

export default function ResultCards() {
  const { t } = useLang();
  const { emiState, selectedScheme } = useAppState();
  const { loanAmount, tenureMonths, moratoriumMonths, interestRate } = emiState;

  const concessionalRate = selectedScheme ? selectedScheme.interestRate : interestRate;

  const result = compareLoans(
    loanAmount,
    tenureMonths,
    moratoriumMonths,
    concessionalRate,
    COMMERCIAL_RATE
  );

  const { concessional, commercial, savings, savingsPercent } = result;

  const rows = [
    { label: t.moratoriumInterest, conc: concessional.moratoriumInterest, comm: commercial.moratoriumInterest },
    { label: t.postMoratoriumEmi,   conc: concessional.emi,               comm: commercial.emi },
    { label: t.totalInterest,        conc: concessional.totalInterest,     comm: commercial.totalInterest },
    { label: t.totalPayable,         conc: concessional.totalPayable,      comm: commercial.totalPayable },
  ];

  return (
    <div className="space-y-4">
      {/* Side-by-side rate badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#059669]/10 border border-[#059669]/30 rounded-xl p-3 text-center">
          <div className="text-[#059669] text-2xl font-extrabold">{concessionalRate}%</div>
          <div className="text-xs text-[#059669] font-medium mt-0.5">{t.mosjeRate}</div>
        </div>
        <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-xl p-3 text-center">
          <div className="text-[#ef4444] text-2xl font-extrabold">{COMMERCIAL_RATE}%</div>
          <div className="text-xs text-[#ef4444] font-medium mt-0.5">{t.commercialRate}</div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-[#e2e8f0] rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 bg-[#f8fafc] border-b border-[#e2e8f0] text-xs font-bold text-[#64748b] px-4 py-2">
          <div />
          <div className="text-center text-[#059669]">{t.concessional}</div>
          <div className="text-center text-[#ef4444]">{t.commercial}</div>
        </div>
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"} ${i < rows.length - 1 ? "border-b border-[#f1f5f9]" : ""}`}
          >
            <div className="text-[#64748b] text-xs font-medium pr-2">{row.label}</div>
            <div className="text-center font-bold text-[#059669]">{formatINR(Math.round(row.conc))}</div>
            <div className="text-center font-bold text-[#ef4444]">{formatINR(Math.round(row.comm))}</div>
          </div>
        ))}
      </div>

      {/* Savings Banner */}
      <div className="bg-gradient-to-r from-[#059669] to-[#047857] rounded-2xl p-5 text-white text-center shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-1">
          <PiggyBank className="w-5 h-5" />
          <span className="text-sm font-semibold opacity-90">{t.savingsBadge}</span>
        </div>
        <div className="text-4xl font-extrabold">{formatINR(Math.round(savings))}</div>
        <div className="text-sm opacity-80 mt-1">
          That&apos;s {savingsPercent.toFixed(1)}% less than a commercial bank loan
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 text-xs opacity-70">
          <TrendingDown className="w-3 h-3" />
          <span>Over the full loan tenure of {tenureMonths} months</span>
        </div>
      </div>

      {/* EMI Highlight */}
      <div className="grid grid-cols-2 gap-3">
        <div className="border-2 border-[#059669] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-[#64748b] mb-1">
            <Banknote className="w-3 h-3" />
            {t.monthlyEmi} ({t.concessional})
          </div>
          <div className="text-xl font-extrabold text-[#059669]">
            {formatINR(Math.round(concessional.emi))}
          </div>
          <div className="text-[10px] text-[#94a3b8] mt-1">/month</div>
        </div>
        <div className="border-2 border-[#e2e8f0] rounded-xl p-4 text-center bg-[#fef2f2]">
          <div className="flex items-center justify-center gap-1 text-xs text-[#64748b] mb-1">
            <Banknote className="w-3 h-3" />
            {t.monthlyEmi} ({t.commercial})
          </div>
          <div className="text-xl font-extrabold text-[#ef4444]">
            {formatINR(Math.round(commercial.emi))}
          </div>
          <div className="text-[10px] text-[#94a3b8] mt-1">/month</div>
        </div>
      </div>
    </div>
  );
}
