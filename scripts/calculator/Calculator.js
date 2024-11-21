'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Size } from './calcObjects/Size.js';

class Calculator {
  #pipsToTake;
  #pipsToStop;
  #pipValue;
  #positionDirection = localStorage.getItem('positionDirection') || null;

  Direction(from) {
    if (from === 'take')
      this.#positionDirection = Base.Entry < Profit.Take ? 'long' : 'short';
    else this.#positionDirection = Base.Entry < Risk.Stop ? 'short' : 'long';
    localStorage.setItem('positionDirection', this.#positionDirection);
    console.log('position direction', this.#positionDirection);
  }

  get pipsToStop() {
    return this.#pipsToStop;
  }

  PipsToStop() {
    if (Base.Entry) this.#pipsToStop = Math.abs(Base.Entry - Risk.Stop);
    console.log('pips to stop', this.#pipsToStop);
  }

  get pipsToTake() {
    return this.#pipsToTake;
  }

  PipsToTake(from) {
    if (Base.Entry) {
      switch (from) {
        case 'profit percentage':
          console.log(
            'profit percentage',
            Profit.PercentageAsDecimal,
            Risk.PercentageAsDecimal,
            this.#pipsToStop,
          );
          this.#pipsToTake =
            this.#pipsToStop *
            (Profit.PercentageAsDecimal / Risk.PercentageAsDecimal);
          break;
        default:
          this.#pipsToTake = Math.abs(Base.Entry - Profit.Take);
          break;
      }
    } else {
      console.log('no entry');
      this.#pipsToTake = null;
    }
    console.log('pips to take', this.#pipsToTake);
  }

  get pipValue() {
    return this.#pipValue;
  }

  PipValue(from) {
    if (Base.isSet) {
      switch (from) {
        case 'take':
          this.#pipValue = Profit.Amount / this.#pipsToTake;
          break;
        case 'stop':
          this.#pipValue = Risk.Amount / this.#pipsToStop;
          break;
        default:
          this.#pipValue =
            (Risk.PercentageAsDecimal * Base.Balance) / this.#pipsToStop || 1;
      }
    } else {
      this.#pipValue = 1;
    }
    console.log('pip value', this.#pipValue);
  }

  Balance(from = 'risk') {
    Base.Balance =
      from === 'risk'
        ? Risk.Amount / Risk.PercentageAsDecimal
        : Profit.Amount / Profit.PercentageAsDecimal;
    Base.setBalanceInputValue();
  }

  EntryPrice() {
    if (Profit.Take && Profit.PercentageAsDecimal) {
      const totalPips = Profit.Take - Risk.Stop;
      const profitPerc = Profit.PercentageAsDecimal * 100;
      const riskPerc = Risk.PercentageAsDecimal * 100;
      const newHundred = profitPerc + riskPerc;
      const percPipstTosStop = riskPerc / newHundred;
      const percPipsToTake = profitPerc / newHundred;
      this.#pipsToStop = totalPips * percPipstTosStop;
      this.#pipsToTake = totalPips * percPipsToTake;
      Base.Entry = Profit.Take - this.pipsToTake;
    } else {
      Base.Entry = null;
    }
    Base.setEntryInputValue();
    console.log('entry', Base.Entry);
  }

  StopLoss() {
    if (Base.isSet) {
      switch (this.#positionDirection) {
        case 'short':
          Risk.Stop = Base.Entry + Risk.Amount / this.#pipValue;
          break;
        default:
          Risk.Stop = Base.Entry - Risk.Amount / this.#pipValue;
          break;
      }
      console.log('calc stop loss', Risk.Stop);
    } else {
      Risk.Stop = 0;
    }
    Risk.setStopInputValue();
  }

  RiskPercentage(from) {
    if (Base.isSet) {
      switch (from) {
        case 'pipValue':
          Risk.PercentageAsDecimal =
            (100 * (this.#pipValue * this.#pipsToStop)) / Base.Balance;
          break;
        default:
          Risk.PercentageAsDecimal = (Risk.Amount / Base.Balance) * 100;
          break;
      }
    } else {
      Risk.PercentageAsDecimal = Base.Balance ? 100 : 0;
    }
    Risk.setPercentageInputValue();
    console.log('risk percentage', Risk.PercentageAsDecimal * 100);
  }

  RiskAmount(from) {
    if (Base.isSet) {
      switch (from) {
        case 'pipValue':
          Risk.Amount = this.#pipValue * this.#pipsToStop;
          break;
        default:
          Risk.Amount = Base.Balance * Risk.PercentageAsDecimal || null;
          break;
      }
    } else {
      Risk.Amount = null;
    }
    Risk.setAmountInputValue();
  }

  TakeProfit() {
    if (Base.isSet) {
      this.#pipsToTake = Profit.Amount / this.#pipValue;
      switch (this.#positionDirection) {
        case 'short':
          Profit.Take = this.#pipsToTake ? Base.Entry - this.#pipsToTake : null;
          break;
        default:
          Profit.Take = this.#pipsToTake ? Base.Entry + this.#pipsToTake : null;
      }
    } else if (Base.Entry && Profit.PercentageAsDecimal) {
      switch (this.#positionDirection) {
        case 'short':
          Profit.Take = Base.Entry - this.#pipsToTake;
          break;
        default:
          Profit.Take = Base.Entry + this.#pipsToTake;
      }
    } else {
      Profit.Take = null;
    }
    Profit.setTakeInputValue();
  }

  ProfitPercentage() {
    if (Base.Entry) {
      Profit.PercentageAsDecimal =
        (this.#pipsToTake / this.#pipsToStop) * Risk.PercentageAsDecimal;
    } else {
      Profit.PercentageAsDecimal = null;
    }
    console.log('profit percentage', Profit.PercentageAsDecimal);
    Profit.setPercentageInputValue();
  }

  ProfitAmount(from) {
    if (Base.isSet) {
      switch (from) {
        case 'pipValue':
          Profit.Amount = this.#pipValue * this.#pipsToTake || null;
          break;
        default:
          Profit.Amount = Base.Balance * Profit.PercentageAsDecimal || null;
          break;
      }
    } else {
      Profit.Amount = null;
    }
    Profit.setAmountInputValue();
  }

  PositionSize() {
    if (Base.isSet) {
      Size.Position = this.#pipValue * Base.Entry;
    } else {
      Size.Position = null;
    }
    Size.setPositionInputValue();
  }

  MinLeverage() {
    if (Base.Entry) {
      Size.Leverage = Math.ceil(
        (Risk.PercentageAsDecimal / this.#pipsToStop) * Base.Entry,
      );
    } else {
      Size.Leverage = null;
    }
    Size.setLeverageInputValue();
  }

  RiskRewardRatio() {
    if (Base.Entry && Profit.Take) {
      Size.RiskRewardRatio = this.#pipsToTake / this.#pipsToStop;
    } else {
      Size.RiskRewardRatio = 0;
    }
    Size.setRatioInputValue();
  }

  Size() {
    this.PositionSize();
    this.MinLeverage();
    this.RiskRewardRatio();
  }
}

export const Calc = new Calculator();
