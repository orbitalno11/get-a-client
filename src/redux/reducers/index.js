import { combineReducers } from 'redux';
import profileReducers from './profile.reducers'
import authReducers from "./auth.reducers";
import modalReducers from "./modal.reducers";

const rootReducer = combineReducers({
    profile:profileReducers,
    auth : authReducers,
    modal : modalReducers
});

export default rootReducer;