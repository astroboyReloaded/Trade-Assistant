'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Size } from './calcObjects/Size.js';

class Calculator {
  #pipsToTake;
  #pipsToStop;
  #pipValue;

  PipsToTake() {
    if (Base.isSet) {
      this.#pipsToTake = Math.abs(Base.Entry - Profit.Take);
    } else {
      this.#pipsToTake = 0;
    }
    console.log(this.#pipsToTake, 'pips to take');
  }

  PipsToStop() {
    if (Base.isSet()) {
      this.#pipsToStop = Math.abs(Base.Entry - Risk.Stop);
    } else {
      this.#pipsToStop = 0;
    }
    console.log(this.#pipsToStop, 'pips to stop');
  }

  PipValue(fromInput) {
    if (Base.isSet()) {
      switch (fromInput) {
        case 'base':
          this.#pipValue = Base.Balance / this.#pipsToStop;
          break;
        case 'take':
          this.#pipValue = Profit.Amount / this.#pipsToTake;
          break;
        case 'stop':
          this.#pipValue = Risk.Amount / this.#pipsToStop;
          break;
      }
    } else {
      this.#pipValue = 0;
    }
    console.log(this.#pipValue, 'pip value');
  }

  ProfitAmount() {
    if (Base.isSet() && Profit.Take) {
      Profit.Amount = this.#pipValue * this.#pipsToTake;
    } else {
      Profit.Amount = null;
    }
    Profit.setAmountInputValue();
    console.log(Profit.Amount, 'profit amount');
  }

  ProfitPercentage() {
    if (Base.isSet() && Profit.Take) {
      Profit.PercentageAsDecimal = Profit.Amount / Base.Balance;
    } else {
      Profit.PercentageAsDecimal = null;
    }
    Profit.setPercentageInputValue();
    console.log(Profit.PercentageAsDecimal, 'profit percentage');
  }

  RiskAmount(fromInput) {
    if (Base.isSet()) {
      switch (fromInput) {
        case 'percentage':
          Risk.Amount = Base.Balance * Risk.PercentageAsDecimal;
          break;
        default:
          Risk.Amount = this.#pipValue * this.#pipsToStop;
          break;
      }
    } else {
      Risk.Amount = null;
    }
    Risk.setAmountInputValue();
    console.log(Risk.Amount, 'risk amount');
  }

  RiskPercentage(fromInput) {
    if (Base.isSet()) {
      switch (fromInput) {
        case 'stop':
          Risk.PercentageAsDecimal =
            (this.#pipValue * this.#pipsToStop) / Base.Balance;
          break;
        default:
          Risk.PercentageAsDecimal = Risk.Amount / Base.Balance;
      }
    } else {
      Risk.PercentageAsDecimal = 1;
    }
    Risk.setPercentageInputValue();
    console.log(Risk.PercentageAsDecimal, 'risk percentage');
  }

  PositionSize() {
    Size.Position = this.#pipValue * Base.Entry || null;
    Size.setPositionInputValue();
    console.log(Size.Position, 'position size');
  }

  MinLeverage() {
    Size.Leverage = Size.Position / Base.Balance;
    Size.setLeverageInputValue();
    console.log(Size.Leverage, 'min leverage');
  }

  RiskRewardRatio() {
    if (Base.isSet() && Profit.Take) {
      Size.RiskRewardRatio = this.#pipsToTake / this.#pipsToStop;
    } else {
      Size.RiskRewardRatio = 0;
    }
    Size.setRatioInputValue();
  }
}

export const Calc = new Calculator();
