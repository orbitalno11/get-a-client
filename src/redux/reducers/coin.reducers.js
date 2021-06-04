import { coinConstants } from "../constants"

const initialState = {
    rateCoin :  null,
    coinUser :  null,
    error: null,
    activate:null,
    redeemList:null,
    approve:null,
    denide:null,
    
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
        case coinConstants.ACTIVATE_COIN_RATE_SUCCESS:{
            return {
                ...state,
                activate : action.payload,
                error : false
            }

        }
        case coinConstants.ACTIVATE_COIN_RATE_FAILURE:{
            return {
                ...state,
                activate : null,
                error : true
            }

        }
        case coinConstants.CLEAR_COIN_RATE:{
            return {
                ...state,
                rateCoin : null,
                error: null
            }

        }
        case coinConstants.REDEEM_LIST_SUCCESS:{
            return {
                ...state,
                redeemList : action.payload,
                error : false
            }

        }
        case coinConstants.REDEEM_LIST_FAILURE:{
            return {
                ...state,
                redeemList : null,
                error : true
            }

        }
        case coinConstants.APPROVE_REQUEST_REDEEM_SUCCESS:{
            return {
                ...state,
                approve : action.payload,
                error : false
            }

        }
        case coinConstants.APPROVE_REQUEST_REDEEM_FAILURE:{
            return {
                ...state,
                approve : null,
                error : true
            }

        }
        case coinConstants.DENIED_REQUEST_REDEEM_SUCCESS:{
            return {
                ...state,
                denide : action.payload,
                error : false
            }

        }
        case coinConstants.DENIED_REQUEST_REDEEM_FAILURE:{
            return {
                ...state,
                denide : null,
                error : true
            }

        }
        case coinConstants.CREATE_REQUEST_REDEEM_SUCCESS:{
            return {
                ...state,
                error : false
            }

        }
        case coinConstants.CREATE_REQUEST_REDEEM_FAILURE:{
            return {
                ...state,
                error : action.payload
            }

        }
        default: return state    
    }
} 

export default coinReducer;
