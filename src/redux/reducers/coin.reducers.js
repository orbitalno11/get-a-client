import { coinConstants } from "../constants"

const initialState = {
    rateCoin :  null,
    balance :  null,
    redeem :  null,
    transaction :  null,
    error: null,
    activate:null,
    redeemList:null,
    approve:null,
    denide:null,
    requestRedeem:null,
    cancle:null,
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
        case coinConstants.GET_COIN_BALANCE_SUCCESS:{
            return {
                ...state,
                balance : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_BALANCE_FAILURE:{
            return {
                ...state,
                balance : null,
                error : true
            }

        }
        case coinConstants.GET_COIN_TRANSACTION_SUCCESS:{
            return {
                ...state,
                transaction : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_TRANSACTION_FAILURE:{
            return {
                ...state,
                transaction : null,
                error : true
            }

        }
        case coinConstants.GET_COIN_REDEEM_SUCCESS:{
            return {
                ...state,
                redeem : action.payload,
                error : false
            }

        }
        case coinConstants.GET_COIN_REDEEM_FAILURE:{
            return {
                ...state,
                redeem : null,
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
        case coinConstants.CANCEL_REQUEST_REDEEM_SUCCESS:{
            return {
                ...state,
                cancle : action.payload,
                error : false
            }

        }
        case coinConstants.CANCEL_REQUEST_REDEEM_FAILURE:{
            return {
                ...state,
                cancle : null,
                error : action.payload
            }

        }
        case coinConstants.GET_REQUEST_REDEEM_SUCCESS:{
            return {
                ...state,
                requestRedeem : action.payload,
                error : false
            }

        }
        case coinConstants.GET_REQUEST_REDEEM_FAILURE:{
            return {
                ...state,
                requestRedeem : null,
                error : action.payload
            }

        }
        default: return state    
    }
} 

export default coinReducer;
