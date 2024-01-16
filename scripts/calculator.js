let valueInputs = document.getElementsByTagName('input');
let [
  riskAmount,
  profitAmount,
  profitPerc,
  leverage,
  SIZE,
  risk_rewardRatio,
] = document.getElementsByTagName('output');

let calculate = document.getElementById('calculate');
calculate.addEventListener('click', calcPositionSize);

function calcPositionSize(){
  let [
  entryPrice,
  stopLoss,
  balance,
  risk,
  takeProfit,
] = [...valueInputs].map(input => parseFloat(input.value));

  const toPips=100_000_000;
  let riskRange = Math.abs((entryPrice-stopLoss)*toPips),
  ePinPips = entryPrice*toPips,
  riskPerc = risk*0.01;
  riskAmount.value = balance*riskPerc,
  pipValue = riskAmount.value/riskRange,
  
  SIZE.value = (pipValue*ePinPips).toFixed(8);
  leverage.value = Math.ceil((SIZE.value/balance)) + 'x';

  if (takeProfit){
      let profitRange = Math.abs((entryPrice-takeProfit)*toPips);
      profitAmount.value = (pipValue*profitRange).toFixed(8);
      profitPerc.value = (((profitAmount.value/balance)*100).toFixed(2)) + '%';
  }

  risk_rewardRatio.value = ((profitAmount.value/riskAmount.value).toFixed(2)) + ':1';
};
