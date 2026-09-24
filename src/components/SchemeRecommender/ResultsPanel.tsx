"use client";

import React, { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import { useAppState } from "@/context/AppStateContext";
import type { SchemeMatch } from "./matchEngine";
import { formatINR, formatPercent } from "@/lib/format";
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ResultsPanelProps {
  matches: SchemeMatch[];
  onCalculateEMI: (match: SchemeMatch) => void;
}

function ScoreBar({ score, animate }: { score: number; animate: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(score), 100);
      return () => clearTimeout(t);
    }
    setWidth(score);
  }, [score, animate]);

  const color =
    score >= 70 ? "#059669" : score >= 40 ? "#d97706" : "#ef4444";

  return (
    <div className="w-full bg-[#f1f5f9] rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function ResultsPanel({ matches, onCalculateEMI }: ResultsPanelProps) {
  const { t, lang } = useLang();
  const { setSelectedScheme, setEmiState } = useAppState();
  const eligibleMatches = matches.filter((m) => m.eligible);
  const ineligibleMatches = matches.filter((m) => !m.eligible);

  function handleSelectScheme(match: SchemeMatch) {
    setSelectedScheme(match.scheme);
    setEmiState({
      loanAmount: Math.min(500000, match.scheme.maxAmount),
      interestRate: match.scheme.interestRate,
      moratoriumMonths: match.scheme.moratoriumMin,
      tenureMonths: match.scheme.tenureMaxYears * 12,
    });
    onCalculateEMI(match);
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h3 className="text-xl font-bold text-[#0f172a]">{t.resultsTitle}</h3>
        <p className="text-sm text-[#64748b] mt-1">
          {eligibleMatches.length} scheme{eligibleMatches.length !== 1 ? "s" : ""} matched
        </p>
      </div>

      {/* Eligible Schemes */}
      {eligibleMatches.map((match, idx) => (
        <div
          key={match.scheme.id}
          className={`border-2 rounded-2xl p-5 ${match.scheme.color} ${idx === 0 ? "ring-2 ring-[#059669] ring-offset-2" : ""}`}
        >
          {idx === 0 && (
            <div className="flex items-center gap-1 text-[#059669] text-xs font-bold mb-3">
              <CheckCircle className="w-4 h-4" />
              Best Match
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{match.scheme.icon}</span>
              <div>
                <h4 className="font-bold text-[#0f172a] text-base">
                  {lang === "hi" ? match.scheme.nameHi : match.scheme.name}
                </h4>
                <span className="text-xs font-semibold text-[#64748b]">
                  {match.scheme.shortName}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-extrabold text-[#059669]">
                {match.score}%
              </div>
              <div className="text-xs text-[#64748b]">{t.matchScore}</div>
            </div>
          </div>

          <ScoreBar score={match.score} animate={true} />

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-xs text-[#64748b]">{t.maxLoan}</div>
              <div className="font-bold text-[#0f172a]">{formatINR(match.scheme.maxAmount)}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-xs text-[#64748b]">{t.interestRate}</div>
              <div className="font-bold text-[#059669]">{match.scheme.interestRate}% p.a.</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-xs text-[#64748b]">{t.govtSubsidy}</div>
              <div className="font-bold text-[#d97706]">{formatPercent(match.scheme.govtSubsidy * 100)}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3">
              <div className="text-xs text-[#64748b]">{t.moratorium}</div>
              <div className="font-bold text-[#0f172a]">
                {match.scheme.moratoriumMin}–{match.scheme.moratoriumMax} {t.months}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSelectScheme(match)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {t.calculateEmi}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Ineligible Schemes (collapsed) */}
      {ineligibleMatches.length > 0 && (
        <details className="border border-[#e2e8f0] rounded-xl">
          <summary className="px-4 py-3 cursor-pointer text-sm text-[#64748b] font-medium flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            {ineligibleMatches.length} scheme{ineligibleMatches.length !== 1 ? "s" : ""} not eligible — tap to see why
          </summary>
          <div className="px-4 pb-4 space-y-2">
            {ineligibleMatches.map((m) => (
              <div key={m.scheme.id} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-3">
                <span className="text-lg">{m.scheme.icon}</span>
                <div>
                  <p className="font-medium text-sm text-[#0f172a]">
                    {lang === "hi" ? m.scheme.nameHi : m.scheme.name}
                  </p>
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                    <AlertTriangle className="w-3 h-3" />
                    {m.ineligibleReason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
