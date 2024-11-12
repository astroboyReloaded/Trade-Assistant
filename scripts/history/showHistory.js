// import DB from './PositionsHistory.js';
// import Session from './CurrentPosition.js';
// import { deleteBtn } from './localStorage.js';

// let historyContainer,
//   calcContainer,
//   load_Position,
//   delete_One,
//   clear_History,
//   close_History;
// document.getElementById('history').addEventListener('click', openCalcHistory);

// function openCalcHistory() {
//   historyContainer = document.createElement('div');
//   historyContainer.id = 'history-container';

//   calcContainer = document.getElementById('calc');
//   calcContainer.appendChild(historyContainer);

//   loadHistory(DB.savedPositions());
// }

// let timeID;

// export function loadHistory(history) {
//   let positionsHistory =
//     history
//       .map(
//         (position, i) => `<object class='history-item'>
//     ${i + 1}.-
//     <data>Min Leverage: ${position.leverage}</data>
//     <data>Position SIZE: ${position.positionSIZE}</data>
//     <data>Entry Price: ${position.entryPrice}</data>
//     <data>Stop Loss: ${position.stopLoss}</data>
//     <data>Take Profit: ${position.takeProfit}</data>
//     <div>
//       <button id="delP${i}" class="delete-one">Delete</button>
//       <button id="loadP${i}" class="load-position">Load</button>
//     </div>
//   </object>`,
//       )
//       .join('') || '<p>There are no positions saved</p>';

//   historyContainer.innerHTML = `<div class="close-clearHistory_cont">
//     <button id="clear-history" disabled>Clear History</button>
//     <span id="close-history">X</span>
//   </div>
//   ${positionsHistory}`;

//   let clear_History = document.getElementById('clear-history');
//   if (history.length) {
//     clear_History.addEventListener('click', clearHistory);
//     clear_History.disabled = false;

//     load_Position = document.querySelectorAll('.load-position');
//     load_Position.forEach((btn, i) =>
//       btn.addEventListener('click', () => {
//         loadPosition(i);
//       }),
//     );

//     delete_One = document.querySelectorAll('.delete-one');
//     delete_One.forEach((btn, i) => {
//       btn.addEventListener('click', () => deleteOne(btn, i));
//     });
//   } else {
//     timeID = setTimeout(() => closeHistory(), 3000);
//   }

//   close_History = document.getElementById('close-history');
//   close_History.addEventListener('click', closeHistory);
// }

// function clearHistory() {
//   DB.clearHistory();
//   loadHistory(DB.savedPositions());
// }

// function closeHistory() {
//   if (delete_One) {
//     delete_One.forEach((btn, i) =>
//       btn.removeEventListener('click', () => {
//         loadPosition(btn, i);
//       }),
//     );
//   }
//   if (load_Position) {
//     load_Position.forEach((btn, i) =>
//       btn.addEventListener('click', () => {
//         loadPosition(btn, i);
//       }),
//     );
//   }
//   if (clear_History) clear_History.removeEventListener('click', clearHistory);

//   close_History.removeEventListener('click', closeHistory);
//   calcContainer.removeChild(historyContainer);
// }

// function loadPosition(index) {
//   const positionToLoad = DB.savedPositions()[index];
//   Session.loadPosition(positionToLoad, index);
//   closeHistory();
//   deleteBtn.disabled = false;
// }

// function deleteOne(actionBtn, index) {
//   const newSavedPositions = DB.savedPositions().filter((p, i) => i != index);

//   actionBtn.removeEventListener('click', deleteOne);
//   document
//     .getElementById(`delP${index}`)
//     .removeEventListener('click', closeHistory);
//   loadHistory(DB.setSavedPositions(newSavedPositions));
// }
