'use strict';
import { formatValue, formatPercentage } from '../helpFuncs.js';
import { UIState } from '../UIState.js';
const [stopInput, riskPercentageInput, riskAmountInput] =
  document.querySelectorAll('.risk-input');

class CreateRisk {
  #stop = JSON.parse(localStorage.getItem('stopLoss')) || 0;
  #PercentageAsDecimal =
    JSON.parse(localStorage.getItem('riskPercentageAsDecimal')) || 1;
  #amount = null;

  constructor(stopInput, riskAmountInput, riskPercentageInput) {
    this.stopInput = stopInput;
    this.stopInput.addEventListener('change', () => {
      this.stopInput.value = formatValue(
        this.stopInput.value,
        UIState.priceNumOfDecimals,
      );
      UIState.updateLockedState(this.stopInput.id, true, true);
    });
    this.percentageInput = riskPercentageInput;
    this.percentageInput.addEventListener('change', () => {
      UIState.updateLockedState(this.percentageInput.id, true, true);
    });
    this.amountInput = riskAmountInput;
    this.amountInput.addEventListener('change', () => {
      this.amountInput.value = formatValue(
        this.amountInput.value,
        UIState.balanceNumOfDecimals,
      );
      UIState.updateLockedState(this.percentageInput.id, true, true);
    });
  }

  get Stop() {
    return this.#stop;
  }

  set Stop(value) {
    this.#stop = value;
    localStorage.setItem('stopLoss', JSON.stringify(this.#stop));
  }

  setStopInputValue() {
    this.stopInput.value =
      formatValue(this.#stop, UIState.priceNumOfDecimals) || '';
  }

  get PercentageAsDecimal() {
    return this.#PercentageAsDecimal;
  }

  set PercentageAsDecimal(value) {
    this.#PercentageAsDecimal = value !== '' ? value / 100 : 1;
    localStorage.setItem(
      'riskPercentageAsDecimal',
      JSON.stringify(this.#PercentageAsDecimal),
    );
  }

  setPercentageInputValue() {
    this.percentageInput.value =
      formatPercentage(this.#PercentageAsDecimal * 100) || '';
  }

  get Amount() {
    return this.#amount;
  }

  set Amount(value) {
    this.#amount = value;
  }

  setAmountInputValue() {
    this.amountInput.value =
      formatValue(this.#amount, UIState.balanceNumOfDecimals) || '';
  }

  clearAll() {
    this.clear();
    this.PercentageAsDecimal = '';
    this.setPercentageInputValue();
    UIState.updateLockedState(this.percentageInput.id, false, true);
    this.Amount = null;
    this.setAmountInputValue();
  }

  clear() {
    this.Stop = 0;
    this.setStopInputValue();
    UIState.updateLockedState(this.stopInput.id, false, true);
  }
}

export const Risk = new CreateRisk(
  stopInput,
  riskAmountInput,
  riskPercentageInput,
);
