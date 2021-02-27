import { combineReducers } from "redux";
import profileReducers from "./profileReducers"

export default combineReducers({
    profile:profileReducers,
})
