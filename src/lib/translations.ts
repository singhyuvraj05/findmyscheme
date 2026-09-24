export type Lang = "en" | "hi";

export const translations = {
  en: {
    // App
    appName: "FindMyScheme",
    appTagline: "AI-Driven Scheme Matching for SC Entrepreneurs",
    mosje: "Ministry of Social Justice & Empowerment",
    poweredBy: "Powered by AI",

    // Nav
    navRecommender: "Scheme Finder",
    navCalculator: "EMI Calculator",
    navPartners: "Find Partners",
    navDossier: "My Dossier",

    // Hero
    heroTitle: "Find Your Perfect Government Scheme",
    heroSubtitle:
      "FindMyScheme matches Scheduled Caste entrepreneurs to concessional MoSJE credit schemes, calculates realistic EMIs, and routes you to verified channel partners — in seconds.",
    heroCta: "Start Scheme Matching",
    heroStat1: "₹0 Interest during Moratorium",
    heroStat2: "Up to 90% Govt. Subsidy",
    heroStat3: "100+ Channel Partners",
    heroStat4: "6.5% – 8% p.a. Concessional Rate",

    // Recommender
    recommenderTitle: "Smart Scheme Recommender",
    recommenderSubtitle:
      "Answer 4 quick questions to get your personalised scheme match score",
    step1Title: "Income & Eligibility",
    step2Title: "Purpose of Loan",
    step3Title: "Loan Amount",
    step4Title: "Education Details",
    annualIncome: "Annual Family Income",
    scCertificate: "I hold a valid SC/ST Certificate",
    scRequired: "SC/ST Certificate is mandatory for all MoSJE schemes",
    gender: "Applicant Gender",
    male: "Male",
    female: "Female",
    purpose: "Purpose of Funding",
    purposeMicro: "Micro-Enterprise (≤ ₹1.40 L)",
    purposeTerm: "Business Expansion / Term Loan",
    purposeEducation: "Higher Education",
    loanAmount: "Required Loan Amount",
    educationLevel: "Education Level",
    eduGraduate: "Graduate",
    eduPostGraduate: "Post Graduate",
    eduProfessional: "Professional (MBBS, BE, Law, MBA)",
    eduStudyAbroad: "Study Abroad",
    btnNext: "Next Step →",
    btnBack: "← Back",
    btnGetResults: "Get My Scheme Matches",
    resultsTitle: "Your Scheme Match Results",
    matchScore: "Match Score",
    maxLoan: "Max Loan",
    interestRate: "Interest Rate",
    govtSubsidy: "Govt. Subsidy",
    moratorium: "Moratorium",
    incomeTooHigh:
      "Your annual income exceeds ₹5.00 Lakhs — you may not qualify for MoSJE concessional schemes. Please verify with your local SCA.",
    calculateEmi: "Calculate EMI →",
    noSc: "Please confirm your SC/ST certificate to proceed.",
    months: "months",
    years: "years",

    // Calculator
    calcTitle: "EMI & Moratorium Calculator",
    calcSubtitle:
      "Compare your concessional MoSJE repayment vs. a standard commercial bank loan",
    loanAmountLabel: "Loan Amount",
    tenureLabel: "Repayment Tenure",
    moratoriumLabel: "Moratorium Period",
    mosjeRate: "MoSJE Concessional Rate",
    commercialRate: "Commercial Bank Rate",
    monthlyEmi: "Monthly EMI",
    totalInterest: "Total Interest",
    totalPayable: "Total Payable",
    youSave: "You Save",
    moratoriumInterest: "Interest during Moratorium",
    postMoratoriumEmi: "Post-Moratorium EMI",
    concessional: "MoSJE Concessional",
    commercial: "Commercial Bank",
    savingsBadge: "Your Savings with MoSJE",

    // Partners
    partnersTitle: "Geo-Spatial Partner Locator",
    partnersSubtitle:
      "Find verified channel partners near you, filtered by fund health and NPA status",
    searchPlaceholder: "Search by district or pincode…",
    filterType: "Partner Type",
    filterHealth: "Fund Health",
    allTypes: "All Types",
    allHealth: "All",
    healthActive: "Active",
    healthModerate: "Moderate",
    healthRestricted: "Restricted",
    schemesOffered: "Schemes Offered",
    npaLabel: "NPA",
    allocationLabel: "Allocation Used",
    selectPartner: "Select as My Channel Partner →",
    selected: "✓ Selected",
    mapView: "Map View",
    listView: "List View",
    noResults: "No partners found. Try a different district or filter.",
    topRecommended: "Top Recommended Partners",
    routingWarning:
      "⚠ Routing Restricted — High NPA. Applying here may delay your approval.",

    // Dossier
    dossierTitle: "Application Readiness Dossier",
    dossierSubtitle:
      "Your personalised pre-screening summary — ready to print and carry to your channel partner",
    openDossier: "Generate My Readiness Dossier",
    printDossier: "Print / Download",
    routingToken: "Routing Token",
    generatedOn: "Generated on",
    matchedScheme: "Matched Scheme",
    emiSummary: "EMI Summary",
    channelPartner: "Designated Channel Partner",
    documentChecklist: "Required Documents Checklist",
    docCaste: "SC/ST Caste Certificate (Signed by DC/SDM/Tahsildar)",
    docIncome: "Annual Income Certificate (issued in current financial year)",
    docProject: "Business Project Report / Study Plan",
    docAadhaar: "Aadhaar Card (self-attested photocopy)",
    docPan: "PAN Card",
    docBank: "Bank Account Passbook / Statement (last 6 months)",
    docPhoto: "2 recent passport-size photographs",
    noSchemeSelected:
      "No scheme selected yet. Complete the Scheme Finder first.",
    noPartnerSelected:
      "No channel partner selected yet. Use the Partner Locator.",
    promoterContribution: "Promoter's Contribution (Min.)",
    disclaimer:
      "This dossier is a pre-screening aid generated by FindMyScheme for informational purposes only. Final eligibility is determined by the designated Channel Partner and MoSJE guidelines.",
  },

  hi: {
    // App
    appName: "फाइंड माय स्कीम",
    appTagline: "SC उद्यमियों के लिए AI-संचालित योजना मिलान",
    mosje: "सामाजिक न्याय एवं अधिकारिता मंत्रालय",
    poweredBy: "AI द्वारा संचालित",

    // Nav
    navRecommender: "योजना खोजें",
    navCalculator: "EMI कैलकुलेटर",
    navPartners: "साझेदार खोजें",
    navDossier: "मेरा दस्तावेज़",

    // Hero
    heroTitle: "अपनी परफेक्ट सरकारी योजना खोजें",
    heroSubtitle:
      "FindMyScheme अनुसूचित जाति के उद्यमियों को MoSJE की रियायती ऋण योजनाओं से मिलाता है, वास्तविक EMI की गणना करता है, और सत्यापित चैनल पार्टनर तक पहुँचाता है।",
    heroCta: "योजना मिलान शुरू करें",
    heroStat1: "मोरेटोरियम पर ₹0 ब्याज",
    heroStat2: "90% तक सरकारी अनुदान",
    heroStat3: "100+ चैनल पार्टनर",
    heroStat4: "6.5% – 8% प्रति वर्ष रियायती दर",

    // Recommender
    recommenderTitle: "स्मार्ट योजना अनुशंसक",
    recommenderSubtitle:
      "अपना व्यक्तिगत योजना मिलान स्कोर पाने के लिए 4 त्वरित प्रश्नों का उत्तर दें",
    step1Title: "आय एवं पात्रता",
    step2Title: "ऋण का उद्देश्य",
    step3Title: "ऋण राशि",
    step4Title: "शिक्षा विवरण",
    annualIncome: "वार्षिक पारिवारिक आय",
    scCertificate: "मेरे पास वैध SC/ST प्रमाण पत्र है",
    scRequired: "MoSJE की सभी योजनाओं के लिए SC/ST प्रमाण पत्र अनिवार्य है",
    gender: "आवेदक का लिंग",
    male: "पुरुष",
    female: "महिला",
    purpose: "वित्तपोषण का उद्देश्य",
    purposeMicro: "सूक्ष्म उद्यम (≤ ₹1.40 L)",
    purposeTerm: "व्यवसाय विस्तार / टर्म लोन",
    purposeEducation: "उच्च शिक्षा",
    loanAmount: "आवश्यक ऋण राशि",
    educationLevel: "शिक्षा स्तर",
    eduGraduate: "स्नातक",
    eduPostGraduate: "स्नातकोत्तर",
    eduProfessional: "व्यावसायिक (MBBS, BE, Law, MBA)",
    eduStudyAbroad: "विदेश अध्ययन",
    btnNext: "अगला चरण →",
    btnBack: "← वापस",
    btnGetResults: "मेरे योजना मिलान देखें",
    resultsTitle: "आपके योजना मिलान परिणाम",
    matchScore: "मिलान स्कोर",
    maxLoan: "अधिकतम ऋण",
    interestRate: "ब्याज दर",
    govtSubsidy: "सरकारी अनुदान",
    moratorium: "मोरेटोरियम",
    incomeTooHigh:
      "आपकी वार्षिक आय ₹5.00 लाख से अधिक है — आप MoSJE रियायती योजनाओं के लिए पात्र नहीं हो सकते।",
    calculateEmi: "EMI की गणना करें →",
    noSc: "कृपया आगे बढ़ने के लिए SC/ST प्रमाण पत्र की पुष्टि करें।",
    months: "माह",
    years: "वर्ष",

    // Calculator
    calcTitle: "EMI और मोरेटोरियम कैलकुलेटर",
    calcSubtitle:
      "MoSJE की रियायती EMI की तुलना व्यावसायिक बैंक ऋण से करें",
    loanAmountLabel: "ऋण राशि",
    tenureLabel: "पुनर्भुगतान अवधि",
    moratoriumLabel: "मोरेटोरियम अवधि",
    mosjeRate: "MoSJE रियायती दर",
    commercialRate: "व्यावसायिक बैंक दर",
    monthlyEmi: "मासिक EMI",
    totalInterest: "कुल ब्याज",
    totalPayable: "कुल देय",
    youSave: "आपकी बचत",
    moratoriumInterest: "मोरेटोरियम के दौरान ब्याज",
    postMoratoriumEmi: "मोरेटोरियम के बाद EMI",
    concessional: "MoSJE रियायती",
    commercial: "व्यावसायिक बैंक",
    savingsBadge: "MoSJE से आपकी बचत",

    // Partners
    partnersTitle: "जियो-स्पेशल पार्टनर लोकेटर",
    partnersSubtitle:
      "फंड स्वास्थ्य और NPA स्थिति के आधार पर फ़िल्टर किए गए सत्यापित चैनल पार्टनर खोजें",
    searchPlaceholder: "जिले या पिनकोड से खोजें…",
    filterType: "पार्टनर प्रकार",
    filterHealth: "फंड स्वास्थ्य",
    allTypes: "सभी प्रकार",
    allHealth: "सभी",
    healthActive: "सक्रिय",
    healthModerate: "मध्यम",
    healthRestricted: "प्रतिबंधित",
    schemesOffered: "उपलब्ध योजनाएं",
    npaLabel: "NPA",
    allocationLabel: "आवंटन उपयोग",
    selectPartner: "चैनल पार्टनर के रूप में चुनें →",
    selected: "✓ चुना गया",
    mapView: "मानचित्र दृश्य",
    listView: "सूची दृश्य",
    noResults: "कोई पार्टनर नहीं मिला। अलग जिला या फ़िल्टर आज़माएं।",
    topRecommended: "शीर्ष अनुशंसित पार्टनर",
    routingWarning:
      "⚠ रूटिंग प्रतिबंधित — उच्च NPA। यहाँ आवेदन करने से देरी हो सकती है।",

    // Dossier
    dossierTitle: "आवेदन तत्परता दस्तावेज़",
    dossierSubtitle:
      "आपका व्यक्तिगत प्री-स्क्रीनिंग सारांश — प्रिंट करें और चैनल पार्टनर के पास ले जाएं",
    openDossier: "मेरा दस्तावेज़ बनाएं",
    printDossier: "प्रिंट / डाउनलोड",
    routingToken: "रूटिंग टोकन",
    generatedOn: "उत्पन्न दिनांक",
    matchedScheme: "मिलान योजना",
    emiSummary: "EMI सारांश",
    channelPartner: "नामित चैनल पार्टनर",
    documentChecklist: "आवश्यक दस्तावेज़ चेकलिस्ट",
    docCaste: "SC/ST जाति प्रमाण पत्र (DC/SDM/तहसीलदार द्वारा हस्ताक्षरित)",
    docIncome: "वार्षिक आय प्रमाण पत्र (चालू वित्त वर्ष में जारी)",
    docProject: "व्यवसाय परियोजना रिपोर्ट / अध्ययन योजना",
    docAadhaar: "आधार कार्ड (स्वयं-प्रमाणित फोटोकॉपी)",
    docPan: "पैन कार्ड",
    docBank: "बैंक खाता पासबुक / विवरण (अंतिम 6 माह)",
    docPhoto: "2 हालिया पासपोर्ट आकार की फोटो",
    noSchemeSelected:
      "अभी तक कोई योजना नहीं चुनी। पहले योजना खोजक पूरा करें।",
    noPartnerSelected:
      "अभी तक कोई चैनल पार्टनर नहीं चुना। पार्टनर लोकेटर का उपयोग करें।",
    promoterContribution: "प्रवर्तक का योगदान (न्यूनतम)",
    disclaimer:
      "यह दस्तावेज़ केवल सूचनात्मक उद्देश्यों के लिए FindMyScheme द्वारा उत्पन्न एक प्री-स्क्रीनिंग सहायता है। अंतिम पात्रता नामित चैनल पार्टनर और MoSJE दिशानिर्देशों द्वारा निर्धारित की जाती है।",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
