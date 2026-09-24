"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { ArrowRight, CheckCircle, TrendingDown, Users, Percent } from "lucide-react";

export default function HeroSection() {
  const { t } = useLang();

  const stats = [
    { icon: <TrendingDown className="w-5 h-5" />, text: t.heroStat1, color: "text-emerald-400" },
    { icon: <Percent className="w-5 h-5" />,       text: t.heroStat2, color: "text-yellow-400" },
    { icon: <Users className="w-5 h-5" />,          text: t.heroStat3, color: "text-blue-400" },
    { icon: <CheckCircle className="w-5 h-5" />,    text: t.heroStat4, color: "text-purple-400" },
  ];

  return (
    <section className="bg-[#0f172a] text-white py-20 px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#059669]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#059669]/20 border border-[#059669]/40 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          <span className="text-[#34d399] text-sm font-medium">
            Smart India Hackathon 2024 · Problem Statement 26092
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          <span className="text-white">{t.heroTitle}</span>
        </h1>

        <p className="text-[#94a3b8] text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* CTA */}
        <a
          href="#recommender"
          className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-[#059669]/30 hover:shadow-xl text-base"
        >
          {t.heroCta}
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-white text-sm font-semibold leading-snug">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
