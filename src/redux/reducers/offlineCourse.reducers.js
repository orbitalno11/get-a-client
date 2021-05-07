import { offlineCourseConstants } from "../constants"

const initialState = {
    data: null ,
}

const offlineCourseReducer = (state = initialState, action) => {
    switch (action.type) {
    case offlineCourseConstants.GET_OFFLINE_COURSE:
        return {
            ...state,
            data: action.payload
        }
    default:
        return state
    }
}

export default offlineCourseReducer;