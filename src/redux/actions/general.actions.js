import { apiURL } from "../../utils/setAxios"
import { generalConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getBranch() {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetAData.get("/_data/branch")
        .then((res) => {
            if (res.data.success) {
                dispatch(loadingActions.stopLoading())
                const data = res.data.data
                dispatch(success(data))
            }
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: generalConstants.GET_BRANCH_SUCCESS, payload: data } }
    function failure(error) { return { type: generalConstants.GET_BRANCH_FAILURE, payload: error } }
}

function getInstitute() {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetAData.get("/_data/institute")
        .then((res) => {
            if (res.data.success) {
                dispatch(loadingActions.stopLoading())
                const data = res.data.data
                dispatch(success(data))
            }
        }).catch(err => {
            dispatch(failure(err.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: generalConstants.GET_INSTITUTE_SUCCESS, payload: data } }
    function failure(error) { return { type: generalConstants.GET_INSTITUTE_FAILURE, payload: error } }
}

export const generalActions = {
    getBranch,
    getInstitute,
}

