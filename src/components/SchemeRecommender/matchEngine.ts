import type { Scheme, SchemePurpose, GenderRestriction } from "@/data/schemes";
import { schemes } from "@/data/schemes";

export interface UserInput {
  annualIncome: number;
  hasSCCertificate: boolean;
  gender: "male" | "female";
  purpose: SchemePurpose;
  loanAmount: number;
  educationLevel?: "graduate" | "postgraduate" | "professional" | "abroad";
}

export interface SchemeMatch {
  scheme: Scheme;
  score: number;       // 0-100
  breakdown: {
    income: number;    // pts
    amount: number;    // pts
    purpose: number;   // pts
    gender: number;    // pts
    education: number; // pts
  };
  eligible: boolean;
  ineligibleReason?: string;
}

function amountScore(requested: number, max: number, min: number): number {
  if (requested < min || requested > max) return 0;
  // Perfect score if in lower 70% of range; tapers near the max
  const ratio = requested / max;
  if (ratio <= 0.7) return 40;
  return Math.round(40 * (1 - (ratio - 0.7) / 0.3));
}

function purposeScore(
  schemePurposes: SchemePurpose[],
  userPurpose: SchemePurpose
): number {
  return schemePurposes.includes(userPurpose) ? 30 : 0;
}

function genderScore(
  restriction: GenderRestriction,
  gender: "male" | "female"
): number {
  if (restriction === null) return 5;   // neutral bonus
  if (restriction === "female" && gender === "female") return 15;
  return 0;
}

function educationScore(
  educationRequired: boolean,
  purpose: SchemePurpose
): number {
  if (educationRequired && purpose === "education") return 15;
  if (!educationRequired && purpose !== "education") return 5;
  return 0;
}

export function scoreScheme(scheme: Scheme, input: UserInput): SchemeMatch {
  // Hard gate: income
  if (input.annualIncome > scheme.incomeLimit) {
    return {
      scheme,
      score: 0,
      breakdown: { income: 0, amount: 0, purpose: 0, gender: 0, education: 0 },
      eligible: false,
      ineligibleReason: `Annual income exceeds scheme limit of ₹${(scheme.incomeLimit / 100000).toFixed(2)} Lakhs`,
    };
  }

  // Hard gate: SC certificate
  if (!input.hasSCCertificate) {
    return {
      scheme,
      score: 0,
      breakdown: { income: 0, amount: 0, purpose: 0, gender: 0, education: 0 },
      eligible: false,
      ineligibleReason: "SC/ST Certificate is mandatory",
    };
  }

  // Hard gate: gender restriction
  if (scheme.genderRestriction === "female" && input.gender !== "female") {
    return {
      scheme,
      score: 0,
      breakdown: { income: 0, amount: 0, purpose: 0, gender: 0, education: 0 },
      eligible: false,
      ineligibleReason: "This scheme is exclusively for women applicants",
    };
  }

  // Hard gate: education scheme vs non-education purpose
  if (scheme.educationRequired && input.purpose !== "education") {
    return {
      scheme,
      score: 0,
      breakdown: { income: 0, amount: 0, purpose: 0, gender: 0, education: 0 },
      eligible: false,
      ineligibleReason: "This scheme is for education purposes only",
    };
  }

  const income = 10;  // base points for passing income gate
  const amount = amountScore(input.loanAmount, scheme.maxAmount, scheme.minAmount);
  const purpose = purposeScore(scheme.purpose, input.purpose);
  const gender = genderScore(scheme.genderRestriction, input.gender);
  const education = educationScore(scheme.educationRequired, input.purpose);

  const raw = income + amount + purpose + gender + education;
  const score = Math.min(Math.round(raw), 100);

  return {
    scheme,
    score,
    breakdown: { income, amount, purpose, gender, education },
    eligible: score > 0,
  };
}

export function rankSchemes(input: UserInput): SchemeMatch[] {
  return schemes
    .map((s) => scoreScheme(s, input))
    .sort((a, b) => b.score - a.score);
}
