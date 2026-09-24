"use client";

import React, { useState } from "react";
import type { Partner } from "@/data/partners";
import { getHealthClasses, getHealthLabel } from "./partnerUtils";
import { useAppState } from "@/context/AppStateContext";
import { cn } from "@/lib/utils";

// Approximate city coordinates mapped to a 800×500 SVG viewport of India
const CITY_COORDS: Record<string, { cx: number; cy: number }> = {
  "New Delhi":   { cx: 310, cy: 148 },
  "East Delhi":  { cx: 325, cy: 155 },
  Mumbai:        { cx: 240, cy: 305 },
  Chennai:       { cx: 355, cy: 400 },
  Kolkata:       { cx: 500, cy: 250 },
  Lucknow:       { cx: 380, cy: 185 },
  Jaipur:        { cx: 270, cy: 195 },
  Hyderabad:     { cx: 340, cy: 360 },
  Bhopal:        { cx: 305, cy: 255 },
  Patna:         { cx: 440, cy: 215 },
  Ahmedabad:     { cx: 218, cy: 255 },
};

function getCityForPartner(partner: Partner): { cx: number; cy: number } {
  return CITY_COORDS[partner.district] ?? { cx: 350, cy: 280 };
}

const HEALTH_DOT: Record<string, string> = {
  active:     "#059669",
  moderate:   "#d97706",
  restricted: "#ef4444",
};

interface MapViewProps {
  partners: Partner[];
}

export default function MapView({ partners }: MapViewProps) {
  const [hovered, setHovered] = useState<Partner | null>(null);
  const { selectedPartner, setSelectedPartner } = useAppState();

  // Group partners by district for clustered display
  const byDistrict = new Map<string, Partner[]>();
  partners.forEach((p) => {
    const key = p.district;
    if (!byDistrict.has(key)) byDistrict.set(key, []);
    byDistrict.get(key)!.push(p);
  });

  return (
    <div className="relative bg-[#f0f9ff] border-2 border-[#e2e8f0] rounded-2xl overflow-hidden">
      {/* Legend */}
      <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm border border-[#e2e8f0] rounded-xl p-3 space-y-1.5 text-xs shadow-sm">
        {(["active", "moderate", "restricted"] as const).map((h) => (
          <div key={h} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: HEALTH_DOT[h] }} />
            <span className="text-[#64748b]">{getHealthLabel(h)}</span>
          </div>
        ))}
      </div>

      {/* India SVG outline (simplified path) */}
      <svg
        viewBox="0 0 800 520"
        className="w-full h-auto min-h-[360px]"
        style={{ fontFamily: "inherit" }}
      >
        {/* Simplified India outline */}
        <path
          d="M 195 80 L 220 70 L 270 75 L 310 60 L 380 55 L 440 65 L 500 80 L 560 100 L 590 130 L 600 170 L 590 210 L 570 240 L 555 270 L 540 300 L 520 330 L 500 355 L 480 375 L 460 400 L 440 420 L 420 440 L 400 460 L 385 475 L 370 480 L 355 470 L 340 450 L 325 430 L 300 410 L 270 395 L 245 375 L 220 350 L 200 325 L 190 295 L 180 265 L 175 235 L 170 200 L 165 165 L 170 135 L 180 110 L 195 80 Z"
          fill="#dbeafe"
          stroke="#93c5fd"
          strokeWidth="2"
        />
        {/* State rough dividers (decorative) */}
        <line x1="305" y1="100" x2="310" y2="220" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="310" y1="220" x2="430" y2="280" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="250" y1="180" x2="420" y2="175" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="290" y1="290" x2="450" y2="290" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="310" y1="360" x2="480" y2="360" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4 3" />

        {/* Partner dots — one cluster per district */}
        {Array.from(byDistrict.entries()).map(([district, distPartners]) => {
          const coords = getCityForPartner(distPartners[0]);
          const isAnySelected = distPartners.some((p) => p.id === selectedPartner?.id);
          const primaryHealth = distPartners[0].fundHealth;
          const color = HEALTH_DOT[primaryHealth];
          const count = distPartners.length;

          return (
            <g key={district}>
              {/* Outer glow ring for selected */}
              {isAnySelected && (
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={22}
                  fill="none"
                  stroke="#059669"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                  opacity={0.8}
                />
              )}
              {/* Dot */}
              <circle
                cx={coords.cx}
                cy={coords.cy}
                r={count > 1 ? 13 : 9}
                fill={color}
                stroke="white"
                strokeWidth={2}
                className="cursor-pointer"
                opacity={0.9}
                onMouseEnter={() => {
                  setHovered(distPartners[0]);
                }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelectedPartner(distPartners[0])}
              />
              {/* Count badge */}
              {count > 1 && (
                <text
                  x={coords.cx}
                  y={coords.cy + 4}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight="bold"
                  fill="white"
                  className="pointer-events-none select-none"
                >
                  {count}
                </text>
              )}
              {/* District label */}
              <text
                x={coords.cx}
                y={coords.cy - (count > 1 ? 18 : 14)}
                textAnchor="middle"
                fontSize={9}
                fill="#334155"
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                {district.length > 10 ? district.slice(0, 10) + "…" : district}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 bg-white border border-[#e2e8f0] rounded-xl shadow-lg p-3 z-20 animate-fade-in">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-sm text-[#0f172a]">{hovered.name}</p>
              <p className="text-xs text-[#64748b] mt-0.5">{hovered.district}, {hovered.state}</p>
            </div>
            <span className={cn("text-[10px] px-2 py-1 rounded-full font-bold shrink-0", getHealthClasses(hovered.fundHealth).badge)}>
              {getHealthLabel(hovered.fundHealth)}
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mt-1.5">{hovered.address}</p>
          <p className="text-xs font-medium text-[#059669] mt-1">📞 {hovered.phone}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-3 left-3 text-[10px] text-[#94a3b8] hidden sm:block">
        Click a dot to select · Hover for details
      </div>
    </div>
  );
}
