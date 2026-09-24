"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { useAppState } from "@/context/AppStateContext";
import type { Partner } from "@/data/partners";
import { getHealthClasses, getHealthLabel, getTypeBadgeClass, getTypeLabel, schemeIdToLabel, starRating } from "./partnerUtils";
import { MapPin, Phone, CheckCircle, AlertTriangle, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PartnerCardProps {
  partner: Partner;
  rank?: number;
}

export default function PartnerCard({ partner, rank }: PartnerCardProps) {
  const { t } = useLang();
  const { selectedPartner, setSelectedPartner } = useAppState();
  const isSelected = selectedPartner?.id === partner.id;
  const health = getHealthClasses(partner.fundHealth);

  return (
    <div
      className={cn(
        "border-2 rounded-2xl p-5 transition-all",
        isSelected
          ? "border-[#059669] bg-[#059669]/5 ring-2 ring-[#059669] ring-offset-1"
          : `border-[#e2e8f0] hover:border-[#cbd5e1] bg-white`
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-[#475569]" />
          </div>
          <div className="min-w-0">
            {rank && (
              <span className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-0.5 rounded-full">
                #{rank} Recommended
              </span>
            )}
            <h4 className="font-bold text-[#0f172a] text-sm mt-0.5 leading-snug">{partner.name}</h4>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", getTypeBadgeClass(partner.type))}>
                {partner.type}
              </span>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1", health.badge)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", health.dot)} />
                {getHealthLabel(partner.fundHealth)}
              </span>
            </div>
          </div>
        </div>
        {/* Star Rating */}
        <div className="text-right flex-shrink-0">
          <div className="text-[#d97706] text-sm font-bold">{partner.rating.toFixed(1)}</div>
          <div className="text-[10px] text-[#d97706] leading-tight">{starRating(partner.rating)}</div>
        </div>
      </div>

      {/* Address + Contact */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-start gap-2 text-xs text-[#64748b]">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#94a3b8]" />
          <span>{partner.address} — {partner.pincode}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <Phone className="w-3.5 h-3.5 flex-shrink-0 text-[#94a3b8]" />
          <span>{partner.phone}</span>
        </div>
      </div>

      {/* Schemes */}
      <div className="flex flex-wrap gap-1 mb-3">
        {partner.schemesOffered.map((s) => (
          <span key={s} className="text-[10px] bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-full font-medium border border-[#e2e8f0]">
            {schemeIdToLabel(s)}
          </span>
        ))}
      </div>

      {/* NPA + Allocation */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="bg-[#f8fafc] rounded-lg p-2 text-center">
          <div className="text-[#94a3b8]">{t.npaLabel}</div>
          <div className={cn("font-bold", partner.npaPercent > 10 ? "text-red-600" : partner.npaPercent > 6 ? "text-yellow-600" : "text-[#059669]")}>
            {partner.npaPercent.toFixed(1)}%
          </div>
        </div>
        <div className="bg-[#f8fafc] rounded-lg p-2 text-center">
          <div className="text-[#94a3b8]">{t.allocationLabel}</div>
          <div className={cn("font-bold", partner.allocationUsed > 90 ? "text-red-600" : partner.allocationUsed > 75 ? "text-yellow-600" : "text-[#059669]")}>
            {partner.allocationUsed}%
          </div>
        </div>
      </div>

      {/* Routing Warning for restricted */}
      {partner.fundHealth === "restricted" && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{t.routingWarning}</p>
        </div>
      )}

      {/* Select Button */}
      <button
        onClick={() => setSelectedPartner(isSelected ? null : partner)}
        className={cn(
          "w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
          isSelected
            ? "bg-[#059669] text-white"
            : partner.fundHealth === "restricted"
            ? "border-2 border-red-200 text-red-600 hover:bg-red-50"
            : "border-2 border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white"
        )}
      >
        {isSelected ? (
          <>
            <CheckCircle className="w-4 h-4" />
            {t.selected}
          </>
        ) : (
          t.selectPartner
        )}
      </button>
    </div>
  );
}
