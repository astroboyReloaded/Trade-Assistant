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
export const Profit = new createProfitObject(
  takeProfitInput,
  profitPercentageInput,
  profitAmountInput,
);
export const Risk = new createRiskObject(
  stopLossInput,
  riskPercentageInput,
  riskAmountInput,
);
export const Size = new createSizeObject(
  minLeverageInput,
  positionSizeInput,
  riskRewardRatioInput,
);
class Calculator {
  ProfitPercentage() {
    Profit.setProfitPercentage(
      Math.abs(Profit.getTakeProfit() / Base.getEntryPrice() - 1),
    );
    Profit.profitPercentageInput.value = Profit.getProfitPercentage() * 100;
  }

  ProfitAmount() {
    Profit.setProfitAmount(Base.getBalance() * Profit.getProfitPercentage());
    Profit.profitAmountInput.value = Profit.getProfitAmount();
  }

  TakeProfit() {
    Profit.setTakeProfit(
      Base.getEntryPrice() * (1 + Profit.getProfitPercentage()),
    );
    Profit.takeProfitInput.value = Profit.getTakeProfit();
  }
}

export const Calc = new Calculator();
