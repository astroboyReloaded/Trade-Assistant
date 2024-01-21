import { valueInputs, valueOutputs } from "./calculator.js";

export function returnFieldsAs(dataType) {
  if (dataType === 'Array') {
    return [...valueInputs, ...valueOutputs];
  }
  if (dataType === 'Object') {
    let [entryPrice,
      stopLoss,
      balance,
      riskPercentage,
      takeProfit
    ] = [...valueInputs].map(input => input.value);
    let [
      riskAmount,
      profitAmount,
      profitPerc,
      leverage,
      positionSIZE,
      risk_rewardRatio,
    ] = [...valueOutputs].map(output => output.value);
    return {
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
  }
}

export function historyTemplate(history) {
  return history.map((position, i) => `<object class='history-item'>
    ${i+1}.-
    <data>Min Leverage: ${position.leverage}</data>
    <data>Position SIZE: ${position.positionSIZE}</data>
    <data>Entry Price: ${position.entryPrice}</data>
    <data>Stop Loss: ${position.stopLoss}</data>
    <data>Take Profit: ${position.takeProfit}</data>
    <div>
      <button id="delP${i}" class="delete-one">Delete</button>
      <button id="loadP${i}" class="load-position">Load</button>
    </div>
  </object>`).join('')
  || '<p>There are no saved positions</p>';
}