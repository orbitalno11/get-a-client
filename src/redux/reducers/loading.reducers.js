import { loadingConstants } from "../constants"

const initialState = {
    loading : false 
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
    case loadingConstants.START_LOADING:
        return {
            ...state,
            loading: true
        }
    case loadingConstants.STOP_LOADING:
        return {
            ...state,
            loading: false
        }
    default:
        return state
    }
}

export default loadingReducer;