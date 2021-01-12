import {
    GET_PROFILE , 
    GET_EDUCATION ,
    ADD_EDUCATION , 
    DELETE_EDUCATION ,
    GET_HANDLE_PROFILE
} from '../actions/types'

const initialState = {
    profile :  null,
    profileHandle : null,
    education : null,
    loading : false
}

export default (state = initialState , action)=>{
    switch(action.type){
        case GET_PROFILE:
            return {
                ...state ,
                profile : action.payload ,
                loading : false
            }
        case GET_HANDLE_PROFILE :
            return {
                ...state ,
                profileHandle : action.payload ,
                loading : false
            }
        case GET_EDUCATION: 
            return {
                ...state ,
                education :  action.payload ,
                loading : false
            }
        case ADD_EDUCATION : 
            return {
                ...state , 
                education : [...state.education,action.payload],
                loading : false
            }
        case DELETE_EDUCATION :
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