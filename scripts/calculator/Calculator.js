'use strict';
import { Base } from './calcObjects/Base';
import { Profit } from './calcObjects/Profit';
import { Risk } from './calcObjects/Risk';
import { Size } from './calcObjects/Size';

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

export const Position = Calculator();
