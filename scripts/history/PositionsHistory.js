class PositionsHistory {
  savedPositions() {
    return JSON.parse(localStorage.getItem('saved-positions')) || [];
  }

  setSavedPositions(newData) {
    try {
      localStorage.setItem('saved-positions', JSON.stringify(newData));
      return this.savedPositions();
    } catch (e) {
      throw new Error(
        `New data has NOT been provided for "setSavedPositions" method: ${e}`,
      );
    }
  }

  clearHistory() {
    this.setSavedPositions([]);
    return this.savedPositions();
  }
}

const DB = new PositionsHistory();
export default DB;
