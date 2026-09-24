"use client";

import React, { useState, useMemo } from "react";
import { useLang } from "@/context/LangContext";
import { searchPartners, getTopPartners, partners as allPartners } from "@/data/partners";
import type { PartnerType, FundHealth } from "@/data/partners";
import { sortByRating } from "./partnerUtils";
import PartnerCard from "./PartnerCard";
import MapView from "./MapView";
import { Search, List, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPES: PartnerType[] = ["SCA", "PSB", "RRB", "NBFC-MFI"];
const HEALTH_OPTIONS: FundHealth[] = ["active", "moderate", "restricted"];

export default function PartnerLocator() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [typeFilters, setTypeFilters] = useState<PartnerType[]>([]);
  const [healthFilters, setHealthFilters] = useState<FundHealth[]>([]);
  const [view, setView] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const results = searchPartners(query, typeFilters, healthFilters);
    return sortByRating(results);
  }, [query, typeFilters, healthFilters]);

  const topPartners = useMemo(() => getTopPartners(3), []);

  function toggleType(t: PartnerType) {
    setTypeFilters((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function toggleHealth(h: FundHealth) {
    setHealthFilters((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
  }

  const healthLabels: Record<FundHealth, string> = {
    active: t.healthActive,
    moderate: t.healthModerate,
    restricted: t.healthRestricted,
  };

  const healthBadgeClass: Record<FundHealth, string> = {
    active: "border-emerald-300 bg-emerald-50 text-emerald-700",
    moderate: "border-yellow-300 bg-yellow-50 text-yellow-700",
    restricted: "border-red-300 bg-red-50 text-red-700",
  };

  return (
    <section id="partners" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#059669]/10 text-[#059669] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            Module 3
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f172a]">{t.partnersTitle}</h2>
          <p className="text-[#64748b] mt-2">{t.partnersSubtitle}</p>
        </div>

        {/* Top Recommended (always visible) */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-[#334155] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            {t.topRecommended}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {topPartners.map((p, i) => (
              <PartnerCard key={p.id} partner={p} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* Search + Controls */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-sm outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                showFilters
                  ? "border-[#059669] bg-[#059669]/10 text-[#059669]"
                  : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#cbd5e1]"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {(typeFilters.length + healthFilters.length) > 0 && (
                <span className="bg-[#059669] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {typeFilters.length + healthFilters.length}
                </span>
              )}
            </button>
            {/* View Toggle */}
            <div className="flex border border-[#e2e8f0] rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setView("list")}
                className={cn("px-3 py-2.5 transition-all", view === "list" ? "bg-[#0f172a] text-white" : "text-[#64748b] hover:bg-[#f8fafc]")}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("map")}
                className={cn("px-3 py-2.5 transition-all", view === "map" ? "bg-[#0f172a] text-white" : "text-[#64748b] hover:bg-[#f8fafc]")}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <div>
                <p className="text-xs font-semibold text-[#64748b] mb-2">{t.filterType}</p>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map((tp) => (
                    <button
                      key={tp}
                      onClick={() => toggleType(tp)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                        typeFilters.includes(tp)
                          ? "bg-[#0f172a] border-[#0f172a] text-white"
                          : "border-[#e2e8f0] text-[#64748b] hover:border-[#0f172a]"
                      )}
                    >
                      {tp}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#64748b] mb-2">{t.filterHealth}</p>
                <div className="flex flex-wrap gap-2">
                  {HEALTH_OPTIONS.map((h) => (
                    <button
                      key={h}
                      onClick={() => toggleHealth(h)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                        healthFilters.includes(h)
                          ? healthBadgeClass[h] + " font-bold"
                          : "border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1]"
                      )}
                    >
                      {healthLabels[h]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-[#64748b] mb-4">
          {filtered.length} partner{filtered.length !== 1 ? "s" : ""} found
          {query && ` for "${query}"`}
        </p>

        {/* View: List or Map */}
        {view === "list" ? (
          filtered.length === 0 ? (
            <div className="text-center py-12 text-[#94a3b8]">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>{t.noResults}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          )
        ) : (
          <MapView partners={filtered.length > 0 ? filtered : allPartners} />
        )}
      </div>
    </section>
  );
}
