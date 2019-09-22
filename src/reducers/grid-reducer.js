export const Cell = function(state) {
  this.isActive = state;
  this.id = Math.random()
    .toString(36)
    .substring(7);
};

const createGrid = (rows, cols) => {
  return [...Array(rows)].map(_ => [...Array(cols)].map(_ => new Cell(false)));
};

const initialState = {
  grid: createGrid(20, 40)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NEW_MATRIX":
      const { rows, cols } = action;
      return {
        grid: createGrid(rows, cols)
      };
    case "CLEAR_GRID":
      return {
        ...state,
        grid: state.grid.map(arr =>
          arr.map(cell => ({ ...cell, isActive: false }))
        )
      };
    case "RANDOMIZE_GRID":
      return {
        ...state,
        grid: state.grid.map(arr =>
          arr.map(cell => ({
            ...cell,
            isActive: Math.random() > 0.8 ? true : false
          }))
        )
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
