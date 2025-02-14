'use strict';
import { UIState } from './UIState.js';
import { Base } from './calcObjects/Base.js';
import { Risk } from './calcObjects/Risk.js';
import { Profit } from './calcObjects/Profit.js';
import { Logic } from './Logic.js';
import { val } from './helpFuncs.js';

// Curency Format Events
let timeoutID;
UIState.balanceSwitch.addEventListener('click', () => {
  if (timeoutID) clearTimeout(timeoutID);
  timeoutID = setTimeout(() => Logic.fromBalanceSwitch(), 250);
});

UIState.priceFormatSelect.addEventListener('change', (e) => {
  e.preventDefault();
  Logic.fromPriceFormatSelect(e);
});

// Base Events
Base.balanceInput.addEventListener('input', (e) => {
  Logic.fromBalanceInput(val(e));
});

Base.entryInput.addEventListener('input', (e) => {
  Logic.fromEntryInput(val(e));
  UIState.revisePricesMatchDirection();
  UIState.checkForNegativeValues();
});

// Risk Events
Risk.stopInput.addEventListener('input', (e) => {
  Logic.fromStopInput(val(e));
  UIState.revisePricesMatchDirection();
  UIState.checkForNegativeValues();
  UIState.checkStopVSLiquidationPrice();
});

Risk.percentageInput.addEventListener('input', (e) => {
  // Pass the original value here for state management
  Logic.fromRiskPercentageInput(e.target.value);
  UIState.checkForNegativeValues();
});

Risk.amountInput.addEventListener('input', (e) => {
  Logic.fromRiskAmountInput(val(e));
  UIState.checkForNegativeValues();
});

// Profit Events
Profit.takeInput.addEventListener('input', (e) => {
  Logic.fromTakeProfitInput(val(e));
  UIState.revisePricesMatchDirection();
  UIState.checkForNegativeValues();
});

Profit.percentageInput.addEventListener('input', (e) => {
  Logic.fromProfitPercentage(val(e));
  UIState.checkForNegativeValues();
});

Profit.amountInput.addEventListener('input', (e) => {
  Logic.fromProfitAmount(val(e));
  UIState.checkForNegativeValues();
});

Logic.onLoad();
