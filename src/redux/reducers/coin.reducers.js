import { coinConstants } from "../constants"

const initialState = {
    rateCoin :  null,
    coinUser :  null,
    error: null

}

const coinReducer = (state = initialState , action)=>{
    switch(action.type){
        case coinConstants.GET_COIN_RATE_LIST_SUCCESS:{
            return {
                ...state,
                rateCoin : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_RATE_LIST_FAILURE:{
            return {
                ...state,
                rateCoin : null,
                error : true
            }

        }
        case coinConstants.GET_COIN_USER_LIST_SUCCESS:{
            return {
                ...state,
                coinUser : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_USER_LIST_FAILURE:{
            return {
                ...state,
                coinUser : null,
                error : true
            }

        }
        case coinConstants.CREATE_COIN_RATE_SUCCESS:{
            return {
                ...state,
                error : false
            }

        }
        case coinConstants.CREATE_COIN_RATE_FAILURE:{
            return {
                ...state,
                error : action.payload
            }

        }
        case coinConstants.UPDATE_COIN_RATE_SUCCESS:{
            return {
                ...state,
                error : false
            }

        }
        case coinConstants.UPDATE_COIN_RATE_FAILURE:{
            return {
                ...state,
                error : action.payload
            }

        }
        case coinConstants.DELETE_COIN_RATE_SUCCESS:{
            return {
                ...state,
                error : false
            }

        }
        case coinConstants.DELETE_COIN_RATE_FAILURE:{
            return {
                ...state,
                error : action.payload
            }

        }
        case coinConstants.CLEAR_COIN_RATE:{
            return {
                ...state,
                createCoin : null,
                error: null
            }

        }
        default: return state    
    }
} 

export default coinReducer;
