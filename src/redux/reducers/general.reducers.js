import { generalConstants } from "../constants"

const initialState = {
    branch : null,
    institute : null,
    error: null
}

const generalReducer = (state = initialState , action)=>{
    switch(action.type){
        case generalConstants.GET_BRANCH_SUCCESS:{
            return {
                ...state,
                branch : action.payload,
                error : false
            }
        }
        case generalConstants.GET_BRANCH_FAILURE:{
            return {
                ...state,
                branch : null,
                error : action.payload
            }
        }
        case generalConstants.GET_INSTITUTE_SUCCESS:{
            return {
                ...state,
                institute : action.payload,
                error : false
            }
        }
        case generalConstants.GET_INSTITUTE_FAILURE:{
            return {
                ...state,
                institute : null,
                error : action.payload
            }
        }
        default: return state    
    }
} 

export default generalReducer;
