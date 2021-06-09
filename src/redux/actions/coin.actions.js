import {apiURL} from "../../utils/setAxios"
import { modalAction } from "./modal.actions"
import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { coinConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { coinErrorMessage } from "../../components/defaultValue"

function checkErrorMessage(errorMessage) {
    let message = coinErrorMessage.coinMessage[errorMessage]
    if (!message) {
        message = coinErrorMessage.coinMessage["default"]
    }
    return message
}

function getCoinRatesLearner(){ 
        return (dispatch) => {
            dispatch(loadingActions.startLoading())
            apiURL.apiGetA.get("/coin/rates?user=1").then(res => {
                dispatch(loadingActions.stopLoading())
                const coin = res.data.data.filter((item) => item.type != "transfer")
                dispatch(success(coin))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err.response.data))
            })
        }
        function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
        function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
    
}

function getCoinRatesTutor(){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/coin/rates?user=2").then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data.filter((item) => item.type === "transfer" && item.active === true)
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
}

function getCoinRatesAdmin(){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/coin/rates?user=0").then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_RATE_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_RATE_LIST_FAILURE, payload: err } }
}

function getCoinBalance(){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me/coin",{
            params:{
                type:101
            }
        }).then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_BALANCE_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_BALANCE_FAILURE, payload: err } }
}

function getCoinTransaction(){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me/coin",{
            params:{
                type:103
            }
        }).then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_TRANSACTION_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_TRANSACTION_FAILURE, payload: err } }
}

function getCoinRedeem(){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me/coin",{
            params:{
                type:105
            }
        }).then(res => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response))
        })
    }
    function success(data) { return { type: coinConstants.GET_COIN_REDEEM_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_COIN_REDEEM_FAILURE, payload: err } }
}

function createCoinRate(data){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/coin/rate",data).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getCoinRatesAdmin());
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: "ดำเนินการไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success(data) { return { type: coinConstants.CREATE_COIN_RATE_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.CREATE_COIN_RATE_FAILURE, payload: err } }
}

function clearCreateRate() {
    return (dispatch) => { dispatch({ type: coinConstants.CLEAR_COIN_RATE }) }
}

function deleteCoinRate(id) {
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.delete(`/coin/rate/${id}`).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getCoinRatesAdmin());
            dispatch(modalAction.openModal({
                text: "ลบข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err.response?.data.message)
            dispatch(modalAction.openModal({
                text: message +"ไม่สามารถลบได้",
                size: sizeModal.small,
                alert: typeModal.wrong,
            }))
        })
    }
    function success() { return { type: coinConstants.DELETE_COIN_RATE_SUCCESS } }
    function failure(err) { return { type: coinConstants.DELETE_COIN_RATE_FAILURE, payload: err } }
}

function updateCoinRate(id,data) {
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.put(`/coin/rate/${id}`,data).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getCoinRatesAdmin());
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
            }))
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err.response?.data.message)
            dispatch(modalAction.openModal({
                text: message +"ไม่สามารถแก้ไขได้",
                size: sizeModal.small,
                alert: typeModal.wrong,
            }))

        })
    }
    function success() { return { type: coinConstants.UPDATE_COIN_RATE_SUCCESS } }
    function failure(err) { return { type: coinConstants.UPDATE_COIN_RATE_FAILURE, payload: err } }
}

function activateRate(id){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/coin/rate/${id}/activate`)
        .then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getCoinRatesAdmin());
            dispatch(success())
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.ACTIVATE_COIN_RATE_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.ACTIVATE_COIN_RATE_FAILURE, payload: err } }
    
}

function getRequestsRedeem(){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
            apiURL.apiGetA.get("/coin/redeem").then(res => {
            dispatch(loadingActions.stopLoading())
            const redeemlist = res.data.data
            dispatch(success(redeemlist))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.REDEEM_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.REDEEM_LIST_FAILURE, payload: err } }
    
}

function ApproveRequestsRedeem(id){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/coin/redeem/${id}/approved`).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getRequestsRedeem());
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: "ดำเนินการไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
                }))
        })
    }
    function failure(err) { return { type: coinConstants.APPROVE_REQUEST_REDEEM_FAILURE, payload: err } }   
}

function DeniedRequestsRedeem(id,user){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/coin/redeem/${id}/denied`,{
                params:{
                    id:id,
                    user: user
                }
            }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getRequestsRedeem());
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: "ดำเนินการไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
                }))
        })
    }
    function failure(err) { return { type: coinConstants.DENIED_REQUEST_REDEEM_FAILURE, payload: err } }   
}

function createRequestRedeem(data){
    return (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/coin/redeem", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose : "/redeem"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err.response?.data.message)
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success(data) { return { type: coinConstants.CREATE_REQUEST_REDEEM_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.CREATE_REQUEST_REDEEM_FAILURE, payload: err } }
}

function CancelRequestsRedeem(id){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/coin/redeem/${id}/cancel`).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(coinAction.getRequestsRedeem());
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose : "/redeem"
                }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: "ดำเนินการไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
                }))
        })
    }
    function failure(err) { return { type: coinConstants.CANCEL_REQUEST_REDEEM_FAILURE, payload: err } }   
}

function getRequestsDetail(id){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/coin/redeem/${id}`)
        .then((res) => {
            dispatch(loadingActions.stopLoading())
            const coin = res.data.data
            dispatch(success(coin))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: coinConstants.GET_REQUEST_REDEEM_SUCCESS, payload: data } }
    function failure(err) { return { type: coinConstants.GET_REQUEST_REDEEM_FAILURE, payload: err } }
    
}
export const coinAction = {
    getCoinRatesLearner,
    getCoinRatesTutor,
    getCoinRatesAdmin,
    getCoinBalance,
    getCoinTransaction,
    createCoinRate,
    clearCreateRate,
    deleteCoinRate,
    updateCoinRate,
    activateRate,
    getRequestsRedeem,
    ApproveRequestsRedeem,
    DeniedRequestsRedeem,
    createRequestRedeem,
    getCoinRedeem,
    CancelRequestsRedeem,
    getRequestsDetail
}