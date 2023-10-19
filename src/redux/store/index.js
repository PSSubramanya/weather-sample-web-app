import { legacy_createStore as createStore } from "redux"; //createStore is depricated
import AppReducer from "../reducers/AppReducer";

const rootReducer = AppReducer;

const store = createStore(rootReducer);

export default store;
