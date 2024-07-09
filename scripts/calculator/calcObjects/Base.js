export class Base {
  constructor(balanceInput, entryPriceInput) {
    this.balanceInput = balanceInput;
    this.entryPriceInput = entryPriceInput;
    this.balance = null;
    this.entryPrice = null;
  }

  get getBalance() {
    return this.balance;
  }

  set setBalance(value) {
    this.balance = value;
  }

  get getEntryPrice() {
    return this.entryPrice;
  }

  set setEntryPrice(value) {
    this.entryPrice = value;
  }

  get getBaseInputs() {
    return [this.balanceInput, this.entryPriceInput];
  }
}
