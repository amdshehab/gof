export const Cell = function(state) {
  this.isActive = state;
};

const initialState = {
  grid: [...Array(20)].map(_ => [...Array(20)].map((_, i) => new Cell(false)))
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SETUP_GRID":
      return {
        grid: [...state.grid, ...action.grid]
      };
    case "TOGGLE_ACTIVE":
      const copySubArray = state.grid[action.indexMap[0]].map((x, i) => {
        if (i === action.indexMap[1]) {
          return {
            ...x,
            isActive: !x.isActive
          };
        }
        return x;
      });

      return {
        ...state,
        grid: state.grid.map((x, i) =>
          i === action.indexMap[0] ? copySubArray : x
        )
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
