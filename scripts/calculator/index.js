'use strict';
import { UIState } from './UIState.js';
import { Base } from './calcObjects/Base.js';
import { Risk } from './calcObjects/Risk.js';
import { Profit } from './calcObjects/Profit.js';
import { Logic } from './Logic.js';
import { val } from './helpFuncs.js';
import { Size } from './calcObjects/Size.js';

// Curency Format Events
UIState.balanceSwitch.addEventListener('click', () => {
  UIState.balanceNumOfDecimals = UIState.balanceSwitch.checked
    ? 'Crypto'
    : 'Fiat';
  localStorage.setItem(
    'balanceCurrencyType',
    JSON.stringify(UIState.balanceNumOfDecimals),
  );
  Base.setBalanceInputValue();
  Risk.setAmountInputValue();
  Profit.setAmountInputValue();
  Size.setPositionInputValue();
});

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
