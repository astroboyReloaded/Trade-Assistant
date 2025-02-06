'use strict';
const balanceSwitch = document.querySelector('#currency_Switch');
const priceFormatSelect = document.querySelector('#price_Format');
const lockEntryPriceBtn = document.querySelectorAll('.lock-entryPrice');
const lockStopLossBtn = document.querySelectorAll('.lock-stopLoss');
const lockRiskPercentageBtn = document.querySelectorAll('.lock-riskPercentage');
const lockTakeProfitBtn = document.querySelectorAll('.lock-takeProfit');
const lockProfitPercentageBtn = document.querySelectorAll(
  '.lock-profitPercentage',
);

class CreateIUState {
  #balanceFormat = JSON.parse(localStorage.getItem('balanceFormat')) || 2;
  #priceFormat = JSON.parse(localStorage.getItem('priceFormat')) || 2;
  #lockedStack = JSON.parse(localStorage.getItem('lockedStack')) || [];
  #lockBtns = {
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
    this.balanceSwitch = balanceSwitch;
    this.priceFormatSelect = priceFormatSelect;
    this.#balanceFormat === 2
      ? (this.balanceSwitch.checked = false)
      : (this.balanceSwitch.checked = true);
    this.priceFormatSelect.value = this.#priceFormat;
    this.#lockedStack.forEach((inputId) => {
      const input = this.#lockBtns[inputId];
      input.locked = true;
      input.checkbox.checked = true;
    });
    Object.keys(this.#lockBtns).forEach((inputId) => {
      this.#lockBtns[inputId].label.addEventListener('click', () => {
        this.updateLockedState(
          this.#lockBtns[inputId].id,
          !this.#lockBtns[inputId].locked,
        );
      });
    });
  }

  updateLockedState(inputId, locked, checkbox) {
    if (!inputId) return;
    const inputLock = this.#lockBtns[inputId];
    inputLock.locked = locked;
    if (!this.#lockedStack.includes(inputId) && inputLock.locked) {
      this.pushToLockedStack(inputId);
    }
    const autoUnlock =
      this.#lockedStack.length > 4 && this.shiftFromLockedStack();
    autoUnlock && this.updateLockedState(autoUnlock, false, true);
    if (this.#lockedStack.includes(inputId) && !inputLock.locked)
      this.spliceFromLockedStack(inputId);
    if (checkbox) inputLock.checkbox.checked = locked;
  }

  shiftFromLockedStack() {
    const shaft = this.#lockedStack.shift();
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
    return shaft;
  }

  setBalanceFormat() {
    this.#balanceFormat = this.balanceSwitch.checked ? 8 : 2;
    localStorage.setItem('balanceFormat', JSON.stringify(this.#balanceFormat));
  }

  get balanceFormat() {
    return this.#balanceFormat;
  }

  set priceFormat(value) {
    this.#priceFormat = value;
    localStorage.setItem('priceFormat', JSON.stringify(this.#priceFormat));
  }

  get priceFormat() {
    return Number(this.#priceFormat);
  }

  get lockedStack() {
    return this.#lockedStack;
  }

  pushToLockedStack(inputId) {
    this.#lockedStack.push(inputId);
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
  }

  spliceFromLockedStack(inputId) {
    this.#lockedStack.splice(this.#lockedStack.indexOf(inputId), 1);
    localStorage.setItem('lockedStack', JSON.stringify(this.#lockedStack));
  }

  get entryPriceLocked() {
    return this.#lockBtns.entryPrice.checkbox.checked;
  }

  get stopLossLocked() {
    return this.#lockBtns.stopLoss.checkbox.checked;
  }

  get riskPercentageLocked() {
    return this.#lockBtns.riskPercentage.checkbox.checked;
  }

  get takeProfitLocked() {
    return this.#lockBtns.takeProfit.checkbox.checked;
  }

  get profitPercentageLocked() {
    return this.#lockBtns.profitPercentage.checkbox.checked;
  }
}

export const UIState = new CreateIUState();
