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

  get minLeverage() {
    return this.minLeverage;
  }

  set minLeverage(value) {
    this.minLeverage = value;
    this.minLeverageInput.value = this.minLeverage;
  }

  get positionSize() {
    return this.positionSize;
  }

  set positionSize(value) {
    this.positionSize = value;
    this.positionSizeInput.value = this.positionSize;
  }

  get riskRewardRatio() {
    return this.riskRewardRatio;
  }

  set riskRewardRatio(value) {
    this.riskRewardRatio = value;
    this.riskRewardRatioInput.value = this.riskRewardRatio;
  }
}
