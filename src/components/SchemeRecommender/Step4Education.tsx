"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { cn } from "@/lib/utils";
import { GraduationCap, Globe } from "lucide-react";

type EduLevel = "graduate" | "postgraduate" | "professional" | "abroad";

interface Step4Props {
  educationLevel: EduLevel;
  setEducationLevel: (v: EduLevel) => void;
}

const levels: { value: EduLevel; labelKey: "eduGraduate" | "eduPostGraduate" | "eduProfessional" | "eduStudyAbroad"; desc: string; icon: React.ReactNode }[] = [
  {
    value: "graduate",
    labelKey: "eduGraduate",
    desc: "BA, B.Com, B.Sc, BCA, BBA etc.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: "postgraduate",
    labelKey: "eduPostGraduate",
    desc: "MA, M.Com, M.Sc, MCA, MBA etc.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: "professional",
    labelKey: "eduProfessional",
    desc: "MBBS, BE/BTech, LLB, CA, MBA (IIM) etc.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: "abroad",
    labelKey: "eduStudyAbroad",
    desc: "Any recognised degree programme outside India",
    icon: <Globe className="w-5 h-5" />,
  },
];

export default function Step4Education({ educationLevel, setEducationLevel }: Step4Props) {
  const { t } = useLang();

  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm text-[#64748b] mb-4">{t.educationLevel}</p>
      {levels.map((lvl) => (
        <button
          key={lvl.value}
          onClick={() => setEducationLevel(lvl.value)}
          className={cn(
            "w-full border-2 rounded-xl p-3 text-left transition-all flex items-center gap-3",
            educationLevel === lvl.value
              ? "border-purple-400 bg-purple-50 text-purple-700"
              : "border-[#e2e8f0] hover:border-[#cbd5e1] text-[#334155]"
          )}
        >
          <div className={educationLevel === lvl.value ? "text-purple-500" : "text-[#94a3b8]"}>
            {lvl.icon}
          </div>
          <div>
            <p className="font-semibold text-sm">{t[lvl.labelKey]}</p>
            <p className="text-xs opacity-70">{lvl.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
