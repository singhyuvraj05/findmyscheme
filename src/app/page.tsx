"use client";

import React from "react";
import { LangProvider } from "@/context/LangContext";
import { AppStateProvider } from "@/context/AppStateContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SchemeRecommender from "@/components/SchemeRecommender";
import EMICalculator from "@/components/EMICalculator";
import PartnerLocator from "@/components/PartnerLocator";
import ReadinessDossier from "@/components/ReadinessDossier";
import { ShieldCheck } from "lucide-react";

function CivicFooter() {
  return (
    <footer className="bg-[#0f172a] text-[#94a3b8] text-xs border-t border-[#1e293b] py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
            <span className="text-white font-bold text-sm tracking-wide">
              FindMyScheme
            </span>
          </div>
          <p className="text-center md:text-left text-[#64748b]">
            AI-Driven Scheme Matching for Marginalized SC Entrepreneurs
          </p>
          <p className="text-[11px] text-[#475569] mt-0.5">
            Ministry of Social Justice and Empowerment (MoSJE) · Government of India
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1e293b] border border-[#334155] text-[#38bdf8] font-mono">
              SIH Problem Statement 26092
            </span>
          </div>
          <p className="text-[#64748b] text-[11px] flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            Directing SC credit beneficiaries to verified channel financing partners
          </p>
          <p className="text-[10px] text-[#475569]">
            © {new Date().getFullYear()} FindMyScheme · Built for Smart India Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <AppStateProvider>
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <SchemeRecommender />
            <EMICalculator />
            <PartnerLocator />
            <ReadinessDossier />
          </main>
          <CivicFooter />
        </div>
      </AppStateProvider>
    </LangProvider>
  );
}
