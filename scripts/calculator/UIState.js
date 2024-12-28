'use strict';
// const [
//   balanceContainer,
//   entryPriceContainer,
//   stopLossContainer,
//   takeProfitContainer,
// ] = document.querySelectorAll('.input-container');
// const [
//   riskPercentageContainer,
//   riskAmountContainer,
//   profitPercentageContainer,
//   profitAmountContainer,
// ] = document.querySelectorAll('.output-container');
const [balanceSwitch, priceSwitch] = document.querySelectorAll(
  '.currency-switchInput',
);
const lockEntryPriceBtn = document.querySelectorAll('.lock-entryPrice');
const lockStopLossBtn = document.querySelectorAll('.lock-stopLoss');
const lockRiskPercentageBtn = document.querySelectorAll('.lock-riskPercentage');
const lockTakeProfitBtn = document.querySelectorAll('.lock-takeProfit');
const lockProfitPercentageBtn = document.querySelectorAll(
  '.lock-profitPercentage',
);

class CreateIUState {
  #balanceSwitch = balanceSwitch;
  #priceSwitch = priceSwitch;
  #balanceCurrencyType =
    JSON.parse(localStorage.getItem('balanceCurrencyType')) || 'Fiat';
  #priceCurrencyType =
    JSON.parse(localStorage.getItem('priceCurrencyType')) || 'Fiat';
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
    this.#balanceCurrencyType === 'Fiat'
      ? (balanceSwitch.checked = false)
      : (balanceSwitch.checked = true);
    this.#priceCurrencyType === 'Fiat'
      ? (priceSwitch.checked = false)
      : (priceSwitch.checked = true);
    this.#balanceSwitch.addEventListener('click', (e) => {
      e.preventDefault();
      this.#balanceCurrencyType = this.#balanceSwitch.checked
        ? 'Crypto'
        : 'Fiat';
      localStorage.setItem(
        'balanceCurrencyType',
        JSON.stringify(this.#balanceCurrencyType),
      );
      location.reload();
    });
    this.#priceSwitch.addEventListener('click', (e) => {
      e.preventDefault();
      this.#priceCurrencyType = this.#priceSwitch.checked ? 'Crypto' : 'Fiat';
      localStorage.setItem(
        'priceCurrencyType',
        JSON.stringify(this.#priceCurrencyType),
      );
      location.reload();
    });
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

  updateLockedState(inputId, locked, checkbox) {
    if (!inputId) return;
    const inputLock = this.#inputs[inputId];
    inputLock.locked = locked;
    if (!this.#lockedStack.includes(inputId) && inputLock.locked) {
      this.pushToLockedStack = inputId;
    }
    const autoUnlock =
      this.#lockedStack.length > 4 && this.shiftFromLockedStack();
    autoUnlock && this.updateLockedState(autoUnlock, false, true);
    if (this.#lockedStack.includes(inputId) && !inputLock.locked)
      this.spliceFromLockedStack = inputId;
    if (checkbox) inputLock.checkbox.checked = locked;
  }

  shiftFromLockedStack() {
    const shaft = this.#lockedStack.shift();
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
    return shaft;
  }

  get balanceNumOfDecimals() {
    return this.#balanceCurrencyType === 'Fiat' ? 2 : 8;
  }

  get priceNumOfDecimals() {
    return this.#priceCurrencyType === 'Fiat' ? 2 : 8;
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
    return this.#inputs.stopLoss.checkbox.checked;
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
