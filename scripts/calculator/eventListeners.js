import { Base, Profit, Risk } from './Calculator.js';

Base.balanceInput.addEventListener('change', () => {
  Base.setBalance(Base.balanceInput.value);
});
Base.entryPriceInput.addEventListener('change', () => {
  Base.setEntryPrice(Base.entryPriceInput.value);
});
Profit.takeProfitInput.addEventListener('change', () => {
  Profit.setTakeProfit(Profit.takeProfitInput.value);
});
Profit.ProfitPercentageInput.addEventListener('change', () => {
  Profit.setProfitPercentage(Profit.ProfitPercentageInput.value);
});
Profit.ProfitAmountInput.addEventListener('change', () => {
  Profit.setProfitAmount(Profit.ProfitAmountInput.value);
});
Risk.stopLossInput.addEventListener('change', () => {
  Risk.setStopLoss(Risk.stopLossInput.value);
});
Risk.RiskPercentageInput.addEventListener('change', () => {
  Risk.setRiskPercentage(Risk.RiskPercentageInput.value);
});
Risk.RiskAmountInput.addEventListener('change', () => {
  Risk.setRiskAmount(Risk.RiskAmountInput.value);
});
