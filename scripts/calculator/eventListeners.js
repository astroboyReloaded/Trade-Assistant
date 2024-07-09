import { base, profit, risk } from './Calculator.js';

base.balanceInput.addEventListener('change', () => {
  base.setBalance(base.balanceInput.value);
});
base.entryPriceInput.addEventListener('change', () => {
  base.setEntryPrice(base.entryPriceInput.value);
});
profit.takeProfitInput.addEventListener('change', () => {
  profit.setTakeProfit(profit.takeProfitInput.value);
});
profit.profitPercentageInput.addEventListener('change', () => {
  profit.setProfitPercentage(profit.profitPercentageInput.value);
});
profit.profitAmountInput.addEventListener('change', () => {
  profit.setProfitAmount(profit.profitAmountInput.value);
});
risk.stopLossInput.addEventListener('change', () => {
  risk.setStopLoss(risk.stopLossInput.value);
});
risk.riskPercentageInput.addEventListener('change', () => {
  risk.setRiskPercentage(risk.riskPercentageInput.value);
});
risk.riskAmountInput.addEventListener('change', () => {
  risk.setRiskAmount(risk.riskAmountInput.value);
});
