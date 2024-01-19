import {
  valueInputs,
  riskAmount,
  profitAmount,
  profitPerc,
  leverage,
  positionSIZE,
  risk_rewardRatio,
} from "./calculator.js";

class CurrentPosition {
  constructor() {
    this.index = null;
    this.currentPosition = {};
  }
  getCurrentPosition() {
    this.currentPosition = JSON.parse(sessionStorage.getItem('current-position')) || {};
    return this.currentPosition;
  }

  setCurrentPosition(positionToSave) {
    sessionStorage.setItem('current-position', JSON.stringify(positionToSave));
    return this.getCurrentPosition();
  }

  loadPosition(positionToLoad, index) {
    this.index = index || null;
  
    let [entryPrice, stopLoss, balance, riskPercentage, takeProfit] = [...valueInputs];
    [
      entryPrice.value,
      stopLoss.value,
      balance.value,
      riskPercentage.value,
      takeProfit.value,
      riskAmount.value,
      profitAmount.value,
      profitPerc.value,
      leverage.value,
      positionSIZE.value,
      risk_rewardRatio.value,
    ] = Object.values(this.setCurrentPosition(positionToLoad));
  }

  clearCurrentPosition() {
    this.loadPosition({});
  }
};

const Session = new CurrentPosition();
export default Session;