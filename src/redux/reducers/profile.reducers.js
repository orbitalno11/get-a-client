import { profileConstants } from "../constants"

const initialState = {
    profile :  null,
    profileHandle : null,
    education : null,
    loading : false
}

const profileReducer = (state = initialState , action)=>{
    switch(action.type){
        case profileConstants.GET_PROFILE:
            return {
                ...state ,
                profile : action.payload ,
                loading : false
            }
        case profileConstants.GET_HANDLE_PROFILE :
            return {
                ...state ,
                profileHandle : action.payload ,
                loading : false
            }
        case profileConstants.GET_EDUCATION: 
            return {
                ...state ,
                education :  action.payload ,
                loading : false
            }
        case profileConstants.ADD_EDUCATION : 
            return {
                ...state , 
                education : [...state.education,action.payload],
                loading : false
            }
        case profileConstants.DELETE_EDUCATION :
            return {
                ...state , 
                education : [
                    ...state.education.slice(0, action.payload),
                    ...state.education.slice(action.payload + 1)
                ],
                loading : false
            }
        default : {
            return  state
        }
    }
} 

export default profileReducer;
