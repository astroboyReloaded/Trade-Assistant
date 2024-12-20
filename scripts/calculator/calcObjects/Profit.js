'use strict';

import { UIState } from '../UIState.js';
import { formatValue, formatPercentage } from '../helpFuncs.js';

const [takeProfitInput, profitPercentageInput, profitAmountInput] =
  document.querySelectorAll('.profit-input');
class CreateProfit {
  #takeProfit = JSON.parse(localStorage.getItem('takeProfit')) || null;
  #PercentageAsDecimal =
    JSON.parse(localStorage.getItem('profitPercentageAsDecimal')) || null;
  #amount = null;

  constructor(takeProfitInput, profitAmountInput, profitPercentageInput) {
    this.takeInput = takeProfitInput;
    this.takeInput.addEventListener('change', () => {
      this.takeInput.value = formatValue(
        this.takeInput.value,
        UIState.priceNumOfDecimals,
      );
      UIState.updateLockedState(this.takeInput.id, true, true);
    });
    this.percentageInput = profitPercentageInput;
    this.percentageInput.addEventListener('change', () => {
      UIState.updateLockedState(this.percentageInput.id, true, true);
    });
    this.amountInput = profitAmountInput;
    this.amountInput.addEventListener('change', () => {
      this.amountInput.value = formatValue(
        this.amountInput.value,
        UIState.balanceNumOfDecimals,
      );
      UIState.updateLockedState(this.percentageInput.id, true, true);
    });
  }

  get Take() {
    return this.#takeProfit;
  }

  set Take(value) {
    this.#takeProfit = value || null;
    localStorage.setItem('takeProfit', this.#takeProfit);
  }

  setTakeInputValue() {
    this.takeInput.value =
      formatValue(this.#takeProfit, UIState.priceNumOfDecimals) || '';
  }

  get PercentageAsDecimal() {
    return this.#PercentageAsDecimal;
  }

  set PercentageAsDecimal(value) {
    this.#PercentageAsDecimal = value;
    localStorage.setItem(
      'profitPercentageAsDecimal',
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

  clear() {
    this.Take = null;
    this.setTakeInputValue();
    UIState.updateLockedState(this.takeInput.id, false, true);
  }

  clearAll() {
    this.clear();
    this.PercentageAsDecimal = null;
    this.setPercentageInputValue();
    UIState.updateLockedState(this.percentageInput.id, false, true);
    this.Amount = null;
    this.setAmountInputValue();
  }
}

export const Profit = new CreateProfit(
  takeProfitInput,
  profitAmountInput,
  profitPercentageInput,
);
