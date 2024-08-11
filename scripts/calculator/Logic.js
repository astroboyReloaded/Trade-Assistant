'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Calc } from './Calculator.js';

class CreateLogic {
  onLoad() {
    Base.Balance && Base.setBalanceInputValue();
    Base.Entry && Base.setEntryInputValue();
    Risk.setStopInputValue();
    if (Base.isSet()) {
      Calc.PipsToStop();
      switch (Risk.percentageLocked) {
        case true:
          Calc.PipValue('stop');
          Risk.setPercentageInputValue();
          Calc.RiskAmount('percentage');
          break;
        case false:
          Calc.PipValue('base');
          Calc.RiskPercentage();
          break;
      }
      if (Profit.Take) {
        Calc.PipsToTake();
        Profit.setTakeInputValue();
        Calc.ProfitAmount();
        Calc.ProfitPercentage();
      }
      Calc.PositionSize();
      Calc.MinLeverage();
      Calc.RiskRewardRatio();
    }
  }

  fromBalance(value) {
    Base.Balance = value;
    Calc.PipsToTake();
    Calc.PipValue('base');
    Calc.ProfitAmount();
    Calc.ProfitPercentage();
    Calc.RiskAmount();
    Calc.RiskPercentage();
    Calc.PositionSize();
    Calc.MinLeverage();
    Calc.RiskRewardRatio();
  }

  fromEntry(value) {
    Base.Entry = value;
    Calc.PipsToStop();
    Calc.PipValue('base');
    Calc.ProfitAmount();
    Calc.ProfitPercentage();
    Calc.RiskAmount();
    Calc.RiskPercentage();
    Calc.PositionSize();
    Calc.MinLeverage();
    Calc.RiskRewardRatio();
  }

  fromTake(value) {
    Profit.Take = value;
    Profit.priceLocked = true;
    Calc.PipsToTake();
    Calc.ProfitAmount();
    Calc.ProfitPercentage();
    Calc.RiskAmount();
    Calc.RiskPercentage();
    Calc.PositionSize();
    Calc.MinLeverage();
    Calc.RiskRewardRatio();
  }

  fromStop(value) {
    Risk.Stop = value;
    Risk.priceLocked = true;
    Calc.PipsToStop();
    Calc.PipValue('base');
    Calc.ProfitAmount();
    Calc.ProfitPercentage();
    if (!Risk.percentageLocked) {
      Calc.RiskAmount('stop');
      Calc.RiskPercentage();
    }
    Calc.PositionSize();
    Calc.MinLeverage();
    Calc.RiskRewardRatio();
  }

  fromRiskPercentage(value) {
    Risk.PercentageAsDecimal = value / 100;
    Risk.percentageLocked = Boolean(value);
    if (Risk.priceLocked) {
      Calc.RiskAmount('percentage');
      Calc.PipValue('base');
      Calc.PositionSize();
      Calc.MinLeverage();
    }
  }
}

export const Logic = new CreateLogic();
