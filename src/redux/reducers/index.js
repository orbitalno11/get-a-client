import { combineReducers } from 'redux'
import profileReducers from './profile.reducers'
import authReducers from "./auth.reducers"
import modalReducers from "./modal.reducers"
import offlineCourseReducer from "./offlineCourse.reducers"
import loadingReducer from "./loading.reducers"

const rootReducer = combineReducers({
    profile:profileReducers,
    auth : authReducers,
    modal : modalReducers,
    offlineCourse : offlineCourseReducer,
    loading : loadingReducer
});

export default rootReducer;
