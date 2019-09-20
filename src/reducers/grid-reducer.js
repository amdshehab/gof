const Cell = function() {
  this.isActive = false;
};

const initialState = {
  grid: [...Array(10)].map(_ => [...Array(10)].map((_, i) => new Cell()))
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
    default:
      return state;
  }
};
