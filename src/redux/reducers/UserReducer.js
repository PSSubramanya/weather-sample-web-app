import { FAVOURITE_CITIES, RECENT_CITIES } from "../../constants/types";
import { combineReducers } from "redux";

const initialState = {
  data: {},
};

const favouriteLocations = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_CITIES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const recentLocations = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_CITIES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

const userDataReducer = combineReducers({
  favouriteLocations,
  recentLocations,
});

export default userDataReducer;
