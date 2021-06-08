import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { onlineCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"

// start online course
function createOnlineCourse(data) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/online-course/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(success())
                dispatch(modalAction.openModal({
                    text: "สร้างคอร์สเรียนสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent,
                    afterClose: "/tutor/online"
                }))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.openModal({
                    text: "สร้างคอร์สเรียนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            })
    }

    function success() { return { type: onlineCourseConstants.CREATE_ONLINE_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.CREATE_ONLINE_COURSE_FAILURE, payload: err } }
}

function updateOnlineCourse(data, id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.put(`/online-course/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(success())
                dispatch(modalAction.openModal({
                    text: "แก้ไขคอร์สเรียนสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent,
                    afterClose: `/online/${id}`
                }))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.openModal({
                    text: "แก้ไขคอร์สเรียนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            })
    }

    function success() { return { type: onlineCourseConstants.UPDATE_ONLINE_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.UPDATE_ONLINE_COURSE_FAILURE, payload: err } }
}

function getTutorOnlineCourse(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/${id}/online-course`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))

            })
    }

    function success(data) { return { type: onlineCourseConstants.GET_LIST_ONLINE_COURSE_TUTOR_SUCCESS, payload: data } }
    function failure(err) { return { type: onlineCourseConstants.GET_LIST_ONLINE_COURSE_TUTOR_FAILURE, payload: err } }
}


function getOnlineCourse(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/online-course/${id}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(loadingActions.stopLoading())
                    const data = res.data.data
                    dispatch(success(data))
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
            })
    }

    function success(data) { return { type: onlineCourseConstants.GET_ONLINE_COURSE_SUCCESS, payload: data } }
    function failure(err) { return { type: onlineCourseConstants.GET_ONLINE_COURSE_FAILURE, payload: err } }
}


// start clip-online course
function createClipOnlineCourse(data, id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post(`/clip/create`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "เพิ่มคลิปการสอนสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: `/course/online/${id}/video`
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "เพิ่มคลิปการสอนไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
            }))
        })
    }
    function success() { return { type: onlineCourseConstants.CREATE_CLIP_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.CREATE_CLIP_COURSE_FAILURE, payload: err } }
}


function updateClipOnlineCourse(data, courseId, videoId) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.put(`/clip/${videoId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "แก้ไขคลิปการสอนสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: `/tutor/online/${courseId}/video/${videoId}`
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "แก้ไขคลิปการสอนไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
            }))
        })
    }

    function success() { return { type: onlineCourseConstants.UPDATE_CLIP_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.UPDATE_CLIP_COURSE_FAILURE, payload: err } }
}

function getClipOnlineCourse(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/online-course/${id}/clip/`)
            .then(res => {
                if (res.data.success) {
                    dispatch(loadingActions.stopLoading())
                    const data = res.data.data
                    dispatch(success(data))
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))

            })
    }

    function success(data) { return { type: onlineCourseConstants.GET_LIST_CLIP_SUCCESS, payload: data } }
    function failure(err) { return { type: onlineCourseConstants.GET_LIST_CLIP_FAILURE, payload: err } }
}

function getClip(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/clip/${id}`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))

            })
    }

    function success(data) { return { type: onlineCourseConstants.GET_CLIP_SUCCESS, payload: data } }
    function failure(err) { return { type: onlineCourseConstants.GET_CLIP_FAILURE, payload: err } }
}

function deleteClip(courseId, videoId) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.delete(`/clip/${videoId}`)
            .then(() => {
                dispatch(success())
                dispatch(loadingActions.stopLoading())
                dispatch(getClipOnlineCourse(courseId))
                dispatch(modalAction.openModal({
                    text: "ลบคลิปการสอนสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent,
                    afterClose: `/course/online/${courseId}/video`
                }))
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.openModal({
                    text: "ลบคลิปการสอนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            })
    }

    function success(data) { return { type: onlineCourseConstants.DELETE_CLIP_SUCCESS, payload: data } }
    function failure(err) { return { type: onlineCourseConstants.DELETE_CLIP_FAILURE, payload: err } }
}


function buyClip(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/clip/${id}/buy`)
            .then(() => {
                dispatch(success())
                dispatch(loadingActions.stopLoading())
                dispatch(modalAction.openModal({
                    text: "ซื้อคลิปเรียนสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent,
                }))
            })
            .catch(err => {
                dispatch(failure(err.response?.data))
                dispatch(loadingActions.stopLoading())
                dispatch(modalAction.openModal({
                    text: "ซื้อคลิปเรียนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong,
                }))
            })
    }

    function success() { return { type: onlineCourseConstants.BUY_CLIP_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.BUY_CLIP_COURSE_FAILURE, payload: err } }
}


function clearListOnlineCourse() {
    return dispatch => { dispatch({ type: onlineCourseConstants.CLEAR_LIST_ONLINE_COURSE }) }
}


export const onlineCourseActions = {
    createOnlineCourse,
    getTutorOnlineCourse,
    clearListOnlineCourse,
    getOnlineCourse,
    createClipOnlineCourse,
    updateOnlineCourse,
    updateClipOnlineCourse,
    getClipOnlineCourse,
    getClip,
    deleteClip,
    buyClip
}