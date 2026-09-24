export interface CalcInput {
  loanAmount: number;    // INR
  tenureMonths: number;  // total repayment months
  moratoriumMonths: number;
  annualRate: number;    // % p.a.
}

export interface CalcResult {
  monthlyRate: number;
  effectiveTenureMonths: number;
  moratoriumInterest: number;   // simple interest accrued
  emi: number;                  // post-moratorium monthly EMI
  totalInterest: number;        // moratorium + post-moratorium interest
  totalPayable: number;         // principal + total interest
}

export function calculateLoan(input: CalcInput): CalcResult {
  const { loanAmount, tenureMonths, moratoriumMonths, annualRate } = input;
  const monthlyRate = annualRate / 100 / 12;
  const effectiveTenureMonths = tenureMonths - moratoriumMonths;

  // Simple interest during moratorium
  const moratoriumInterest = loanAmount * monthlyRate * moratoriumMonths;

  // EMI formula on original principal (moratorium interest paid separately)
  let emi: number;
  if (monthlyRate === 0) {
    emi = loanAmount / effectiveTenureMonths;
  } else {
    const r = monthlyRate;
    const n = effectiveTenureMonths;
    emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPostMoratorium = emi * effectiveTenureMonths;
  const totalInterest = moratoriumInterest + (totalPostMoratorium - loanAmount);
  const totalPayable = loanAmount + totalInterest;

  return {
    monthlyRate,
    effectiveTenureMonths,
    moratoriumInterest,
    emi,
    totalInterest,
    totalPayable,
  };
}

export interface ComparisonResult {
  concessional: CalcResult;
  commercial: CalcResult;
  savings: number;
  savingsPercent: number;
}

export function compareLoans(
  loanAmount: number,
  tenureMonths: number,
  moratoriumMonths: number,
  concessionalRate: number,
  commercialRate: number
): ComparisonResult {
  const concessional = calculateLoan({
    loanAmount,
    tenureMonths,
    moratoriumMonths,
    annualRate: concessionalRate,
  });
  const commercial = calculateLoan({
    loanAmount,
    tenureMonths,
    moratoriumMonths,
    annualRate: commercialRate,
  });
  const savings = commercial.totalPayable - concessional.totalPayable;
  const savingsPercent = (savings / commercial.totalPayable) * 100;
  return { concessional, commercial, savings, savingsPercent };
}
