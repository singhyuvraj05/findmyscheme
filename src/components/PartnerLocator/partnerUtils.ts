import type { Partner, FundHealth, PartnerType } from "@/data/partners";

export function getHealthLabel(health: FundHealth): string {
  const map: Record<FundHealth, string> = {
    active: "Active",
    moderate: "Moderate Load",
    restricted: "Routing Restricted",
  };
  return map[health];
}

export function getHealthClasses(health: FundHealth): { badge: string; border: string; dot: string } {
  const map: Record<FundHealth, { badge: string; border: string; dot: string }> = {
    active: {
      badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    moderate: {
      badge: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      border: "border-yellow-200",
      dot: "bg-yellow-500",
    },
    restricted: {
      badge: "bg-red-100 text-red-700 border border-red-200",
      border: "border-red-200",
      dot: "bg-red-500",
    },
  };
  return map[health];
}

export function getTypeLabel(type: PartnerType): string {
  const map: Record<PartnerType, string> = {
    SCA: "State Channelizing Agency",
    PSB: "Public Sector Bank",
    RRB: "Regional Rural Bank",
    "NBFC-MFI": "NBFC / Microfinance",
  };
  return map[type];
}

export function getTypeBadgeClass(type: PartnerType): string {
  const map: Record<PartnerType, string> = {
    SCA: "bg-purple-100 text-purple-700",
    PSB: "bg-blue-100 text-blue-700",
    RRB: "bg-orange-100 text-orange-700",
    "NBFC-MFI": "bg-pink-100 text-pink-700",
  };
  return map[type];
}

export function starRating(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

export function schemeIdToLabel(id: string): string {
  const map: Record<string, string> = {
    "micro-finance": "Micro Finance",
    "mahila-samriddhi": "Mahila Samriddhi",
    "term-loan": "Term Loan",
    "education-loan": "Education Loan",
  };
  return map[id] ?? id;
}

export function sortByRating(partners: Partner[]): Partner[] {
  return [...partners].sort((a, b) => {
    // Active > Moderate > Restricted, then by rating
    const healthOrder: Record<FundHealth, number> = { active: 0, moderate: 1, restricted: 2 };
    const hDiff = healthOrder[a.fundHealth] - healthOrder[b.fundHealth];
    if (hDiff !== 0) return hDiff;
    return b.rating - a.rating;
  });
}
