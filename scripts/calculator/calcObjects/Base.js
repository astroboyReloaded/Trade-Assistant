'use strict';

import { UIState } from '../UIState.js';
import { formatValue } from '../helpFuncs.js';

const [balanceInput, entryInput] = document.querySelectorAll('.baseInput');
const lockBalanceBtn = document.querySelectorAll('.lock-balance');
class CreateBase {
  #balance = JSON.parse(localStorage.getItem('balance')) || null;
  #balanceLocked = JSON.parse(localStorage.getItem('balanceLocked')) || false;
  #balanceLockCheckbox = lockBalanceBtn[0];
  #balanceLockLabel = lockBalanceBtn[1];
  #entryPrice = JSON.parse(localStorage.getItem('entryPrice')) || null;

  constructor(balanceInput, entryPriceInput) {
    this.balanceInput = balanceInput;
    this.#balanceLockCheckbox.checked = this.#balanceLocked;
    this.#balanceLockLabel.addEventListener('click', () => {
      this.#balanceLocked = !this.#balanceLocked;
      localStorage.setItem('balanceLocked', this.#balanceLocked);
    });
    this.balanceInput.addEventListener('change', (e) => {
      this.balanceInput.value = formatValue(
        Number(e.target.value),
        UIState.balanceNumOfDecimals,
      );
      this.#balanceLocked = Boolean(e.target.value);
      this.#balanceLockCheckbox.checked = Boolean(e.target.value);
      localStorage.setItem('balanceLocked', this.#balanceLocked);
    });
    this.entryInput = entryPriceInput;
    this.entryInput.addEventListener('change', (e) => {
      console.log('entryInput change event');
      const value = Number(e.target.value);
      this.entryInput.value = formatValue(value, UIState.priceFormat);
      UIState.lockedStack.length < 3 &&
        UIState.updateLockedState(this.entryInput.id, Boolean(value), true);
    });
    UIState.setEntryPrice(this.#entryPrice);
  }

  get Balance() {
    return this.#balance;
  }

  set Balance(value) {
    this.#balance = value;
    localStorage.setItem('balance', this.#balance);
  }

  setBalanceInputValue() {
    this.balanceInput.value = formatValue(this.#balance, UIState.balanceFormat);
  }

  set balanceLocked(value) {
    this.#balanceLocked = value;
    localStorage.setItem('balanceLocked', this.#balanceLocked);
  }

  get balanceLocked() {
    return this.#balanceLocked;
  }

  get Entry() {
    return this.#entryPrice;
  }

  set Entry(value) {
    this.#entryPrice = value;
    localStorage.setItem('entryPrice', this.#entryPrice);
    UIState.setEntryPrice(this.#entryPrice);
  }

  setEntryInputValue() {
    this.entryInput.value = formatValue(this.#entryPrice, UIState.priceFormat);
  }

  get isSet() {
    return this.#balance && this.#entryPrice;
  }

  clearAll() {
    this.Balance = null;
    this.setBalanceInputValue();
    this.balanceLocked = false;
    this.#balanceLockCheckbox.checked = false;
    this.clear();
  }

  clear() {
    this.Entry = null;
    this.setEntryInputValue();
    UIState.updateLockedState(this.entryInput.id, false, true);
  }
}

export const Base = new CreateBase(balanceInput, entryInput);
