import { combineReducers } from "redux";
import UserReducer from "./UserReducer.js";

const AppReducer = combineReducers({
  userDataReducer: UserReducer,
});

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    default:
      return AppReducer(state, action);
  }
};
export default mainReducer;
