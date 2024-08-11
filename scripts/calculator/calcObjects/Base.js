'use stricy';
const [balanceInput, entryInput] = document.querySelectorAll('baseInput');
export class CreateBase {
  #balance = JSON.parse(localStorage.getItem('balance')) || null;
  #entryPrice = JSON.parse(sessionStorage.getItem('entryPrice')) || null;

  constructor(balanceInput, entryPriceInput) {
    this.balanceInput = balanceInput;
    this.entryInput = entryPriceInput;
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

  get Entry() {
    return this.#entryPrice;
  }

  set Entry(value) {
    this.#entryPrice = value;
    sessionStorage.setItem('entryPrice', this.#entryPrice);
  }

  setEntryInputValue() {
    this.entryInput.value = this.#entryPrice;
  }

  isSet() {
    return Boolean(this.#balance && this.#entryPrice);
  }

  clear() {
    this.#entryPrice = null;
    sessionStorage.removeItem('entryPrice');
  }

  clearAll() {
    this.#balance = null;
    this.#entryPrice = null;
    localStorage.removeItem('balance');
    sessionStorage.removeItem('entryPrice');
  }
}

export const Base = new CreateBase(balanceInput, entryInput);
