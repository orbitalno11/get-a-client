import { apiURL } from "../../utils/setAxios"
import { homeConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getRank(number) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/home/tutor/ranking", {
            params: {
                rank: number
            }
        }).then((res) => {
            if (res.data.success) {
                const data = res.data.data
                console.log(res.data.data)
                dispatch(success(data))
                dispatch(loadingActions.stopLoading())
            }
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: homeConstants.GET_RANK_HOME_SUCCESS, payload: data } }
    function failure(error) { return { type: homeConstants.GET_RANK_HOME_FAILURE, payload: error } }
}

function getRankOnline(number) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/home/online/ranking", {
            params: {
                rank: number
            }
        }).then((res) => {
            if (res.data.success) {
                const data = res.data.data
                dispatch(success(data))
                dispatch(loadingActions.stopLoading())
            }
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: homeConstants.GET_RANK_ONLINE_HOME_SUCCESS, payload: data } }
    function failure(error) { return { type: homeConstants.GET_RANK_ONLINE_HOME_FAILURE, payload: error } }
}

function clearHome() {
    return dispatch => { dispatch({ type: homeConstants.CLEAR_HOME }) }
}

export const homeActions = {
    getRank,
    getRankOnline,
    clearHome
}

