import { offlineCourseConstants } from "../constants"

const initialState = {
    data: null,
    enrollList: null,
    error: null,
    enrollSuccess : false,
    learnerCourse : null
}

const offlineCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case offlineCourseConstants.GET_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: false,
            }
        case offlineCourseConstants.GET_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                data: null,
                error: action.payload
            }
        case offlineCourseConstants.GET_LEARNER_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                learnerCourse: action.payload,
                error: false,
            }
        case offlineCourseConstants.GET_LEARNER_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                learnerCourse: null,
                error: action.payload
            }
        case offlineCourseConstants.CREATE_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case offlineCourseConstants.CREATE_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.UPDATE_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case offlineCourseConstants.UPDATE_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case offlineCourseConstants.ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                enrollSuccess : true,
                error: false,
            }
        case offlineCourseConstants.ENROLL_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                enrollSuccess : false,
                error: action.payload
            }
        case offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                enrollList: {
                    data : action.payload,
                    success : true
                },
                error: false,
            }
        case offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                enrollList: {
                    data : null,
                    success : true
                },
                error: action.payload
            }
        case offlineCourseConstants.ACCEPT_ENROLL_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: false,
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
                enrollList: null,
                error: false,
                enrollSuccess : false,
            }
        default:
            return state
    }
}

export default offlineCourseReducer;