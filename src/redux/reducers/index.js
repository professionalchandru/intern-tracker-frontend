import isLoggedIn from "./isLoggedIn";
import { combineReducers } from "redux";

const allReducer = combineReducers({
    isLoggedIn,
});

export default allReducer;
