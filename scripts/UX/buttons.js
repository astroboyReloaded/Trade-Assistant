import { valueInputs, calculateBtn } from "../calculator.js";
const [entryPrice, stopLoss, balance, riskPerc] = [...valueInputs];
[entryPrice, stopLoss, balance, riskPerc].forEach((input, i) => i <= 2 && input.addEventListener('input', () => enableCalcBtn(input.value, i)));

let eP, sL;
function enableCalcBtn(value, index) {
  if (value) {
    index === 0 && (eP = true);
    index === 1 && (sL = true);
  } else {
    index === 0 && (eP = false);
    index === 1 && (sL = false);
  }

  const Blnc = parseFloat(balance.value) > 0;
  const RskPrc = riskPerc.value;

  (eP && sL && Blnc && RskPrc) ? calculateBtn.classList.remove('calcDisabled') : calculateBtn.classList.add('calcDisabled');

  const [price, stop] = [entryPrice, stopLoss].map(input => parseFloat(input.value));

  if (price && stop) price - stop >= 0 ? enableAs('long') : enableAs('short');
};

function enableAs(direction) {
  calculateBtn.classList = [];
  calculateBtn.classList.add(direction);
};

enableCalcBtn();