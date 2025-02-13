'use strict';

import { formatValue } from '../helpFuncs.js';
import { UIState } from '../UIState.js';

const [
  positionSizeInput,
  lotSizeInput,
  minLeverageInput,
  riskRewardRatioInput,
] = document.querySelectorAll('.sizeInput');

export class CreateSize {
  #convertion = JSON.parse(
    localStorage.getItem('convertionMethod') ||
      '{"method": "balanceInPair", "balanceIn": "price", "rate": null, "lotFormat": "100_000"}',
  );
  #position = null;
  #lots = null;
  #minLeverage = null;
  #riskRewardRatio = 0;

  constructor(
    positionSizeInput,
    lotSizeInput,
    minLeverageInput,
    riskRewardRatioInput,
  ) {
    this.positionSizeInput = positionSizeInput;
    this.lotSizeInput = lotSizeInput;
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
    this.positionSizeInput.value =
      formatValue(this.#position, UIState.balanceFormat) || '';
  }

  get Lots() {
    return this.#lots;
  }

  set Lots(value) {
    this.#lots = value;
  }

  setLotsInputValue() {
    this.lotSizeInput.value = formatValue(this.#lots, UIState.priceFormat);
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
    this.riskRewardRatioInput.value =
      formatValue(this.#riskRewardRatio, 2) || '';
  }

  clear() {
    this.#position = null;
    this.#lots = null;
    this.#minLeverage = null;
    this.#riskRewardRatio = 0;
    this.setPositionInputValue();
    this.setLotsInputValue();
    this.setLeverageInputValue();
    this.setRatioInputValue();
  }
}

export const Size = new CreateSize(
  positionSizeInput,
  lotSizeInput,
  minLeverageInput,
  riskRewardRatioInput,
);
