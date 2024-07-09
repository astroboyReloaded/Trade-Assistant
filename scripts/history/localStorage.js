import { valueInputs, valueOutputs } from './calculator.js';
import Session from './CurrentPosition.js';

// Save the last Balance and Risk Percentage.

let lastBalanceAndRisk =
  JSON.parse(localStorage.getItem('balance-riskPerc')) || {};

const [, , balanceInput, riskPercInput] = [...valueInputs];

if (lastBalanceAndRisk.lastBalance) {
  balanceInput.value = lastBalanceAndRisk.lastBalance;
}
if (lastBalanceAndRisk.lastRiskPerc) {
  riskPercInput.value = lastBalanceAndRisk.lastRiskPerc;
}

[balanceInput, riskPercInput].forEach((input) =>
  input.addEventListener('change', () => saveBalnceAndRiskPerc(input)),
);

function saveBalnceAndRiskPerc(input) {
  if (input.id === 'blnc') {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastBalance: input.value,
    };
  }
  if (input.id === 'rskPrc') {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastRiskPerc: input.value,
    };
  }

  localStorage.setItem('balance-riskPerc', JSON.stringify(lastBalanceAndRisk));
}

// After Calculation actions.

import DB from './PositionsHistory.js';

let afterCalcBtns = document.querySelectorAll('.after-calcBtn');
afterCalcBtns.forEach((btn, i) =>
  btn.addEventListener('click', () => afterCalcActions(btn, i)),
);
export const deleteBtn = afterCalcBtns[0];

function afterCalcActions(actionBtn, index) {
  switch (actionBtn.id) {
    case 'delete':
      deletePositionfromHistory(index);
      break;

    case 'clear-all':
      clearAllFields();
      break;

    case 'clear-position':
      clear();
      break;

    case 'save-position':
      savePosition();
      break;

    default:
      break;
  }
}

function deletePositionfromHistory(positionIndex) {
  const newSavedPositions = DB.savedPositions().filter(
    (p, i) => i !== positionIndex,
  );
  DB.setSavedPositions(newSavedPositions);
  clear();
  deleteBtn.disabled = true;
}

function clearAllFields() {
  [...valueInputs].forEach((input) => (input.value = ''));
  [...valueOutputs].forEach((output) => (output.value = ''));
}

function clear() {
  [...valueInputs].forEach((input) => {
    if (input.id !== 'blnc' && input.id !== 'rskPrc') input.value = '';
    input.id === 'eP' && input.focus();
  });
  [...valueOutputs].forEach((output) => (output.value = ''));
  Session.clearCurrentPosition();
}

function savePosition() {
  let [entryPrice, stopLoss, balance, riskPercentage, takeProfit] = [
    ...valueInputs,
  ].map((input) => input.value);
  let [
    riskAmount,
    profitAmount,
    profitPerc,
    leverage,
    positionSIZE,
    risk_rewardRatio,
  ] = [...valueOutputs].map((output) => output.value);

  const newPosition = {
    entryPrice,
    stopLoss,
    balance,
    riskPercentage,
    takeProfit,
    riskAmount,
    profitAmount,
    profitPerc,
    leverage,
    positionSIZE,
    risk_rewardRatio,
  };

  const newSavedPositions = [newPosition, ...DB.savedPositions()];

  DB.setSavedPositions(newSavedPositions);
}
