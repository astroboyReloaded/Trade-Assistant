export class Profit {
  constructor(takeProfitInput, profitPercentageInput, profitAmountInput) {
    this.takeProfitInput = takeProfitInput;
    this.profitPercentageInput = profitPercentageInput;
    this.profitAmountInput = profitAmountInput;
    this.takeProfit = null;
    this.profitPercentage = null;
    this.profitAmount = null;
  }

  get getTakeProfit() {
    return this.takeProfit;
  }

  set setTakeProfit(value) {
    this.takeProfit = value;
  }

  get getProfitPercentage() {
    return this.profitPercentage;
  }

  set setProfitPercentage(value) {
    this.profitPercentage = value;
  }

  get getProfitAmount() {
    return this.profitAmount;
  }

  set setProfitAmount(value) {
    this.profitAmount = value;
  }
}
