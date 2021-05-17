import { coinConstants } from "../constants"

const initialState = {
    rateCoin :  null,
    coinUser :  null,
    createCoin : null,
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
        case coinConstants.GET_COIN_CREATE_LIST_SUCCESS:{
            return {
                ...state,
                createCoin : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_CREATE_LIST_FAILURE:{
            return {
                ...state,
                createCoin : null,
                error : true
            }

        }
        case coinConstants.GET_COIN_USER_LIST_SUCCESS:{
            return {
                ...state,
                data : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_USER_LIST_FAILURE:{
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
