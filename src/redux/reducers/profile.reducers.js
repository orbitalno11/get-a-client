
import { profileConstants } from "../constants"

const initialState = {
    profile: null,
    profileHandle: null,
    error: false,
    address: {},
    getAddress: false,
    identity: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileConstants.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                error: false,
            }
        case profileConstants.GET_PROFILE_FAILURE:
            return {
                ...state,
                profile: null,
                error: action.payload
            }
        case profileConstants.GET_HANDLE_PROFILE:
            return {
                ...state,
                profileHandle: action.payload,
            }
        case profileConstants.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case profileConstants.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case profileConstants.GET_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload,
                getAddress: true,
                error: false,
            }
        case profileConstants.GET_ADDRESS_FAILURE:
            return {
                ...state,
                address: {},
                getAddress: false,
                error: action.payload
            }
        case profileConstants.SET_ADDRESS_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case profileConstants.SET_ADDRESS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case profileConstants.CREATE_IDENTIFY_TUTOR_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case profileConstants.CREATE_IDENTIFY_TUTOR_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case profileConstants.GET_IDENTIFY_TUTOR_SUCCESS:
            return {
                ...state,
                identity: action.payload,
                error: false,
            }
        case profileConstants.GET_IDENTIFY_TUTOR_FAILURE:
            return {
                ...state,
                identity: null,
                error: action.payload
            }
        case profileConstants.UPDATE_IDENTIFY_TUTOR_SUCCESS:
            return {
                ...state,
                error: false,
            }
        case profileConstants.UPDATE_IDENTIFY_TUTOR_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default: {
            return state
        }
    }
}

export default profileReducer;