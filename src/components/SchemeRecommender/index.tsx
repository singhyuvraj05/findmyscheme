"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";
import type { SchemePurpose } from "@/data/schemes";
import Step1Income from "./Step1Income";
import Step2Purpose from "./Step2Purpose";
import Step3Amount from "./Step3Amount";
import Step4Education from "./Step4Education";
import ResultsPanel from "./ResultsPanel";
import { rankSchemes } from "./matchEngine";
import type { SchemeMatch } from "./matchEngine";
import { CheckCircle } from "lucide-react";

type EduLevel = "graduate" | "postgraduate" | "professional" | "abroad";

export default function SchemeRecommender() {
  const { t } = useLang();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Wizard state
  const [annualIncome, setAnnualIncome] = useState(300000);
  const [hasSCCertificate, setHasSCCertificate] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [purpose, setPurpose] = useState<SchemePurpose>("micro-enterprise");
  const [loanAmount, setLoanAmount] = useState(80000);
  const [educationLevel, setEducationLevel] = useState<EduLevel>("graduate");

  const totalSteps = purpose === "education" ? 4 : 3;

  const stepLabels = [
    t.step1Title,
    t.step2Title,
    t.step3Title,
    ...(purpose === "education" ? [t.step4Title] : []),
  ];

  function handleNext() {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      handleGetResults();
    }
  }

  function handleBack() {
    if (showResults) {
      setShowResults(false);
      setCurrentStep(totalSteps);
    } else if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  }

  function handleGetResults() {
    setShowResults(true);
  }

  const matches: SchemeMatch[] = rankSchemes({
    annualIncome,
    hasSCCertificate,
    gender,
    purpose,
    loanAmount,
    educationLevel,
  });

  function scrollToCalc() {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="recommender" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#059669]/10 text-[#059669] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Module 1
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f172a]">{t.recommenderTitle}</h2>
          <p className="text-[#64748b] mt-2">{t.recommenderSubtitle}</p>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden">
          {/* Step Indicator */}
          {!showResults && (
            <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-6 py-4">
              <div className="flex items-center justify-between">
                {stepLabels.map((label, idx) => {
                  const step = idx + 1;
                  const isCompleted = step < currentStep;
                  const isActive = step === currentStep;
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                            isCompleted
                              ? "bg-[#059669] text-white"
                              : isActive
                              ? "bg-[#0f172a] text-white"
                              : "bg-[#e2e8f0] text-[#94a3b8]"
                          )}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : step}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-medium text-center hidden sm:block",
                            isActive ? "text-[#0f172a]" : "text-[#94a3b8]"
                          )}
                        >
                          {label}
                        </span>
                      </div>
                      {idx < stepLabels.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 mx-1 transition-all",
                            isCompleted ? "bg-[#059669]" : "bg-[#e2e8f0]"
                          )}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="px-6 py-8">
            {!showResults ? (
              <>
                {currentStep === 1 && (
                  <Step1Income
                    annualIncome={annualIncome}
                    setAnnualIncome={setAnnualIncome}
                    hasSCCertificate={hasSCCertificate}
                    setHasSCCertificate={setHasSCCertificate}
                    gender={gender}
                    setGender={setGender}
                  />
                )}
                {currentStep === 2 && (
                  <Step2Purpose purpose={purpose} setPurpose={setPurpose} />
                )}
                {currentStep === 3 && (
                  <Step3Amount
                    loanAmount={loanAmount}
                    setLoanAmount={setLoanAmount}
                    purpose={purpose}
                  />
                )}
                {currentStep === 4 && purpose === "education" && (
                  <Step4Education
                    educationLevel={educationLevel}
                    setEducationLevel={setEducationLevel}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-8">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 border-2 border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] font-semibold py-3 rounded-xl transition-all text-sm"
                    >
                      {t.btnBack}
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!hasSCCertificate && currentStep === 1}
                    className={cn(
                      "flex-1 font-semibold py-3 rounded-xl transition-all text-sm",
                      !hasSCCertificate && currentStep === 1
                        ? "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
                        : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                    )}
                  >
                    {currentStep < totalSteps ? t.btnNext : t.btnGetResults}
                  </button>
                </div>
                {!hasSCCertificate && currentStep === 1 && (
                  <p className="text-xs text-center text-red-500 mt-2">{t.noSc}</p>
                )}
              </>
            ) : (
              <>
                <ResultsPanel matches={matches} onCalculateEMI={() => scrollToCalc()} />
                <button
                  onClick={handleBack}
                  className="mt-6 w-full border-2 border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  {t.btnBack}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
