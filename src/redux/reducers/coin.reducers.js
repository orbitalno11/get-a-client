import { coinConstants } from "../constants"

const initialState = {
    data :  null,
    error: null

}

const coinReducer = (state = initialState , action)=>{
    switch(action.type){
        case coinConstants.GET_COIN_RATE_LIST_SUCCESS:{
            return {
                ...state,
                data : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_RATE_LIST_FAILURE:{
            return {
                ...state,
                data : null,
                error : true
            }

        }
        default: return state    
    }
} 

export default coinReducer;
