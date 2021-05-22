import { homeConstants } from "../constants"

const initialState = {
    offlineCourseRank: null,
    onlineCourseRank: null,
    error: false
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case homeConstants.GET_RANK_HOME_SUCCESS:
            return {
                ...state,
                offlineCourseRank: action.payload,
                error: false
            }
        case homeConstants.GET_RANK_HOME_FAILURE:
            return {
                ...state,
                offlineCourseRank: null,
                error: action.payload
            }
        case homeConstants.GET_RANK_ONLINE_HOME_SUCCESS:
            return {
                ...state,
                onlineCourseRank: action.payload,
                error: false
            }
        case homeConstants.GET_RANK_ONLINE_HOME_FAILURE:
            return {
                ...state,
                onlineCourseRank: null,
                error: action.payload
            }
        case homeConstants.CLEAR_HOME:
            return {
                ...state,
                offlineCourseRank: null,
                onlineCourseRank: null,
                error: false
            }

        default:
            return state
    }
}

export default homeReducer;
