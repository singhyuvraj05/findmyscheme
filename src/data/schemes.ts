export type SchemePurpose = "micro-enterprise" | "term-loan" | "education";
export type GenderRestriction = "female" | null;

export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  shortName: string;
  description: string;
  descriptionHi: string;
  purpose: SchemePurpose[];
  maxAmount: number;         // in INR
  minAmount: number;
  interestRate: number;      // % p.a. (concessional)
  commercialRate: number;    // % p.a. (comparison benchmark)
  incomeLimit: number;       // annual family income cap in INR
  genderRestriction: GenderRestriction;
  educationRequired: boolean;
  promoterContribution: number;  // fraction e.g. 0.10 = 10%
  govtSubsidy: number;           // fraction e.g. 0.90 = 90%
  moratoriumMin: number;         // months
  moratoriumMax: number;         // months
  tenureMaxYears: number;
  eligibilityCriteria: string[];
  documents: string[];
  color: string;   // Tailwind bg color class for card accent
  icon: string;    // emoji
}

export const schemes: Scheme[] = [
  {
    id: "micro-finance",
    name: "Micro Finance Scheme",
    nameHi: "सूक्ष्म वित्त योजना",
    shortName: "MFS",
    description:
      "Concessional micro-credit for SC beneficiaries setting up small income-generating units. Funds flow through SCA/NBFC-MFI channel partners. Ideal for first-time borrowers.",
    descriptionHi:
      "SC लाभार्थियों के लिए छोटी आय-उत्पादक इकाइयाँ स्थापित करने के लिए रियायती माइक्रो-क्रेडिट।",
    purpose: ["micro-enterprise"],
    maxAmount: 140000,
    minAmount: 20000,
    interestRate: 7,
    commercialRate: 13.5,
    incomeLimit: 500000,
    genderRestriction: null,
    educationRequired: false,
    promoterContribution: 0.1,
    govtSubsidy: 0.9,
    moratoriumMin: 3,
    moratoriumMax: 6,
    tenureMaxYears: 3,
    eligibilityCriteria: [
      "Applicant must be a Scheduled Caste (SC) individual",
      "Annual family income must not exceed ₹5.00 Lakhs",
      "Valid SC/ST Caste Certificate required",
      "Loan purpose must be income-generating micro-enterprise",
      "Minimum age: 18 years; Maximum age: 55 years",
      "Must not be a defaulter of any government loan",
    ],
    documents: [
      "SC/ST Caste Certificate",
      "Annual Income Certificate",
      "Business Project Report",
      "Aadhaar Card",
      "PAN Card",
      "Bank Account Statement (6 months)",
      "2 Passport-size Photographs",
    ],
    color: "bg-emerald-50 border-emerald-200",
    icon: "🏪",
  },
  {
    id: "mahila-samriddhi",
    name: "Mahila Samriddhi Yojana",
    nameHi: "महिला समृद्धि योजना",
    shortName: "MSY",
    description:
      "Women-centric ultra-low-interest micro-finance scheme for SC women entrepreneurs. Offered through Self-Help Groups (SHGs) and NBFC-MFIs. Moratorium up to 12 months.",
    descriptionHi:
      "SC महिला उद्यमियों के लिए अति-कम ब्याज वाली महिला-केंद्रित माइक्रो-फाइनेंस योजना।",
    purpose: ["micro-enterprise"],
    maxAmount: 140000,
    minAmount: 20000,
    interestRate: 5,
    commercialRate: 13.5,
    incomeLimit: 500000,
    genderRestriction: "female",
    educationRequired: false,
    promoterContribution: 0.05,
    govtSubsidy: 0.95,
    moratoriumMin: 6,
    moratoriumMax: 12,
    tenureMaxYears: 3,
    eligibilityCriteria: [
      "Applicant must be a SC woman aged 18-55 years",
      "Annual family income must not exceed ₹5.00 Lakhs",
      "Valid SC/ST Caste Certificate required",
      "Preference to SHG members and women from BPL households",
      "Loan purpose must be micro-enterprise or income-generating activity",
      "Must not be a defaulter of any government loan",
    ],
    documents: [
      "SC/ST Caste Certificate",
      "Annual Income Certificate",
      "Business Project Report",
      "Aadhaar Card",
      "PAN Card",
      "Bank Account Statement (6 months)",
      "SHG Membership Certificate (if applicable)",
      "2 Passport-size Photographs",
    ],
    color: "bg-pink-50 border-pink-200",
    icon: "👩‍💼",
  },
  {
    id: "term-loan",
    name: "Term Loan Scheme",
    nameHi: "टर्म लोन योजना",
    shortName: "TLS",
    description:
      "Capital investment loan for SC entrepreneurs expanding businesses or setting up new enterprises. Suitable for purchase of machinery, equipment, and working capital. Channelled through PSBs and RRBs.",
    descriptionHi:
      "SC उद्यमियों के लिए पूँजी निवेश ऋण जो व्यापार का विस्तार कर रहे हैं।",
    purpose: ["term-loan", "micro-enterprise"],
    maxAmount: 5000000,
    minAmount: 140001,
    interestRate: 8,
    commercialRate: 13.5,
    incomeLimit: 500000,
    genderRestriction: null,
    educationRequired: false,
    promoterContribution: 0.1,
    govtSubsidy: 0.9,
    moratoriumMin: 3,
    moratoriumMax: 6,
    tenureMaxYears: 10,
    eligibilityCriteria: [
      "Applicant must be a Scheduled Caste (SC) individual or SC-owned enterprise",
      "Annual family income must not exceed ₹5.00 Lakhs",
      "Valid SC/ST Caste Certificate required",
      "Detailed Business Project Report with financial projections mandatory",
      "SC enterprise ownership: minimum 51% SC ownership",
      "Minimum age: 18 years",
    ],
    documents: [
      "SC/ST Caste Certificate",
      "Annual Income Certificate",
      "Detailed Business Project Report",
      "Aadhaar Card",
      "PAN Card",
      "Bank Account Statement (12 months)",
      "Enterprise registration documents",
      "Quotations for machinery/equipment",
      "2 Passport-size Photographs",
    ],
    color: "bg-blue-50 border-blue-200",
    icon: "🏭",
  },
  {
    id: "education-loan",
    name: "National Education Loan Scheme",
    nameHi: "राष्ट्रीय शिक्षा ऋण योजना",
    shortName: "NELS",
    description:
      "Concessional education loans for SC students pursuing professional or higher education in India or abroad. Covers tuition, hostel, books, and travel. Moratorium extends through course duration + 12 months.",
    descriptionHi:
      "SC छात्रों के लिए व्यावसायिक या उच्च शिक्षा के लिए रियायती शिक्षा ऋण।",
    purpose: ["education"],
    maxAmount: 2000000,
    minAmount: 50000,
    interestRate: 6.5,
    commercialRate: 11.5,
    incomeLimit: 500000,
    genderRestriction: null,
    educationRequired: true,
    promoterContribution: 0.05,
    govtSubsidy: 0.95,
    moratoriumMin: 12,
    moratoriumMax: 12,
    tenureMaxYears: 10,
    eligibilityCriteria: [
      "Applicant must be a Scheduled Caste (SC) student",
      "Annual family income must not exceed ₹5.00 Lakhs",
      "Valid SC/ST Caste Certificate required",
      "Must have secured admission to a recognised professional/higher education course",
      "Courses covered: Graduate, Post-Graduate, Professional (MBBS, BE, Law, MBA), Study Abroad",
      "Academic merit considered: minimum 50% in qualifying examination",
    ],
    documents: [
      "SC/ST Caste Certificate",
      "Annual Income Certificate",
      "Admission letter from recognised institution",
      "Course fee structure from institution",
      "Aadhaar Card",
      "PAN Card",
      "Mark sheets of previous qualifying examination",
      "Bank Account Statement",
      "For Study Abroad: valid passport, visa (if available)",
      "2 Passport-size Photographs",
    ],
    color: "bg-purple-50 border-purple-200",
    icon: "🎓",
  },
];

export function getSchemeById(id: string): Scheme | undefined {
  return schemes.find((s) => s.id === id);
}
