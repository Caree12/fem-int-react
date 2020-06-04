// root reducer
import { combineReducers } from "redux";
import location from "./location.js";
import theme from "./theme.js";

export default combineReducers({
    // location: location - since same name we can just do location
    location,
    theme
})