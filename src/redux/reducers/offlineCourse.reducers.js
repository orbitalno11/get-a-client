import { offlineCourseConstants } from "../constants"

const initialState = {
    data: null,
    enrollList: null,
    error: null
}

const offlineCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case offlineCourseConstants.GET_OFFLINE_COURSE:
            return {
                ...state,
                data: action.payload
            }
        case offlineCourseConstants.CREATE_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case offlineCourseConstants.CREATE_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.UPDATE_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case offlineCourseConstants.UPDATE_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case offlineCourseConstants.ENROLL_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                enrollList: action.payload,
                error: null
            }
        case offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                enrollList: null,
                error: action.payload
            }
        case offlineCourseConstants.ACCEPT_ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case offlineCourseConstants.ACCEPT_ENROLL_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.CLEAR_OFFLINE_COURSE:
            return {
                ...state,
                data: null,
                enrollList : null,
                error: null
            }
        default:
            return state
    }
}

export default offlineCourseReducer;