import { apiURL } from "../../utils/setAxios"
import { homeConstants } from "../constants"
// import { loadingActions } from "./loading.actions"

function getRank(number){
    return async dispatch => {
        // dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/home/tutor/ranking", {
            params : {
                rank : number
            }
        }).then((res)=>{
            if(res.data.success){
                const data = res.data.data
                dispatch(success(data))
                // dispatch(loadingActions.stopLoading())
            }
        }) .catch(err => {
            dispatch(failure(err.response.data))
            // dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: homeConstants.GET_RANK_HOME_SUCCESS, payload: data } }
    function failure(error) { return { type: homeConstants.GET_RANK_HOME_FAILURE, payload: error } }
}

export const homeActions = {
    getRank
}

