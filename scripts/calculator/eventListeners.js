import { Calc, Base, Profit, Risk } from './Calculator.js';

// Base Events
Base.balanceInput.addEventListener('input', (e) => {
  Base.setBalance(e.target.value);
});
Base.entryPriceInput.addEventListener('input', (e) => {
  Base.setEntryPrice(e.target.value);
});

// Profit Events
Profit.takeProfitInput.addEventListener('input', (e) => {
  Profit.setTakeProfit(e.target.value);
  Calc.ProfitPercentage();
  Calc.ProfitAmount();
});
Profit.takeProfitInput.addEventListener('change', () => {
  return;
});
// ----------
Profit.profitPercentageInput.addEventListener('change', (e) => {
  Profit.setProfitPercentage(e.target.value);
});
// ----------
Profit.profitAmountInput.addEventListener('change', (e) => {
  Profit.setProfitAmount(e.target.value);
});

// Risk Events
Risk.stopLossInput.addEventListener('change', (e) => {
  Risk.setStopLoss(e.target.value);
});
// ----------
Risk.riskPercentageInput.addEventListener('change', (e) => {
  Risk.setRiskPercentage(e.target.value);
});
// ----------
Risk.riskAmountInput.addEventListener('change', (e) => {
  Risk.setRiskAmount(e.target.value);
});
