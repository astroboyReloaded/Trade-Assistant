'use strict';
const [stopLossInput, riskAmountInput, riskPercentageInput] =
  document.querySelectorAll('.riskInput');

export class CreateRisk {
  #stop = JSON.parse(sessionStorage.getItem('stopLoss')) || 0;
  #PercentageAsDecimal = JSON.parse(
    localStorage.getItem('riskPercentageAsDecimal') || 1,
  );
  #amount = null;
  #priceLocked =
    JSON.parse(sessionStorage.getItem('isStopLossLocked')) || false;
  #percentageLocked =
    JSON.parse(sessionStorage.getItem('isRiskPercentageLocked')) || false;

  constructor(stopLossInput, riskAmountInput, riskPercentageInput) {
    this.stopInput = stopLossInput;
    this.amountInput = riskAmountInput;
    this.percentageInput = riskPercentageInput;
  }

  get Stop() {
    return this.#stop;
  }

  set Stop(value) {
    this.#stop = value;
    sessionStorage.setItem('stopLoss', JSON.stringify(this.#stop));
  }

  setStopInputValue() {
    this.stopInput.value = this.#stop;
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
    this.#PercentageAsDecimal = value || 1;
    localStorage.setItem(
      'riskPercentageAsDecimal',
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
      'isStopLossLocked',
      JSON.stringify(this.#priceLocked),
    );
    console.log(this.#priceLocked, 'risk price is locked');
  }

  get percentageLocked() {
    return this.#percentageLocked;
  }

  set percentageLocked(value) {
    this.#percentageLocked = value;
    sessionStorage.setItem(
      'isRiskPercentageLocked',
      JSON.stringify(this.#percentageLocked),
    );
    console.log(this.#percentageLocked, 'risk percentage is locked');
  }
}

export const Risk = new CreateRisk(
  stopLossInput,
  riskAmountInput,
  riskPercentageInput,
);
