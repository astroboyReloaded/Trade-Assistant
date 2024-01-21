import { returnFieldsAs } from "../helperFunctions.js";
import DB from "./PositionsHistory.js";
import Session from "./CurrentPosition.js";

let afterCalcBtns = document.querySelectorAll('.after-calcBtn');
afterCalcBtns.forEach((btn, i) => btn.addEventListener('click', () => afterCalcActions(btn, i)));
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
};

function deletePositionfromHistory(positionIndex) {
  const newSavedPositions = DB.savedPositions().filter((p, i) => i !== positionIndex);
  DB.setSavedPositions(newSavedPositions);
  clear();
  deleteBtn.disabled = true;
}

function clearAllFields() {
  returnFieldsAs('Array').forEach(field => {
    field.value = '';
    field.id === 'eP' && field.focus();
  });
  deleteBtn.disabled = true;
};

function clear() {
  returnFieldsAs('Array').forEach(field => {
    if (field.id !== 'blnc' && field.id !== 'rskPrc') field.value = '';
    field.id === 'eP' && field.focus();
  });
  Session.clearCurrentPosition();
  deleteBtn.disabled = true;
};

function savePosition() {
  const newPosition = returnFieldsAs('Object');
  const newSavedPositions = [newPosition, ...DB.savedPositions()];
  DB.setSavedPositions(newSavedPositions);
};
