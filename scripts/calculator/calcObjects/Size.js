'use strict';
const [positionSizeInput, minLeverageInput, riskRewardRatioInput] =
  document.querySelectorAll('.sizeInput');

export class CreateSize {
  #position = null;
  #minLeverage = null;
  #riskRewardRatio = 0;

  constructor(positionSizeInput, minLeverageInput, riskRewardRatioInput) {
    this.positionSizeInput = positionSizeInput;
    this.minLeverageInput = minLeverageInput;
    this.riskRewardRatioInput = riskRewardRatioInput;
  }

  get Position() {
    return this.#position;
  }

  set Position(value) {
    this.#position = value;
  }

  setPositionInputValue() {
    this.positionSizeInput.value = this.#position || '';
  }

  get Leverage() {
    return this.#minLeverage;
  }

  set Leverage(value) {
    this.#minLeverage = value;
  }

  setLeverageInputValue() {
    this.minLeverageInput.value = this.#minLeverage || '';
  }

  get RiskRewardRatio() {
    return this.#riskRewardRatio;
  }

  set RiskRewardRatio(value) {
    this.#riskRewardRatio = value;
  }

  setRatioInputValue() {
    this.riskRewardRatioInput.value = this.#riskRewardRatio || '';
  }
}

export const Size = new CreateSize(
  positionSizeInput,
  minLeverageInput,
  riskRewardRatioInput,
);
