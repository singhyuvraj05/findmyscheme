"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { useAppState } from "@/context/AppStateContext";
import { formatINR, formatMonths } from "@/lib/format";

interface SliderConfig {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  color?: string;
}

function LoanSlider({ label, value, min, max, step, display, onChange, color = "#059669" }: SliderConfig) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-[#334155]">{label}</label>
        <span className="text-base font-bold text-[#0f172a]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          background: `linear-gradient(to right, ${color} ${pct}%, #e2e8f0 0%)`,
        }}
      />
      <div className="flex justify-between text-xs text-[#94a3b8]">
        <span>{min === 20000 ? formatINR(min) : min}</span>
        <span>{max === 5000000 ? formatINR(max) : max}</span>
      </div>
    </div>
  );
}

export default function LoanSliders() {
  const { t } = useLang();
  const { emiState, setEmiState } = useAppState();
  const { loanAmount, tenureMonths, moratoriumMonths } = emiState;

  return (
    <div className="space-y-8">
      <LoanSlider
        label={t.loanAmountLabel}
        value={loanAmount}
        min={20000}
        max={5000000}
        step={10000}
        display={formatINR(loanAmount)}
        onChange={(v) => setEmiState({ loanAmount: v })}
        color="#059669"
      />
      <LoanSlider
        label={t.tenureLabel}
        value={tenureMonths}
        min={12}
        max={120}
        step={6}
        display={formatMonths(tenureMonths)}
        onChange={(v) => setEmiState({ tenureMonths: v, moratoriumMonths: Math.min(moratoriumMonths, v - 6) })}
        color="#0f172a"
      />
      <LoanSlider
        label={t.moratoriumLabel}
        value={moratoriumMonths}
        min={3}
        max={Math.min(12, tenureMonths - 6)}
        step={1}
        display={formatMonths(moratoriumMonths)}
        onChange={(v) => setEmiState({ moratoriumMonths: v })}
        color="#d97706"
      />
    </div>
  );
}
