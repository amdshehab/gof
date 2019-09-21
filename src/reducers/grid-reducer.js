export const Cell = function(state) {
  this.isActive = state;
  this.id = Math.random()
    .toString(36)
    .substring(7);
};

const initialState = {
  grid: [...Array(20)].map(_ => [...Array(40)].map((_, i) => new Cell(false)))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SETUP_GRID":
      return {
        grid: [...state.grid, ...action.grid]
      };
    case "TOGGLE_ACTIVE":
      const gridCopy = state.grid.map(arr =>
        arr.map(cell => Object.assign({}, cell))
      );
      const [arr, i] = action.indexMap;
      const previousState = gridCopy[arr][i].isActive;
      gridCopy[arr][i].isActive = !previousState;

      return {
        ...state,
        grid: gridCopy
      };
    case "BATCH_TOGGLE_ACTIVE":
      const copyGrid = state.grid.map(arr =>
        arr.map(cell => Object.assign({}, cell))
      );
      for (let cellChange of action.cellChanges) {
        const [arr, i, state] = cellChange;
        copyGrid[arr][i].isActive = state;
      }

      return {
        ...state,
        grid: copyGrid
      };

    default:
      return state;
  }
};
