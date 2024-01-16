import { setSavedPositions } from './saveToLS.js';
let savedPositions;

let historyContainer, calcContainer;
document.getElementById('history').addEventListener('click', openCalcHistory);

function openCalcHistory() {
  savedPositions = setSavedPositions() || [];

  historyContainer = document.createElement('div');
  historyContainer.id = 'history-container';
  
  calcContainer = document.getElementById('calc');
  calcContainer.appendChild(historyContainer);

  loadHistory(savedPositions);
};

function loadHistory(history) {
  let positionsHistory = history.map((position, i) => `<object class='history-item'>
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
  || '<p>There are no positions saved</p>';

  historyContainer.innerHTML = `<div class="close-clearHistory_cont">
    <button id="clear-history">Clear History</button>
    <span id="close-history">X</span>
  </div>
  ${positionsHistory}`;

  if (history.length) {
    document.querySelectorAll('.delete-one').forEach((btn, i) => btn.addEventListener('click', function() {
      deleteOne(btn, i);
    }));

    document.getElementById('clear-history').addEventListener('click', clearHisttory)
  };

  document.getElementById('close-history').addEventListener('click', function() {
    closeHistory(this);
  });
}

function deleteOne(actionBtn, index) {
  const newSavedPositions = savedPositions.filter((p, i) => i != index);

  savedPositions = setSavedPositions(newSavedPositions);

  actionBtn.removeEventListener('click', deleteOne);
  document.getElementById(`delP${index}`).removeEventListener('click', closeHistory);
  loadHistory(savedPositions);
};

function clearHisttory() {
  savedPositions = setSavedPositions([]);
};

function closeHistory(closeBtn) {
  calcContainer.removeChild(historyContainer);
  closeBtn.removeEventListener('click', closeHistory);
};