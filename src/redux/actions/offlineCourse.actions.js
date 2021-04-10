import { offlineCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import apiGetA from "../../utils/setAxios"


function getOfflineCourse(id) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        apiGetA.get(`/offline-course/${id}`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function success(course) { return { type: offlineCourseConstants.GET_OFFLINE_COURSE, payload: course } }
}

export const offlineCourse = {
    getOfflineCourse
}