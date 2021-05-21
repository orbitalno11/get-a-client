
import { tutorConstants } from "../constants"

const initialState = {
    listTesting: null,
    listEducation: null,
    education: null,
    testing: null,
    error: null
}

const tutorReducer = (state = initialState, action) => {
    switch (action.type) {
        case tutorConstants.GET_LIST_TESTING_SUCCESS:
            return {
                ...state,
                listTesting: action.payload,
                error: null
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
                error: null
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
                error: null
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
                error: null
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
                error: null
            }
        case tutorConstants.CREATE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.CREATE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: null
            }
        case tutorConstants.CREATE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.DELETE_TESTING_SUCCESS:
            return {
                ...state,
                error: null
            }
        case tutorConstants.DELETE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.DELETE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: null
            }
        case tutorConstants.DELETE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.UPDATE_TESTING_SUCCESS:
            return {
                ...state,
                error: null
            }
        case tutorConstants.UPDATE_TESTING_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case tutorConstants.UPDATE_EDUCATION_SUCCESS:
            return {
                ...state,
                error: null
            }
        case tutorConstants.UPDATE_EDUCATION_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: {
            return state
        }
    }
}

export default tutorReducer;