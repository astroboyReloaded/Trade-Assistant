export class Base {
  constructor(balanceInput, entryPriceInput) {
    this.balanceInput = balanceInput;
    this.entryPriceInput = entryPriceInput;
    this.balance = null;
    this.entryPrice = null;
  }

  getBalance() {
    return this.balance;
  }

  setBalance(value) {
    this.balance = value;
    localStorage.setItem('balance', this.balance);
  }

  getEntryPrice() {
    return localStorage.getItem('entryPrice') || this.entryPrice || 0;
  }

  setEntryPrice(value) {
    this.entryPrice = value;
  }
}
