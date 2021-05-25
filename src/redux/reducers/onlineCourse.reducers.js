
import { onlineCourseConstants } from "../constants"

const initialState = {
    profile: null,
    error: null,
}

const onlineCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case onlineCourseConstants.CREATE_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.CREATE_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: {
            return state
        }
    }
}

export default onlineCourseReducer;