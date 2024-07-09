'use strict';
import { Base as createBaseObject } from './calcObjects/Base.js';
import { Profit as createProfitObject } from './calcObjects/Profit.js';
import { Risk as createRiskObject } from './calcObjects/Risk.js';
import { Size as createSizeObject } from './calcObjects/Size.js';

const valueInputs = document.getElementsByTagName('input');

const [
  balanceInput,
  entryPriceInput,
  takeProfitInput,
  profitPercentageInput,
  profitAmountInput,
  stopLossInput,
  riskPercentageInput,
  riskAmountInput,
  minLeverageInput,
  positionSizeInput,
  riskRewardRatioInput,
] = [...valueInputs];

export const Base = new createBaseObject(balanceInput, entryPriceInput);
export const profit = new createProfitObject(
  takeProfitInput,
  profitPercentageInput,
  profitAmountInput,
);
export const Risk = new createRiskObject(
  stopLossInput,
  riskPercentageInput,
  riskAmountInput,
);
const Size = new createSizeObject(
  minLeverageInput,
  positionSizeInput,
  riskRewardRatioInput,
);
class Calculator {
  isBaseFilled() {
    return this.Base.getBalance() && this.Base.getEntryPrice();
  }
}

export const Position = new Calculator();
