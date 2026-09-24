"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";
import type { SchemePurpose } from "@/data/schemes";
import { Store, TrendingUp, GraduationCap } from "lucide-react";

interface Step2Props {
  purpose: SchemePurpose;
  setPurpose: (v: SchemePurpose) => void;
}

const purposeOptions: {
  value: SchemePurpose;
  labelKey: "purposeMicro" | "purposeTerm" | "purposeEducation";
  icon: React.ReactNode;
  desc: string;
  color: string;
}[] = [
  {
    value: "micro-enterprise",
    labelKey: "purposeMicro",
    icon: <Store className="w-6 h-6" />,
    desc: "Small shops, artisan units, hawking, tailoring, repair shops etc.",
    color: "border-emerald-400 bg-emerald-50 text-emerald-700",
  },
  {
    value: "term-loan",
    labelKey: "purposeTerm",
    icon: <TrendingUp className="w-6 h-6" />,
    desc: "Machinery, equipment purchase, working capital, business expansion",
    color: "border-blue-400 bg-blue-50 text-blue-700",
  },
  {
    value: "education",
    labelKey: "purposeEducation",
    icon: <GraduationCap className="w-6 h-6" />,
    desc: "Professional degrees, graduate/postgraduate, study abroad",
    color: "border-purple-400 bg-purple-50 text-purple-700",
  },
];

export default function Step2Purpose({ purpose, setPurpose }: Step2Props) {
  const { t } = useLang();

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-[#64748b]">{t.purpose}</p>
      {purposeOptions.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setPurpose(opt.value)}
          className={cn(
            "w-full border-2 rounded-xl p-4 text-left transition-all flex items-start gap-4",
            purpose === opt.value
              ? opt.color
              : "border-[#e2e8f0] hover:border-[#cbd5e1] text-[#334155]"
          )}
        >
          <div className={cn("mt-0.5 flex-shrink-0", purpose === opt.value ? "" : "text-[#94a3b8]")}>
            {opt.icon}
          </div>
          <div>
            <p className="font-semibold text-sm">{t[opt.labelKey]}</p>
            <p className="text-xs mt-0.5 opacity-75">{opt.desc}</p>
          </div>
          {purpose === opt.value && (
            <div className="ml-auto flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
