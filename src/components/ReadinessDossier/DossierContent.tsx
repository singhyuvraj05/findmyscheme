"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { useAppState } from "@/context/AppStateContext";
import { formatINR } from "@/lib/format";
import { compareLoans } from "@/components/EMICalculator/calcEngine";
import { CheckSquare, MapPin, Phone, Printer, FileText } from "lucide-react";

const COMMERCIAL_RATE = 13.5;

interface DossierContentProps {
  onPrint: () => void;
}

export default function DossierContent({ onPrint }: DossierContentProps) {
  const { t, lang } = useLang();
  const { selectedScheme, selectedPartner, emiState, routingToken } = useAppState();
  const { loanAmount, tenureMonths, moratoriumMonths, interestRate } = emiState;

  const rate = selectedScheme?.interestRate ?? interestRate;
  const calc = compareLoans(loanAmount, tenureMonths, moratoriumMonths, rate, COMMERCIAL_RATE);

  const docList = [
    t.docCaste,
    t.docIncome,
    t.docProject,
    t.docAadhaar,
    t.docPan,
    t.docBank,
    t.docPhoto,
    ...(selectedScheme?.documents?.slice(7) ?? []),
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div id="dossier-content" className="print-full space-y-6">
      {/* Header */}
      <div className="bg-[#0f172a] text-white rounded-xl p-5 flex items-start justify-between">
        <div>
          <div className="text-[#d97706] text-xs font-bold uppercase tracking-widest">
            Ministry of Social Justice & Empowerment
          </div>
          <h2 className="text-xl font-extrabold mt-1">
            {lang === "hi" ? "फाइंड माय स्कीम" : "FindMyScheme"} — {t.dossierTitle}
          </h2>
          <p className="text-[#94a3b8] text-xs mt-1">{t.generatedOn}: {today}</p>
        </div>
        <div className="text-right">
          <div className="text-[#94a3b8] text-[10px] uppercase tracking-wider">{t.routingToken}</div>
          <div className="font-mono font-bold text-[#d97706] text-lg mt-0.5">{routingToken}</div>
        </div>
      </div>

      {/* Matched Scheme */}
      <section>
        <h3 className="text-sm font-bold text-[#334155] flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-[#059669]" />
          {t.matchedScheme}
        </h3>
        {selectedScheme ? (
          <div className={`border-2 rounded-xl p-4 ${selectedScheme.color}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedScheme.icon}</span>
              <div>
                <div className="font-bold text-[#0f172a]">
                  {lang === "hi" ? selectedScheme.nameHi : selectedScheme.name}
                </div>
                <div className="text-xs text-[#64748b] mt-0.5">
                  {selectedScheme.interestRate}% p.a. · Max {formatINR(selectedScheme.maxAmount)} ·{" "}
                  {Math.round(selectedScheme.govtSubsidy * 100)}% Govt. Subsidy ·{" "}
                  {t.promoterContribution}: {Math.round(selectedScheme.promoterContribution * 100)}%
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#94a3b8] italic bg-[#f8fafc] rounded-xl p-4">{t.noSchemeSelected}</p>
        )}
      </section>

      {/* EMI Summary */}
      <section>
        <h3 className="text-sm font-bold text-[#334155] mb-3">💰 {t.emiSummary}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Loan Amount", value: formatINR(loanAmount) },
            { label: "Monthly EMI", value: formatINR(Math.round(calc.concessional.emi)) },
            { label: "Total Interest", value: formatINR(Math.round(calc.concessional.totalInterest)) },
            { label: "vs. Commercial Saving", value: formatINR(Math.round(calc.savings)), highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-3 text-center border ${
                item.highlight ? "border-[#059669] bg-[#059669]/10" : "border-[#e2e8f0] bg-[#f8fafc]"
              }`}
            >
              <div className="text-[10px] text-[#94a3b8]">{item.label}</div>
              <div className={`font-extrabold text-sm ${item.highlight ? "text-[#059669]" : "text-[#0f172a]"}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Checklist */}
      <section>
        <h3 className="text-sm font-bold text-[#334155] mb-3">📋 {t.documentChecklist}</h3>
        <div className="border border-[#e2e8f0] rounded-xl divide-y divide-[#f1f5f9]">
          {docList.map((doc, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3">
              <CheckSquare className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[#334155]">{doc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Channel Partner */}
      <section>
        <h3 className="text-sm font-bold text-[#334155] mb-3">🏦 {t.channelPartner}</h3>
        {selectedPartner ? (
          <div className="border-2 border-[#059669] bg-[#059669]/5 rounded-xl p-4">
            <div className="font-bold text-[#0f172a]">{selectedPartner.name}</div>
            <div className="flex items-center gap-2 text-xs text-[#64748b] mt-2">
              <MapPin className="w-3.5 h-3.5" />
              {selectedPartner.address}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748b] mt-1">
              <Phone className="w-3.5 h-3.5" />
              {selectedPartner.phone}
            </div>
            <div className="mt-3 text-[10px] text-[#94a3b8]">
              Present this dossier with routing token{" "}
              <span className="font-mono font-bold text-[#d97706]">{routingToken}</span> at the branch
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#94a3b8] italic bg-[#f8fafc] rounded-xl p-4">{t.noPartnerSelected}</p>
        )}
      </section>

      {/* Disclaimer */}
      <p className="text-[10px] text-[#94a3b8] border-t border-[#f1f5f9] pt-4 leading-relaxed">
        {t.disclaimer}
      </p>

      {/* Print Button */}
      <button
        onClick={onPrint}
        className="no-print w-full flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold py-3 rounded-xl transition-all text-sm"
      >
        <Printer className="w-4 h-4" />
        {t.printDossier}
      </button>
    </div>
  );
}
