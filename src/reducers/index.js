import { combineReducers } from "redux";
import cycleReducer from "./cycle-reducer";
import gridReducer from "./grid-reducer";

export default combineReducers({
  cycleReducer,
  gridReducer
});
