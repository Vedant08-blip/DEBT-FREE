/**
 * Calculate EMI for a loan or check existing one
 * @param {number} principal - Principal amount
 * @param {number} annualInterestRate - Annual interest rate in percentage (e.g., 8.5)
 * @param {number} tenureMonths - Total tenure in months
 * @returns {number} Monthly EMI amount
 */
export const calcEMI = (principal, annualInterestRate, tenureMonths) => {
  if (!annualInterestRate || !tenureMonths) return 0;
  
  const r = annualInterestRate / 12 / 100; // Monthly interest rate
  const n = tenureMonths;
  
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
};
