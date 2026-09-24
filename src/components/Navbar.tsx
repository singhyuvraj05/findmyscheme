"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { labelKey: "navRecommender" as const, href: "#recommender" },
  { labelKey: "navCalculator" as const, href: "#calculator" },
  { labelKey: "navPartners" as const, href: "#partners" },
  { labelKey: "navDossier" as const, href: "#dossier" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a] shadow-lg border-b border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d97706] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-base leading-tight">
                  {lang === "en" ? "Samriddhi-AI" : "समृद्धि-AI"}
                </div>
                <div className="text-[#94a3b8] text-[10px] leading-tight hidden sm:block">
                  {t.mosje}
                </div>
              </div>
            </div>
            {/* MoSJE Badge */}
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border border-[#d97706] text-[#d97706] bg-[#d97706]/10">
              MoSJE · SIH 26092
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:bg-[#1e293b] rounded-md transition-colors"
              >
                {t[item.labelKey]}
              </a>
            ))}
          </div>

          {/* Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center bg-[#1e293b] rounded-full p-0.5 border border-[#334155]">
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                  lang === "en"
                    ? "bg-[#059669] text-white shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full transition-all",
                  lang === "hi"
                    ? "bg-[#059669] text-white shadow-sm"
                    : "text-[#94a3b8] hover:text-white"
                )}
              >
                हिं
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#94a3b8] hover:text-white p-1"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1e293b] bg-[#0f172a] px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm text-[#94a3b8] hover:text-white hover:bg-[#1e293b] rounded-md transition-colors"
            >
              {t[item.labelKey]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
