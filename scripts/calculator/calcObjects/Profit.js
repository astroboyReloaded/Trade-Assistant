'use strict';
const [takeProfitInput, profitAmountInput, profitPercentageInput] =
  document.querySelectorAll('.profitInput');

export class CreateProfit {
  #take = sessionStorage.getItem('takeProfit') || null;
  #PercentageAsDecimal =
    JSON.parse(localStorage.getItem('profitPercentageAsDecimal')) || null;
  #amount = null;
  #priceLocked =
    JSON.parse(sessionStorage.getItem('isTakeProfitLocked')) || false;

  constructor(takeProfitInput, profitAmountInput, profitPercentageInput) {
    this.takeInput = takeProfitInput;
    this.amountInput = profitAmountInput;
    this.percentageInput = profitPercentageInput;
  }

  get Take() {
    return this.#take;
  }

  set Take(value) {
    this.#take = value;
    sessionStorage.setItem('takeProfit', this.#take);
  }

  setTakeInputValue() {
    this.takeInput.value = this.#take;
  }

  get Amount() {
    return this.#amount;
  }

  set Amount(value) {
    this.#amount = value;
  }

  setAmountInputValue() {
    this.amountInput.value = this.#amount || '';
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
    this.percentageInput.value = this.#PercentageAsDecimal * 100 || '';
  }

  get priceLocked() {
    return this.#priceLocked;
  }

  set priceLocked(value) {
    this.#priceLocked = value;
    sessionStorage.setItem(
      'isTakeProfitLocked',
      JSON.stringify(this.#priceLocked),
    );
  }
}

export const Profit = new CreateProfit(
  takeProfitInput,
  profitAmountInput,
  profitPercentageInput,
);
