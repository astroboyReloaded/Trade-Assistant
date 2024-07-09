export class Risk {
  constructor(stopLossInput, riskPercentageInput, riskAmountInput) {
    this.stopLossInput = stopLossInput;
    this.riskPercentageInput = riskPercentageInput;
    this.riskAmountInput = riskAmountInput;
    this.stopLoss = null;
    this.riskPercentage = 100;
    this.riskAmount = null;
  }

  get getStopLoss() {
    return this.stopLoss;
  }

  set setStopLoss(value) {
    this.stopLoss = value;
    this.stopLossInput.value = this.stopLoss;
  }

  get getRiskPercentage() {
    return this.riskPercentage;
  }

  set setRiskPercentage(value) {
    this.riskPercentage = value;
    this.riskPercentageInput.value = this.riskPercentage;
  }

  get getRiskAmount() {
    return this.riskAmount;
  }

  set setRiskAmount(value) {
    this.riskAmount = value;
    this.riskAmountInput.value = this.riskAmount;
  }
}
