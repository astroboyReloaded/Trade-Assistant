export class Profit {
  constructor(takeProfitInput, profitPercentageInput, profitAmountInput) {
    this.takeProfitInput = takeProfitInput;
    this.profitPercentageInput = profitPercentageInput;
    this.profitAmountInput = profitAmountInput;
    this.takeProfit = null;
    this.profitPercentage = null;
    this.profitAmount = null;
  }

  get takeProfit() {
    return this.takeProfit;
  }

  set takeProfit(value) {
    this.takeProfit = value;
  }

  get profitPercentage() {
    return this.profitPercentage;
  }

  set profitPercentage(value) {
    this.profitPercentage = value;
  }

  get profitAmount() {
    return this.profitAmount;
  }

  set profitAmount(value) {
    this.profitAmount = value;
  }
}
