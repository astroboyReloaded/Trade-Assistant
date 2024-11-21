// import { valueInputs, valueOutputs } from '../calculator/Calculator.js';

// class CurrentPosition {
//   constructor() {
//     this.index = null;
//     this.currentPosition = {};
//   }
//   get currentPosition() {
//     this.currentPosition =
//       JSON.parse(sessionStorage.getItem('current-position')) || {};
//     return this.currentPosition;
//   }

//   set currentPosition(positionToSave) {
//     sessionStorage.setItem('current-position', JSON.stringify(positionToSave));
//   }

//   loadPosition(positionToLoad, index) {
//     this.index = index || null;

//     const [entryPrice, stopLoss, balance, riskPercentage, takeProfit] = [
//       ...valueInputs,
//     ];
//     const [
//       riskAmount,
//       profitAmount,
//       profitPerc,
//       leverage,
//       positionSIZE,
//       risk_rewardRatio,
//     ] = [...valueOutputs];

//     if (positionToLoad) {
//       [
//         entryPrice.value,
//         stopLoss.value,
//         balance.value,
//         riskPercentage.value,
//         takeProfit.value,
//         riskAmount.value,
//         profitAmount.value,
//         profitPerc.value,
//         leverage.value,
//         positionSIZE.value,
//         risk_rewardRatio.value,
//       ] = Object.values((this.currentPosition = positionToLoad));
//     }
//   }

//   clearCurrentPosition() {
//     this.currentPosition = {};
//   }
// }

// const Session = new CurrentPosition();
// export default Session;
