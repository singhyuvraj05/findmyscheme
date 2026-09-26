# FindMyScheme

**Smart India Hackathon 2026 — SIH26092**
**AI-Driven Scheme Matching for Marginalized Entrepreneurs**

Ministry of Social Justice and Empowerment (MoSJE) · Department of Social Justice and Empowerment
Theme: Smart Automation · Category: Software
Team: CyberPirates

**Live Demo:** https://findmyscheme-app.vercel.app/

---

## Problem

The National Scheduled Castes Finance and Development Corporation (NSFDC) offers concessional credit and educational loans to SC beneficiaries with family income up to ₹5 lakh, routed through 100+ Channel Partners (State Channelizing Agencies, Public Sector Banks, Regional Rural Banks, and NBFC-MFIs). Direct loan applications aren't accepted.

Citizens struggle to:
- Identify which of NSFDC's credit schemes fits their need (Micro Finance Scheme, Term Loan, Aajeevika Micro-Finance, Udyam Nidhi, or Educational Loan Scheme)
- Locate the nearest authorized Channel Partner equipped to process their specific loan category
- Understand loan terms like EMI, moratorium periods, and interest rates without financial expertise

This leads to misrouted applications, offline confusion, and delayed disbursement.

## Solution

FindMyScheme is a multilingual, offline-first platform that takes a beneficiary from "which loan is for me?" to "which office do I go to?" in minutes.

- **Multilingual voice + text intake** — describe your need in Hindi, English, or regional languages
- **Smart Scheme Recommender** — a deterministic rule engine matches project type, cost, income, and education status to one of NSFDC's 5 credit schemes
- **Explainable results** — plain-language reasons for every match and near-miss, no financial expertise required
- **Financial Calculator** — EMI, moratorium, and total repayment projections per scheme
- **Geo-Spatial Partner Locator & Router** — nearest eligible Channel Partner, ranked by distance and fund-utilization health (filtering out partners with high NPAs/overdues)
- **Offline-first PWA** — core features work in low-connectivity rural areas
- **Application handoff** — generates a shareable summary and document checklist, then deep-links to the official PM SURAJ portal to apply

## Tech Stack

**Frontend:** Next.js, TypeScript, React Native, TailwindCSS, Zustand, Framer Motion

**Backend:** FastAPI (Python), REST APIs, WebSockets, Supabase, PostgreSQL, SQLAlchemy, Alembic, Celery, Redis

**AI & Language Processing:**
- Google Gemini (gemini-3.6-flash) — NLU / structured intake extraction
- Groq (qwen/qwen3.8-27b) — fast inference fallback
- Bhashini API — voice transcription & translation

**Maps & Geocoding:** Leaflet + OpenStreetMap (Nominatim, OSRM)

**Hosting & Deployment:** Docker, AWS, Cloudflare, Nginx

**Tools:** GitHub, Postman, Lucide-React, Storyset

## Architecture

1. **Client/Frontend** — Web app (Next.js) and mobile app (React Native), Beneficiary and Admin roles
2. **API/Application** — FastAPI: Auth & RBAC, Scheme Recommendation, Financial Calculator, Partner Routing, Admin Dashboard, Application History
3. **AI & Processing** — Bhashini (voice), Gemini (NLU extraction), Groq (fast inference fallback), Leaflet (geocoding)
4. **Recommendation Rule Engine & Partner Routing** — NSFDC scheme configs → deterministic eligibility + EMI rule engine → ranked, geo-matched partner list
5. **Data Layer** — PostgreSQL, Supabase, Redis, Celery
6. **Infrastructure/Deployment** — Cloudflare, Nginx, AWS, Docker

## NSFDC Schemes Covered

| Scheme | Max Project Cost | Max Loan | Rate | Tenure incl. Moratorium |
|---|---|---|---|---|
| Micro Finance Scheme (MFS) | ₹1.40 L | ₹1.25 L | 6.5% | 3 yrs + 3 mo |
| Term Loan | ₹50 L | ₹45 L | 8% | 7 yrs + 6 mo |
| Aajeevika Micro-Finance | ₹1.40 L | ₹1.25 L | 15% | 3 yrs + 3 mo |
| Udyam Nidhi (UNY) | ₹5 L | ₹4.5 L | 13–15% | 5 yrs + 3 mo |
| Educational Loan Scheme (ELS) | ₹40 L | 90% of fee | 6.5% | Up to 12 yrs |

## Known Assumptions & Limitations

- No public API exists for Channel Partner NPA/fund-utilization status; the prototype uses a seeded partner directory, updatable via an admin panel.
- Public Nominatim/OSRM servers rate-limit heavy traffic; production deployment would self-host these on existing AWS infrastructure.
- FindMyScheme does not submit loan applications directly — it hands off to the official PM SURAJ portal (pmsuraj.dosje.gov.in) for actual application filing.

## References

**Government & Regulatory Sources**
- National Scheduled Castes Finance and Development Corporation (NSFDC) — nsfdc.nic.in
- PM SURAJ Portal — pmsuraj.dosje.gov.in
- Ministry of Social Justice and Empowerment (MoSJE) — Scheme Guidelines
- SIH Problem Statement 26092

**Technical References**
- Google Gemini API Documentation
- Groq API Documentation
- Bhashini API Documentation
- Leaflet.js Documentation
- OpenStreetMap / Nominatim / OSRM Documentation

## Team

**CyberPirates** — DSPMU (Dr. Shyama Prasad Mukherjee University), Ranchi
