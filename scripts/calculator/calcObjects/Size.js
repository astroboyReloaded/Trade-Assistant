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

  get getMinLeverage() {
    return this.minLeverage;
  }

  set setMinLeverage(value) {
    this.minLeverage = value;
    this.minLeverageInput.value = this.minLeverage;
  }

  get getPositionSize() {
    return this.positionSize;
  }

  set setPositionSize(value) {
    this.positionSize = value;
    this.positionSizeInput.value = this.positionSize;
  }

  get getRiskRewardRatio() {
    return this.riskRewardRatio;
  }

  set setRiskRewardRatio(value) {
    this.riskRewardRatio = value;
    this.riskRewardRatioInput.value = this.riskRewardRatio;
  }
}
