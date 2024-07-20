'use strict';
import { Calc, Base, Profit, Risk } from './calculator/Calculator.js';

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
  Profit.setProfitPercentageInputValue();
  Profit.setProfitAmountInputValue();
});
Profit.profitPercentageInput.addEventListener('input', (e) => {
  Profit.setProfitPercentage(e.target.value);
});

// Risk Events
Risk.stopLossInput.addEventListener('input', (e) => {
  Risk.setStopLoss(e.target.value);
  Calc.RiskPercentage();
  Calc.RiskAmount();
  Calc.PositionSize();
  Calc.MinLeverage();
});
Risk.riskPercentageInput.addEventListener('input', (e) => {
  Risk.setRiskPercentage(e.target.value);
  Calc.RiskAmount();
  Calc.PositionSize();
  Calc.MinLeverage();
});
Risk.riskAmountInput.addEventListener('input', (e) => {
  Risk.setRiskAmount(e.target.value);
});
