import { combineReducers } from 'redux'
import profileReducers from './profile.reducers'
import authReducers from "./auth.reducers"
import modalReducers from "./modal.reducers"
import offlineCourseReducer from "./offlineCourse.reducers"
import loadingReducer from "./loading.reducers"
import coinReducer from "./coin.reducers";
import verifyReducer from "./verify.reducers"
import tutorReducer from "./tutor.reducers"
import homeReducer from "./home.reducers"
import reviewReducer from "./review.reducers"
import onlineCourseReducer from "./onlineCourse.reducers"
import searchReducer from "./search.reducers"
import favoriteReducer from "./favorite.reducers"
import myCourseReducer from "./myCourse.reducers"
import generalReducer from "./general.reducers"

const rootReducer = combineReducers({
    profile:profileReducers,
    auth : authReducers,
    modal : modalReducers,
    offlineCourse : offlineCourseReducer,
    loading : loadingReducer,
    coin : coinReducer,
    verify:verifyReducer,
    tutor : tutorReducer,
    home : homeReducer,
    review : reviewReducer,
    onlineCourse : onlineCourseReducer,
    search : searchReducer,
    favorite : favoriteReducer,
    myCourse : myCourseReducer,
    general : generalReducer
});

export default rootReducer;
