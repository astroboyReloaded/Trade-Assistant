export class Size {
  minLeverageInput;
  positionSizeInput;
  riskRewardRatioInput;

  constructor(minLeverageInput, positionSizeInput, riskRewardRatioInput) {
    this.minLeverageInput = minLeverageInput;
    this.positionSizeInput = positionSizeInput;
    this.riskRewardRatioInput = riskRewardRatioInput;
    this.minLeverage = 1;
    this.positionSize = null;
    this.riskRewardRatio = null;
  }

  getMinLeverage() {
    return this.minLeverage;
  }

  setMinLeverage(value) {
    this.minLeverage = value;
    this.minLeverageInput.value = this.minLeverage;
  }

  getPositionSize() {
    return this.positionSize;
  }

  setPositionSize(value) {
    this.positionSize = value;
    this.positionSizeInput.value = this.positionSize;
  }

  getRiskRewardRatio() {
    return this.riskRewardRatio;
  }

  setRiskRewardRatio(value) {
    this.riskRewardRatio = value;
    this.riskRewardRatioInput.value = this.riskRewardRatio;
  }
}
