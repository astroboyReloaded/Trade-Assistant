export const valueInputs = document.getElementsByTagName('input');
export const valueOutputs = document.getElementsByTagName('output');

let calculateBtn = document.getElementById('calculate');
calculateBtn.addEventListener('click', calcPositionSize);

function calcPositionSize() {
  const [
    riskAmount,
    profitAmount,
    profitPerc,
    leverage,
    positionSIZE,
    risk_rewardRatio,
  ] = valueOutputs;
  let [entryPrice, stopLoss, balance, risk, takeProfit] = [...valueInputs].map(
    (input) => parseFloat(input.value),
  );

  const toPips = 100_000_000;
  let riskRange = Math.abs((entryPrice - stopLoss) * toPips),
    ePinPips = entryPrice * toPips,
    riskPerc = risk * 0.01;
  riskAmount.value = balance * riskPerc;
  let pipValue = riskAmount.value / riskRange;

  positionSIZE.value = (pipValue * ePinPips).toFixed(8);
  leverage.value = Math.ceil(positionSIZE.value / balance) + 'x';

  if (takeProfit) {
    let profitRange = Math.abs((entryPrice - takeProfit) * toPips);
    profitAmount.value = (pipValue * profitRange).toFixed(8);
    profitPerc.value = ((profitAmount.value / balance) * 100).toFixed(2) + '%';
  }

  risk_rewardRatio.value =
    (profitAmount.value / riskAmount.value).toFixed(2) + ':1';
}
