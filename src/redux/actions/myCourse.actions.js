import { apiURL } from "../../utils/setAxios"
import { myCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getmyTutorCourse() {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/learner/offline-course")
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err.response?.data))
            })
    }

    function success(mycourse) { return { type: myCourseConstants.GET_TUTOR_MYCOURSE_SUCCESS, payload: mycourse } }
    function failure(err) { return { type: myCourseConstants.GET_TUTOR_MYCOURSE_FAILURE, payload: err } }
}

export const myCourseAction = {
    getmyTutorCourse
}