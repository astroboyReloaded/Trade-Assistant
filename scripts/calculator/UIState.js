'use strict';
// const [
//   balanceContainer,
//   entryPriceContainer,
//   stopLossContainer,
//   takeProfitContainer,
// ] = document.querySelectorAll('.inputId-container');
// const [
//   riskPercentageContainer,
//   riskAmountContainer,
//   profitPercentageContainer,
//   profitAmountContainer,
// ] = document.querySelectorAll('.output-container');
const lockEntryPriceBtn = document.querySelectorAll('.lock-entryPrice');
const lockStopLossBtn = document.querySelectorAll('.lock-stopLoss');
const lockRiskPercentageBtn = document.querySelectorAll('.lock-riskPercentage');
const lockTakeProfitBtn = document.querySelectorAll('.lock-takeProfit');
const lockProfitPercentageBtn = document.querySelectorAll(
  '.lock-profitPercentage',
);

class CreateIUState {
  #lockedStack = JSON.parse(localStorage.getItem('lockedStack')) || [];
  #inputs = {
    entryPrice: {
      id: 'entryPrice',
      locked: false,
      checkbox: lockEntryPriceBtn[0],
      label: lockEntryPriceBtn[1],
    },
    stopLoss: {
      id: 'stopLoss',
      locked: false,
      checkbox: lockStopLossBtn[0],
      label: lockStopLossBtn[1],
    },
    riskPercentage: {
      id: 'riskPercentage',
      locked: false,
      checkbox: lockRiskPercentageBtn[0],
      label: lockRiskPercentageBtn[1],
    },
    takeProfit: {
      id: 'takeProfit',
      locked: false,
      checkbox: lockTakeProfitBtn[0],
      label: lockTakeProfitBtn[1],
    },
    profitPercentage: {
      id: 'profitPercentage',
      locked: false,
      checkbox: lockProfitPercentageBtn[0],
      label: lockProfitPercentageBtn[1],
    },
  };

  constructor() {
    this.#lockedStack.forEach((inputId) => {
      const input = this.#inputs[inputId];
      input.locked = true;
      input.checkbox.checked = true;
    });
    Object.keys(this.#inputs).forEach((inputId) => {
      this.#inputs[inputId].label.addEventListener('click', () => {
        this.updateLockedState(
          this.#inputs[inputId].id,
          !this.#inputs[inputId].locked,
        );
      });
    });
  }

  updateLockedState = (inputId, locked, checkbox = false) => {
    if (!inputId) return;
    const inputLock = this.#inputs[inputId];
    inputLock.locked = locked;
    if (!this.#lockedStack.includes(inputId) && inputLock.locked) {
      this.pushToLockedStack = inputId;
    }
    const autoUnlock = this.unshiftFromLockedStack();
    autoUnlock && this.updateLockedState(autoUnlock, false, true);
    if (this.#lockedStack.includes(inputId) && !inputLock.locked)
      this.spliceFromLockedStack = inputId;
    if (checkbox) inputLock.checkbox.checked = locked;
  };

  unshiftFromLockedStack() {
    const unshifted = this.#lockedStack.length > 4 && this.#lockedStack.shift();
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
    return unshifted;
  }

  get lockedStack() {
    return this.#lockedStack;
  }

  set pushToLockedStack(inputId) {
    this.#lockedStack.push(inputId);
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
  }

  set spliceFromLockedStack(inputId) {
    this.#lockedStack.splice(this.#lockedStack.indexOf(inputId), 1);
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
  }

  get entryPriceLocked() {
    return this.#inputs.entryPrice.checkbox.checked;
  }

  get stopLossLocked() {
    return this.#inputs.stopLoss.checkbox;
  }

  get riskPercentageLocked() {
    return this.#inputs.riskPercentage.checkbox.checked;
  }

  get takeProfitLocked() {
    return this.#inputs.takeProfit.checkbox.checked;
  }

  get profitPercentageLocked() {
    return this.#inputs.profitPercentage.checkbox.checked;
  }
}

export const UIState = new CreateIUState();
