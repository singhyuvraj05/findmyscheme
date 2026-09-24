"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { formatINR } from "@/lib/format";
import type { SchemePurpose } from "@/data/schemes";

interface Step3Props {
  loanAmount: number;
  setLoanAmount: (v: number) => void;
  purpose: SchemePurpose;
}

const AMOUNT_RANGES: Record<SchemePurpose, { min: number; max: number; step: number }> = {
  "micro-enterprise": { min: 20000, max: 140000, step: 5000 },
  "term-loan":        { min: 140000, max: 5000000, step: 50000 },
  education:          { min: 50000, max: 2000000, step: 25000 },
};

export default function Step3Amount({ loanAmount, setLoanAmount, purpose }: Step3Props) {
  const { t } = useLang();
  const range = AMOUNT_RANGES[purpose];

  // Clamp value to current purpose's range
  const clampedAmount = Math.min(Math.max(loanAmount, range.min), range.max);

  const pct = ((clampedAmount - range.min) / (range.max - range.min)) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-3">
          {t.loanAmount}
        </label>
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 text-center mb-4">
          <div className="text-3xl font-extrabold text-[#0f172a]">
            {formatINR(clampedAmount)}
          </div>
          <div className="text-xs text-[#94a3b8] mt-1">
            Range: {formatINR(range.min)} – {formatINR(range.max)}
          </div>
        </div>
        <input
          type="range"
          min={range.min}
          max={range.max}
          step={range.step}
          value={clampedAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #059669 ${pct}%, #e2e8f0 0%)`,
          }}
        />
        <div className="flex justify-between text-xs text-[#94a3b8] mt-1">
          <span>{formatINR(range.min)}</span>
          <span>{formatINR(range.max)}</span>
        </div>
      </div>

      {/* Quick amount chips */}
      <div>
        <p className="text-xs text-[#94a3b8] mb-2">Quick select</p>
        <div className="flex flex-wrap gap-2">
          {[range.min, Math.round(range.max * 0.25), Math.round(range.max * 0.5), range.max].map((amt) => (
            <button
              key={amt}
              onClick={() => setLoanAmount(amt)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                clampedAmount === amt
                  ? "bg-[#059669] border-[#059669] text-white"
                  : "border-[#e2e8f0] text-[#64748b] hover:border-[#059669] hover:text-[#059669]"
              }`}
            >
              {formatINR(amt)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
