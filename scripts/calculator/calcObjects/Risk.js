export class Risk {
  constructor(stopLossInput, riskPercentageInput, riskAmountInput) {
    this.stopLossInput = stopLossInput;
    this.riskPercentageInput = riskPercentageInput;
    this.riskAmountInput = riskAmountInput;
    this.stopLoss = 0;
    this.riskPercentage = 100;
    this.riskAmount = null;
    this.isLocked = false;
  }

  getStopLoss() {
    return this.stopLoss;
  }

  setStopLoss(value) {
    this.stopLoss = value;
    this.stopLossInput.value = this.stopLoss;
  }

  getRiskPercentage() {
    return this.riskPercentage;
  }

  setRiskPercentage(value) {
    this.riskPercentage = value;
    this.riskPercentageInput.value = this.riskPercentage;
  }

  getRiskAmount() {
    return this.riskAmount;
  }

  setRiskAmount(value) {
    this.riskAmount = value;
    this.riskAmountInput.value = this.riskAmount;
  }

  getLocked() {
    return this.isLocked;
  }

  setLocked(value) {
    this.isLocked = value;
  }
}
