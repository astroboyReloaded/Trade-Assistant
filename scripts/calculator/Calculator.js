'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Size } from './calcObjects/Size.js';
import { UIState } from './UIState.js';

class Calculator {
  #pipsToTake;
  #pipsToStop;
  #pipValue;
  #positionDirection = UIState.positionDirection;

  Direction(from = UIState.positionDirectionFrom || 'stop') {
    if (from === 'take')
      this.#positionDirection = Base.Entry < Profit.Take ? 'long' : 'short';
    else this.#positionDirection = Base.Entry < Risk.Stop ? 'short' : 'long';
    UIState.positionDirection = this.#positionDirection;
    console.log(
      'Position direction:',
      this.#positionDirection,
      'from:',
      UIState.positionDirectionFrom,
    );
  }

  PipsToStop() {
    if (Base.Entry) this.#pipsToStop = Math.abs(Base.Entry - Risk.Stop);
    console.log('Pips to stop:', this.#pipsToStop);
  }

  PipsToTake(from) {
    if (Base.Entry) {
      switch (from) {
        case 'profit percentage':
          this.#pipsToTake =
            this.#pipsToStop *
            (Profit.PercentageAsDecimal / Risk.PercentageAsDecimal);
          break;
        default:
          this.#pipsToTake = Math.abs(Base.Entry - Profit.Take);
          break;
      }
    } else {
      this.#pipsToTake = null;
    }
    console.log('Pips to take:', this.#pipsToTake);
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
          this.#pipValue = Risk.Amount / Base.Entry;
      }
    } else {
      this.#pipValue = 1;
    }
    console.log('Pip value:', this.#pipValue);
  }

  get pipValue() {
    return this.#pipValue;
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
      const totalPips = Math.abs(Profit.Take - Risk.Stop);
      const profitPerc = Profit.PercentageAsDecimal * 100;
      const riskPerc = Risk.PercentageAsDecimal * 100;
      const newHundred = profitPerc + riskPerc;
      const percPipstTosStop = riskPerc / newHundred;
      const percPipsToTake = profitPerc / newHundred;
      this.#pipsToStop = totalPips * percPipstTosStop;
      this.#pipsToTake = totalPips * percPipsToTake;
      console.log(
        'percPipstoTake/Stop:',
        percPipsToTake,
        percPipstTosStop,
        '"\n"Pips to take:',
        this.#pipsToTake,
      );
      Base.Entry =
        this.#positionDirection === 'long'
          ? Profit.Take - this.#pipsToTake
          : Profit.Take + this.#pipsToTake;
    } else {
      Base.Entry = null;
    }
    Base.setEntryInputValue();
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
    } else {
      Risk.Stop = 0;
    }
    Risk.setStopInputValue();
    console.log('calc, stop loss:', Risk.Stop);
  }

  RiskPercentage(from) {
    if (Base.isSet) {
      switch (from) {
        case 'pipValue':
          console.log('risk percentage, pip value:', this.#pipValue);
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
  }

  RiskAmount(from) {
    if (Base.Balance) {
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
          console.log('pips to take', this.#pipsToTake);
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
    } else if (Base.Balance && Profit.Amount) {
      Profit.PercentageAsDecimal = Profit.Amount / Base.Balance;
    } else {
      Profit.PercentageAsDecimal = null;
    }
    Profit.setPercentageInputValue();
  }

  ProfitAmount(from) {
    if (Base.Balance) {
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
      switch (this.#positionDirection) {
        case 'short':
          Size.Position = this.#pipValue * Risk.Stop;
          break;
        default:
          Size.Position = this.#pipValue * Base.Entry;
          break;
      }
    } else {
      Size.Position = null;
    }
    Size.setPositionInputValue();
    this.LotSize();
  }

  LotSize() {
    if (Base.Entry) {
      switch (this.#positionDirection) {
        case 'long':
          Size.Lots = Size.Position / Base.Entry;
          break;
        case 'short':
          Size.Lots = Size.Position / Risk.Stop;
      }
    } else {
      Size.Lots = null;
    }
    Size.setLotsInputValue();
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
    this.LotSize();
    this.MinLeverage();
    this.RiskRewardRatio();
  }
}

export const Calc = new Calculator();
