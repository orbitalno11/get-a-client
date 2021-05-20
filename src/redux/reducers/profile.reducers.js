
import { profileConstants } from "../constants"

const initialState = {
    profile: null,
    profileHandle: null,
    error: null,
    address: {},
    getAddress : false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileConstants.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                error: null
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
                error: null
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
                getAddress : true,
                error: null
            }
        case profileConstants.GET_ADDRESS_FAILURE:
            return {
                ...state,
                address: {},
                getAddress : false,
                error: action.payload
            }
        case profileConstants.SET_ADDRESS_SUCCESS:
            return {
                ...state,
                error: null
            }
        case profileConstants.SET_ADDRESS_FAILURE:
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