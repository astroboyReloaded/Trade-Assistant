'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Size } from './calcObjects/Size.js';

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

export const base = new Base(balanceInput, entryPriceInput);
const size = new Size(
  minLeverageInput,
  positionSizeInput,
  riskRewardRatioInput,
);
export const profit = new Profit(
  takeProfitInput,
  profitPercentageInput,
  profitAmountInput,
);
export const risk = new Risk(
  stopLossInput,
  riskPercentageInput,
  riskAmountInput,
);
class Calculator {
  isBaseFilled() {
    return this.Base.getBalance() && this.Base.getEntryPrice();
  }
}

export const Position = new Calculator();
