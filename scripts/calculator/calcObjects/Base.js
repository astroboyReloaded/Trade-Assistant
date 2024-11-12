'use strict';

import { UIState } from '../UIState.js';

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
      this.balanceLocked = !this.balanceLocked;
    });
    this.balanceInput.addEventListener('change', (e) => {
      this.balanceLocked = Boolean(e.target.value);
      this.#balanceLockCheckbox.checked = this.balanceLocked;
    });
    this.entryInput = entryPriceInput;
    this.entryInput.addEventListener('change', () => {
      UIState.updateLockedState(this.entryInput.id, true, true);
    });
  }

  get Balance() {
    return this.#balance;
  }

  set Balance(value) {
    this.#balance = value;
    localStorage.setItem('balance', this.#balance);
  }

  setBalanceInputValue() {
    this.balanceInput.value = this.#balance;
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
  }

  setEntryInputValue() {
    this.entryInput.value = this.#entryPrice;
  }

  get isSet() {
    return this.#balance && this.#entryPrice;
  }

  clearAll() {
    this.Balance = null;
    this.setBalanceInputValue();
    this.clear();
  }

  clear() {
    this.Entry = null;
    this.setEntryInputValue();
    UIState.updateLockedState(this.entryInput.id, false, true);
  }
}

export const Base = new CreateBase(balanceInput, entryInput);
