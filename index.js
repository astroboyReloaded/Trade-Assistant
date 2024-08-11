'use strict';
import { Base } from './scripts/calculator/calcObjects/Base.js';
import { Profit } from './scripts/calculator/calcObjects/Profit.js';
import { Risk } from './scripts/calculator/calcObjects/Risk.js';
import { Logic } from './scripts/calculator/Logic.js';

const val = (e) => Number(e.target.value);

// Base Events
Base.balanceInput.addEventListener('input', (e) => {
  Logic.fromBalance(val(e));
});

Base.entryInput.addEventListener('input', (e) => {
  Logic.fromEntry(val(e));
});

// Profit Events
Profit.takeInput.addEventListener('input', (e) => {
  Logic.fromTake(val(e));
});

Profit.percentageInput.addEventListener('input', (e) => {
  Profit.PercentageAsDecimal = val(e) / 100;
});

Profit.amountInput.addEventListener('input', (e) => {
  Profit.Amount = val(e);
});

// Risk Events
Risk.stopInput.addEventListener('input', (e) => {
  Logic.fromStop(val(e));
});

Risk.percentageInput.addEventListener('input', (e) => {
  Logic.fromRiskPercentage(val(e));
});

Risk.amountInput.addEventListener('input', (e) => {
  console.log(val(e));
});

Logic.onLoad();
