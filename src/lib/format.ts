/**
 * Format a number as Indian Rupees: ₹X,XX,XXX
 */
export function formatINR(amount: number): string {
  if (amount === 0) return "₹0";
  const absAmt = Math.abs(amount);
  // Indian numbering system: last 3 digits, then groups of 2
  const str = Math.round(absAmt).toString();
  let result = "";
  const len = str.length;
  if (len <= 3) {
    result = str;
  } else {
    result = str.slice(-3);
    let remaining = str.slice(0, -3);
    while (remaining.length > 2) {
      result = remaining.slice(-2) + "," + result;
      remaining = remaining.slice(0, -2);
    }
    result = remaining + "," + result;
  }
  return (amount < 0 ? "-" : "") + "₹" + result;
}

/**
 * Format lakhs: ₹5.00 L
 */
export function formatLakhs(amount: number): string {
  const lakhs = amount / 100000;
  return `₹${lakhs.toFixed(2)} L`;
}

/**
 * Format a percentage
 */
export function formatPercent(n: number, decimals = 0): string {
  return `${n.toFixed(decimals)}%`;
}

/**
 * Format months as human-readable duration
 */
export function formatMonths(months: number): string {
  if (months < 12) return `${months} Month${months !== 1 ? "s" : ""}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} Year${years !== 1 ? "s" : ""}`;
  return `${years}Y ${rem}M`;
}

/**
 * Generate a mock routing token
 */
export function generateRoutingToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let token = "SMR-";
  for (let i = 0; i < 8; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
