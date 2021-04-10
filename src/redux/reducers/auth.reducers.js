import { authConstants } from "../constants"

const initialState = {
    isAuthenticated: false ,
    status : false , 
    loading : false ,
    error : false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case authConstants.START_LOADING:
        return {
            ...state,
            loading: true
        }
    case authConstants.STOP_LOADING:
        return {
            ...state,
            loading: false
        }
    case authConstants.LOGIN_SUCCESS:
        return {
            ...state,
            isAuthenticated: true,
            status: action.payload,
            loading: false
        }
    case authConstants.LOGIN_FAILURE:
        return {
            ...state,
            isAuthenticated: false,
            status : false,
            loading: false,
            error : true
        }
    default:
        return state
    }
}

export default authReducer;

