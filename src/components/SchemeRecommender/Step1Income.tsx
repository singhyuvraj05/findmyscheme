"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Step1Props {
  annualIncome: number;
  setAnnualIncome: (v: number) => void;
  hasSCCertificate: boolean;
  setHasSCCertificate: (v: boolean) => void;
  gender: "male" | "female";
  setGender: (v: "male" | "female") => void;
}

const INCOME_MAX = 600000;
const INCOME_STEP = 10000;

export default function Step1Income({
  annualIncome,
  setAnnualIncome,
  hasSCCertificate,
  setHasSCCertificate,
  gender,
  setGender,
}: Step1Props) {
  const { t } = useLang();
  const overLimit = annualIncome > 500000;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Annual Income Slider */}
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-3">
          {t.annualIncome}
        </label>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-[#0f172a]">
            {formatINR(annualIncome)}
          </span>
          {overLimit && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
              Exceeds ₹5L cap
            </span>
          )}
        </div>
        <input
          type="range"
          min={50000}
          max={INCOME_MAX}
          step={INCOME_STEP}
          value={annualIncome}
          onChange={(e) => setAnnualIncome(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, ${overLimit ? "#ef4444" : "#059669"} ${
              ((annualIncome - 50000) / (INCOME_MAX - 50000)) * 100
            }%, #e2e8f0 0%)`,
          }}
        />
        <div className="flex justify-between text-xs text-[#94a3b8] mt-1">
          <span>₹50,000</span>
          <span className={overLimit ? "text-red-500 font-medium" : "text-[#059669] font-medium"}>
            ← ₹5L Limit
          </span>
          <span>₹6,00,000</span>
        </div>
        {overLimit && (
          <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            ⚠ {t.incomeTooHigh}
          </p>
        )}
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-3">
          {t.gender}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={cn(
                "border-2 rounded-xl p-4 text-center font-medium transition-all",
                gender === g
                  ? "border-[#059669] bg-[#059669]/10 text-[#059669]"
                  : "border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]"
              )}
            >
              {g === "male" ? `👨 ${t.male}` : `👩 ${t.female}`}
            </button>
          ))}
        </div>
      </div>

      {/* SC Certificate */}
      <div
        onClick={() => setHasSCCertificate(!hasSCCertificate)}
        className={cn(
          "flex items-start gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all",
          hasSCCertificate
            ? "border-[#059669] bg-[#059669]/5"
            : "border-[#e2e8f0] hover:border-[#cbd5e1]"
        )}
      >
        <div
          className={cn(
            "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0",
            hasSCCertificate
              ? "border-[#059669] bg-[#059669]"
              : "border-[#cbd5e1]"
          )}
        >
          {hasSCCertificate && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-medium text-[#0f172a] text-sm">{t.scCertificate}</p>
          <p className="text-xs text-[#64748b] mt-0.5">{t.scRequired}</p>
        </div>
      </div>
    </div>
  );
}
