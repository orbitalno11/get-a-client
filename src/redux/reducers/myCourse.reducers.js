import { myCourseConstants } from "../constants"

const initialState = {
    offlineCourse: null,
    onlineCourse : null,
    error: null,
}

const myCourseReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case myCourseConstants.MY_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                offlineCourse: action.payload,
                error: false,
            }
        case myCourseConstants.MY_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                offlineCourse: null,
                error: action.payload
            }
        case myCourseConstants.MY_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                onlineCourse: action.payload,
                error: false,
                }
        case myCourseConstants.MY_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                onlineCourse: null,
                error: action.payload
                }
        default:
            return state
    }
}

export default myCourseReducer;