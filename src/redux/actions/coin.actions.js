import  apiGetA  from "../../utils/setAxios"
import { coinConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getCoinRatesLearner(){ 
        return async dispatch => {
            dispatch(loadingActions.startLoading())
            await apiGetA.get("/coin/rates?user=1").then(res => {
                dispatch(loadingActions.stopLoading())
                const coin = res.data.data.filter((item) => item.type === "std")
                dispatch(success(coin))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err.response.data.message.message))
            })
        }
        function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
        function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
    
}

function getCoinRatesTutor(){
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiGetA.get("/coin/rates?user=2").then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data.filter((item) => item.type === "std")
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data.message.message))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
}

function getCoinRatesAdmin(){
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiGetA.get("/coin/rates?user=0").then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data.message.message))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
}
export const coinAction = {
    getCoinRatesLearner,
    getCoinRatesTutor,
    getCoinRatesAdmin
}