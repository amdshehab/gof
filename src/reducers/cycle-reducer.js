const initialState = {
  cycle: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_CYCLE":
      return { cycle: state.cycle + 1 };
    default:
      return state;
  }
};
