import { authConstants } from "../constants"

const initialState = {
    isAuthenticated: false ,
    role : 4 , 
    loading : false ,
    error : null,
    profile : null,
    verified : null,
    email : null
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
            role: action.payload.role,
            profile : action.payload.id,
            email :  action.payload.email,
            verified :  action.payload.verified,
            loading: false,
            error : false
        }
    case authConstants.LOGIN_FAILURE:
        return {
            ...state,
            isAuthenticated: false,
            role : 4,
            profile : null,
            email:null,
            loading: false,
            verified : null,
            error : action.payload
        }
    case authConstants.LOGOUT:
        return {
            ...state,
            isAuthenticated: false,
            role : 4,
            profile : null,
            email:null,
            loading: false
        }
    default:
        return state
    }
}

export default authReducer; 
