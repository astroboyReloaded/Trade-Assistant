'use strict';
import { Base } from './calcObjects/Base.js';
import { Profit } from './calcObjects/Profit.js';
import { Risk } from './calcObjects/Risk.js';
import { Calc } from './Calculator.js';
import { UIState } from './UIState.js';

class CreateLogic {
  onLoad() {
    if (Base.Balance) {
      Base.setBalanceInputValue();
      Calc.RiskAmount();
    }
    if (Base.Entry) {
      Base.setEntryInputValue();
      Calc.PipsToStop();
      Calc.PipValue();
    }
    Risk.setStopInputValue();
    Risk.PercentageAsDecimal && Risk.setPercentageInputValue();
    Calc.RiskAmount();
    if (Profit.Take) {
      Profit.setTakeInputValue();
      Calc.PipsToTake();
    }
    Profit.PercentageAsDecimal && Profit.setPercentageInputValue();
    Calc.ProfitAmount();
    Calc.Size();
  }

  fromBalanceInput(value) {
    Base.Balance = value;
    Base.Entry && Calc.PipsToStop();
    Calc.PipValue();
    Calc.RiskAmount();
    Calc.ProfitAmount();
    Calc.Size();
  }

  fromEntryInput(value) {
    Base.Entry = value;
    Calc.PipsToStop();
    Calc.PipsToTake();
    !UIState.entryPriceLocked;
    UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!UIState.takeProfitLocked && Profit.PercentageAsDecimal) {
      Calc.Direction();
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (Profit.Take && !UIState.profitPercentageLocked) {
      Calc.ProfitPercentage('pipValue');
      Calc.ProfitAmount();
    } else if (!UIState.stopLossLocked && Risk.PercentageAsDecimal) {
      Calc.Direction('take');
      Calc.PipValue('take');
      Calc.StopLoss();
    } else if (Risk.Stop && !UIState.riskPercentageLocked) {
      Calc.RiskPercentage('pipValue');
      Calc.RiskAmount();
    }
    Calc.Size();
  }

  fromStopInput(value) {
    Risk.Stop = value;
    Base.Entry && Calc.Direction();
    Calc.PipsToStop();
    Calc.PipsToTake();
    !UIState.stopLossLocked;
    UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!UIState.takeProfitLocked && Profit.PercentageAsDecimal) {
      Calc.Direction();
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (Profit.Take && !UIState.profitPercentageLocked) {
      Calc.ProfitPercentage('pipValue');
      Calc.ProfitAmount();
    } else if (!UIState.entryPriceLocked) {
      Calc.EntryPrice();
    } else if (!UIState.riskPercentageLocked) {
      Calc.RiskPercentage('pipValue');
      Calc.RiskAmount();
    }
    Calc.Size();
  }

  fromRiskPercentageInput(value) {
    Risk.PercentageAsDecimal = value;
    Calc.RiskAmount();
    Calc.PipValue();
    !UIState.riskPercentageLocked &&
      UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!UIState.takeProfitLocked && Profit.PercentageAsDecimal) {
      Calc.Direction();
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (Profit.Take && !UIState.profitPercentageLocked) {
      Calc.ProfitPercentage('pipValue');
      Calc.ProfitAmount();
    } else if (!UIState.entryPriceLocked) {
      Calc.EntryPrice();
    } else if (!UIState.stopLossLocked && Profit.Take) {
      Calc.Direction('take');
      Calc.PipValue('take');
      Calc.StopLoss();
    }
    Calc.Size();
  }

  fromRiskAmountInput(value) {
    Risk.Amount = value;
    Base.balanceLocked && Calc.RiskPercentage();
    Calc.PipValue();
    !UIState.riskPercentageLocked &&
      UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!Base.balanceLocked) {
      Calc.Balance();
    } else if (!UIState.takeProfitLocked && Profit.PercentageAsDecimal) {
      Calc.Direction();
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (Profit.Take && !UIState.profitPercentageLocked) {
      Calc.ProfitPercentage('pipValue');
      Calc.ProfitAmount();
    } else if (!UIState.entryPriceLocked) {
      Calc.EntryPrice();
    } else if (!UIState.stopLossLocked) {
      Calc.Direction('take');
      Calc.PipValue('take');
      Calc.StopLoss();
    }
    Calc.Size();
  }

  fromTakeProfitInput(value) {
    Profit.Take = value;
    Calc.PipsToTake();
    !UIState.takeProfitLocked &&
      UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!UIState.profitPercentageLocked && Base.Entry) {
      Calc.ProfitPercentage();
      Calc.ProfitAmount();
    } else if (!UIState.entryPriceLocked && Profit.PercentageAsDecimal) {
      Calc.EntryPrice();
    } else if (!UIState.stopLossLocked && Profit.PercentageAsDecimal) {
      Calc.Direction('take');
      Calc.PipValue('take');
      Calc.StopLoss();
    } else if (!UIState.riskPercentageLocked && Profit.PercentageAsDecimal) {
      Calc.Direction();
      Calc.PipValue('take');
      Calc.RiskPercentage('pipValue');
      Calc.RiskAmount();
    }
    Calc.Size();
  }

  fromProfitPercentage(value) {
    Profit.PercentageAsDecimal = value / 100;
    Calc.PipsToStop();
    Calc.PipsToTake();
    Calc.ProfitAmount();
    !UIState.profitPercentageLocked &&
      UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!UIState.takeProfitLocked && Base.Entry) {
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (!UIState.entryPriceLocked && Profit.Take) {
      Calc.EntryPrice();
    } else if (!UIState.stopLossLocked && Base.Entry) {
      Calc.PipValue('take');
      Calc.StopLoss();
    } else if (!UIState.riskPercentageLocked && Base.Entry) {
      Calc.PipValue('take');
      Calc.RiskPercentage('pipValue');
      Calc.RiskAmount();
    }
    Calc.Size();
  }

  fromProfitAmount(value) {
    Profit.Amount = value;
    Calc.PipsToStop();
    Calc.PipsToTake();
    Base.balanceLocked && Calc.ProfitPercentage();
    !UIState.profitPercentageLocked &&
      UIState.lockedStack.length === 4 &&
      UIState.updateLockedState(UIState.shiftFromLockedStack(), false, true);
    if (!Base.balanceLocked) {
      UIState.profitPercentageLocked ? Calc.Balance() : Calc.ProfitPercentage();
    }
    if (!UIState.takeProfitLocked && Base.Entry) {
      Calc.Direction();
      Calc.PipValue('stop');
      Calc.TakeProfit();
    } else if (!UIState.entryPriceLocked && Profit.Take) {
      Calc.EntryPrice();
    } else if (!UIState.stopLossLocked && Base.Entry) {
      Calc.PipValue('take');
      Calc.StopLoss();
    } else if (!UIState.riskPercentageLocked && Base.Entry) {
      Calc.PipValue('take');
      Calc.RiskPercentage('pipValue');
      Calc.RiskAmount();
    }
    Calc.Size();
  }
}

export const Logic = new CreateLogic();
