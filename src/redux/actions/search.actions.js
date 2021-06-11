import { searchConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { apiURL } from "../../utils/setAxios"

function getSearch({ data, redirectPath, typeFocus, type }) {
    return dispatch => {
        const params = data ? ({
            params : {
                grade: data.grade,
                subject: data.subject,
                gender: data.gender,
                type: data.type,
                location: data.location,
                limit: 10
            }
        }) : null

        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(redirectPath,params)
            .then((res) => {
                if (res.data.success) {
                    const result = res.data.data
                    dispatch(loadingActions.stopLoading())
                    dispatch(success({
                        resultSearch: result,
                        type: type ? type : "N/A",
                        typeFocus: typeFocus,
                        location: data.location
                    }))
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
            })
    }
    function success(data) { return { type: searchConstants.GET_SEARCH_SUCCESS, payload: data } }
    function failure(err) { return { type: searchConstants.GET_SEARCH_FAILURE, payload: err } }
}

function clearSearch() {
    return dispatch => { dispatch({ type: searchConstants.CLEAR_SEARCH }) }
}
export const searchActions = {
    getSearch,
    clearSearch
}