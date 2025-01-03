'use strict';
import { Base } from './calcObjects/Base.js';
import { Risk } from './calcObjects/Risk.js';
import { Profit } from './calcObjects/Profit.js';
import { Logic } from './Logic.js';
import { val } from './helpFuncs.js';
// Base Events
Base.balanceInput.addEventListener('input', (e) => {
  Logic.fromBalanceInput(val(e));
});

Base.entryInput.addEventListener('input', (e) => {
  Logic.fromEntryInput(val(e));
});

// Risk Events
Risk.stopInput.addEventListener('input', (e) => {
  Logic.fromStopInput(val(e));
});

Risk.percentageInput.addEventListener('input', (e) => {
  // Pass the original value here for state management
  Logic.fromRiskPercentageInput(e.target.value);
});

Risk.amountInput.addEventListener('input', (e) => {
  Logic.fromRiskAmountInput(val(e));
});

// Profit Events
Profit.takeInput.addEventListener('input', (e) => {
  Logic.fromTakeProfitInput(val(e));
});

Profit.percentageInput.addEventListener('input', (e) => {
  Logic.fromProfitPercentage(val(e));
});

Profit.amountInput.addEventListener('input', (e) => {
  Logic.fromProfitAmount(val(e));
});

Logic.onLoad();
