import {
  valueInputs,
} from "../calculator.js";

let lastBalanceAndRisk = JSON.parse(localStorage.getItem('balance-riskPerc')) || {};

const [,, balanceInput, riskPercInput] = [...valueInputs];

if (lastBalanceAndRisk.lastBalance) {
  balanceInput.value = lastBalanceAndRisk.lastBalance;
}
if (lastBalanceAndRisk.lastRiskPerc) {
  riskPercInput.value = lastBalanceAndRisk.lastRiskPerc;
}

[balanceInput, riskPercInput].forEach(input => input.addEventListener('input', () => saveBalnceAndRiskPerc(input)));

function saveBalnceAndRiskPerc(input) {
  if (input.id === 'blnc') {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastBalance: input.value 
    }
  }
  if (input.id === 'rskPrc') {
    lastBalanceAndRisk = {
      ...lastBalanceAndRisk,
      lastRiskPerc: input.value 
    }
  }

  localStorage.setItem('balance-riskPerc', JSON.stringify(lastBalanceAndRisk));
};
