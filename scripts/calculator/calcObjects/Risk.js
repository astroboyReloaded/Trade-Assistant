export class Risk {
  constructor(stopLossInput, riskPercentageInput, riskAmountInput) {
    this.stopLossInput = stopLossInput;
    this.riskPercentageInput = riskPercentageInput;
    this.riskAmountInput = riskAmountInput;
    this.stopLoss = null;
    this.riskPercentage = 100;
    this.riskAmount = null;
  }

  get stopLoss() {
    return this.stopLoss;
  }

  set stopLoss(value) {
    this.stopLoss = value;
    this.stopLossInput.value = this.stopLoss;
  }

  get riskPercentage() {
    return this.riskPercentage;
  }

  set riskPercentage(value) {
    this.riskPercentage = value;
    this.riskPercentageInput.value = this.riskPercentage;
  }

  get riskAmount() {
    return this.riskAmount;
  }

  set riskAmount(value) {
    this.riskAmount = value;
    this.riskAmountInput.value = this.riskAmount;
  }
}
