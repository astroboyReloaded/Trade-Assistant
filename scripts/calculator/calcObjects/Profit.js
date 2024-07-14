export class Profit {
  constructor(takeProfitInput, profitPercentageInput, profitAmountInput) {
    this.takeProfitInput = takeProfitInput;
    this.profitPercentageInput = profitPercentageInput;
    this.profitAmountInput = profitAmountInput;
    this.takeProfit = null;
    this.profitPercentage = null;
    this.profitAmount = null;
    this.isLocked = false;
  }

  getTakeProfit() {
    return this.takeProfit;
  }

  setTakeProfit(value) {
    this.takeProfit = value;
  }

  getProfitPercentage() {
    return this.profitPercentage;
  }

  setProfitPercentage(value) {
    this.profitPercentage = value;
  }

  getProfitAmount() {
    return this.profitAmount;
  }

  setProfitAmount(value) {
    this.profitAmount = value;
  }

  setLocked(value) {
    this.isLocked = value;
  }

  getLocked() {
    return this.isLocked;
  }
}
