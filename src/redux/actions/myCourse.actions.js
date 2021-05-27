import { apiURL } from "../../utils/setAxios"
import { myCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getmyTutorCourse() {
    return  dispatch => {
        dispatch(loadingActions.startLoading())
         apiURL.apiGetA.get("/learner/offline-course")
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

    function success(mycourse) { return { type: myCourseConstants.GET_OFFLINE_COURSE_SUCCESS, payload: mycourse } }
    function failure(err) { return { type: myCourseConstants.GET_OFFLINE_COURSE_FAILURE, payload: err } }
}

function getmyCourse() {
    return  dispatch => {
        dispatch(loadingActions.startLoading())
         apiURL.apiGetA.get("/learner/online-course")
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

    function success(mycourse) { return { type: myCourseConstants.GET_ONLINE_COURSE_SUCCESS, payload: mycourse } }
    function failure(err) { return { type: myCourseConstants.GET_ONLINE_COURSE_FAILURE, payload: err } }
}

export const myCourseAction = {
    getmyTutorCourse,
    getmyCourse
}