# Product Requirements Document (PRD)

## Project: FindMyScheme
**Problem Statement ID:** 26092  
**Problem Statement Title:** AI-Driven Scheme Matching for Marginalized Entrepreneurs  
**Target Ministry:** Ministry of Social Justice and Empowerment (MoSJE)  
**Timeline:** 48-Hour Hackathon Demo MVP  

---

### 1. Executive Summary & Core Objective
Marginalized Scheduled Caste (SC) entrepreneurs often fail to access government concessional credit (6.5% - 8% p.a.) because direct lending is prohibited; funds must flow through over 100 Channel Financing Partners (SCAs, PSBs, RRBs, NBFC-MFIs). Applicants face severe confusion regarding scheme eligibility, miscalculated EMIs, and misdirected applications to distressed/ineligible bank branches.

FindMyScheme is a high-polish, bilingual (English/Hindi) web application designed to:
1. Match beneficiaries to exact credit or educational schemes using an interactive multi-step wizard.
2. Provide a realistic EMI and Moratorium financial planning tool.
3. Route applicants to the nearest active Channel Partner branch filtered by real-time NPA and fund utilization health.

---

### 2. Primary Feature Modules

#### Module 1: Smart Scheme Recommender Engine
- **Input Parameters:**
  - Annual Family Income (Cap check: <= ₹5.00 Lakhs).
  - Purpose: Micro-Enterprise, Term Loan / Expansion, Higher Education (Domestic / Abroad).
  - Required Funding Amount (₹20,000 to ₹50,00,000).
  - Education Level & SC Certificate Confirmation.
- **Output:**
  - Scheme Match Score (%) and breakdown:
    - *Micro Finance Scheme* (Projects up to ₹1.40 Lakh).
    - *Mahila Samriddhi Yojana* (Women-centric micro-units, ultra-low interest).
    - *Term Loan Scheme* (Capital investments up to ₹50.00 Lakh).
    - *National Education Loan Scheme* (Professional degrees, up to ₹20.00 Lakh).
  - Direct breakdown: Government Subsidy / Concessional Share (up to 90%), Promoters Contribution (minimum 10%), Interest rate band.

#### Module 2: Concessional Financial & Moratorium Calculator
- Dynamic sliders for Loan Amount, Tenure (1 to 10 years), and Moratorium Period (3 to 12 months).
- Visual EMI breakdown chart/card showing:
  - Repayment schedule during moratorium vs. post-moratorium.
  - Concessional interest savings vs. standard commercial bank loans (e.g., 7% MoSJE vs 13.5% Commercial Bank).

#### Module 3: Geo-Spatial Partner Locator & "Smart Router"
- Location input (Pincode / District / GPS Auto-detect).
- Filterable Channel Partners directory:
  - State Channelizing Agencies (SCAs)
  - Public Sector Banks (e.g., PNB, SBI, BoB)
  - Regional Rural Banks (RRBs) & NBFC-MFIs
- **Fund Health & Allocation Badge:**
  - Displays Partner Status: `Active / High Allocation` (Green), `Moderate Load` (Yellow), or `Routing Restricted (High NPA/Overdue)` (Red).
  - Recommends the top 3 highest-rated local partner branches to eliminate misrouted paperwork.

#### Module 4: Application Readiness Checklist & PDF Summary
- Generates a 1-page "Pre-Approved Application Readiness Dossier" summarizing:
  - Matched Scheme details.
  - Required document checklist (Caste Certificate, Income Certificate, Project Report).
  - Designated Channel Partner details with routing token.

---

### 3. UI/UX Design System
- **Theme:** Clean, modern, accessible civic-tech aesthetic. Deep Navy (`#0f172a`), Emerald/Saffron accents (`#059669`, `#d97706`), Neutral Gray background (`#f8fafc`).
- **Language Toggle:** English and Hindi headers/labels.
- **Components:** Metric score badges, dynamic sliders, tabbed navigation, and interactive branch search list with distance metrics.

---

### 4. Technical Architecture
- **Framework:** Next.js (App Router, TypeScript).
- **Styling:** Tailwind CSS + Lucide Icons + Shadcn UI primitives.
- **State & Data:** In-memory client datasets (`schemes.ts`, `partners.ts`) ensuring 100% demo stability with zero API latency.