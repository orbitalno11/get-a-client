import { homeConstants } from "../constants"

const initialState = {
    offlineCourseRank : null ,
    error : null  
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
    case homeConstants.GET_RANK_HOME_SUCCESS:
        return {
            ...state,
            offlineCourseRank: action.payload,
            error : null
        }
    case homeConstants.GET_RANK_HOME_FAILURE:
        return {
            ...state,
            offlineCourseRank: null,
            error : action.payload
        }
    default:
        return state
    }
}

export default homeReducer; 
