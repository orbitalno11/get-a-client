
import { tutorConstants } from "../constants"

const initialState = {
    listTesting: null,
    listEducation: null,
    education: null,
    testing: null,
    error: false,
    offlineCourse: {
        success: false,
        data: null
    },
    onlineCourse: {
        success: false,
        data: null
    },
    tutorHandle: null
}

const tutorReducer = (state = initialState, action) => {
    switch (action.type) {
        case tutorConstants.GET_LIST_TESTING_SUCCESS:
            return {
                ...state,
                listTesting: action.payload,
                error: false
            }
        case tutorConstants.GET_LIST_TESTING_FAILURE:
            return {
                ...state,
                listTesting: null,
                error: action.payload
            }

        case tutorConstants.GET_LIST_EDUCATION_SUCCESS:
            return {
                ...state,
                listEducation: action.payload,
                error: false
            }
        case tutorConstants.GET_LIST_EDUCATION_FAILURE:
            return {
                ...state,
                listEducation: null,
                error: action.payload
            }
        case tutorConstants.GET_TESTING_SUCCESS:
            return {
                ...state,
                testing: action.payload,
                error: false
            }
        case tutorConstants.GET_TESTING_FAILURE:
            return {
                ...state,
                testing: null,
                error: action.payload
            }
        case tutorConstants.GET_EDUCATION_SUCCESS:
            return {
                ...state,
                education: action.payload,
                error: false
            }
        case tutorConstants.GET_EDUCATION_FAILURE:
            return {
                ...state,
                education: null,
                error: action.payload
            }
        case tutorConstants.CREATE_TESTING_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.CREATE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.CREATE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.CREATE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.DELETE_TESTING_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.DELETE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.DELETE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.DELETE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.UPDATE_TESTING_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.UPDATE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.UPDATE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: false
            }
        case tutorConstants.UPDATE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.GET_LIST_OFFLINE_COURSE_SUCCESS:
            return {
                ...state,
                offlineCourse: {
                    success: true,
                    data: action.payload
                },
                error: false
            }
        case tutorConstants.GET_LIST_OFFLINE_COURSE_FAILURE:
            return {
                ...state,
                offlineCourse: {
                    success: true,
                    data: null
                },
                error: action.payload
            }
        case tutorConstants.GET_LIST_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                onlineCourse: {
                    success: true,
                    data: action.payload
                },
                error: false
            }
        case tutorConstants.GET_LIST_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                onlineCourse: {
                    success: true,
                    data: null
                },
                error: action.payload
            }
        case tutorConstants.GET_TUTOR_PROFILE_SUCCESS:
            return {
                ...state,
                tutorHandle: action.payload,
                error: false
            }
        case tutorConstants.GET_TUTOR_PROFILE_FAILURE:
            return {
                ...state,
                tutorHandle: null,
                error: action.payload
            }
        case tutorConstants.CLEAR_LIST_OFFLINE_COURSE:
            return {
                ...state,
                tutorHandle: null,
                offlineCourse: {
                    success: false,
                    data: null
                },
                listTesting: null,
                listEducation: null,
                education: null,
                testing: null,
                error: false
            }

        default: {
            return state
        }
    }
}

export default tutorReducer;