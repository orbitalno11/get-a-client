import { myCourseConstants } from "../constants"

const initialState = {
    tutorCourselist: null,
    error: null,
}

const myCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case myCourseConstants.GET_TUTOR_MYCOURSE_SUCCESS:
            return {
                ...state,
                tutorCourselist: action.payload,
                error: false,
            }
        case myCourseConstants.GET_TUTOR_MYCOURSE_FAILURE:
            return {
                ...state,
                tutorCourselist: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default myCourseReducer;