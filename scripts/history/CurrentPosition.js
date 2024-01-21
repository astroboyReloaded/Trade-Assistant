import { returnFieldsAs } from "../helperFunctions.js";

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
  
    if(positionToLoad) {
      let fields = returnFieldsAs('Array');
      fields.forEach((field, i) => field.value = Object.values(this.setCurrentPosition(positionToLoad))[i]);
    }
  }

  clearCurrentPosition() {
    this.setCurrentPosition({});
  }
};

const Session = new CurrentPosition();
export default Session;