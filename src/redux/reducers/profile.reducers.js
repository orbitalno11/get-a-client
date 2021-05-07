import { profileConstants } from "../constants"

const initialState = {
    profile: null,
    profileHandle: null,
    error: null
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
        default: {
            return state
        }
    }
}

export default profileReducer;