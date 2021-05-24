import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { offlineCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"


function updatefflineCourse(id, data) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.put(`/offline-course/${id}`, data)
            .then(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(success())
                dispatch(modalAction.openModal({
                    text: "แก้ไขคอร์สเรียนสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent,
                    afterClose: `/tutor/course/${id}`
                }))
            }).catch(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure())
                dispatch(modalAction.openModal({
                    text: "แก้ไขคอร์สเรียนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong
                }))
            })
    }

    function success() { return { type: offlineCourseConstants.UPDATE_OFFLINE_COURSE_SUCCESS } }
    function failure() { return { type: offlineCourseConstants.UPDATE_OFFLINE_COURSE_FAILURE, payload: true } }
}


function createOfflineCourse(data){
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/offline-course/create",data)
        .then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "สร้างคอร์สเรียนสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/tutor/course"
            }))
        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
            dispatch(modalAction.openModal({
                text: "สร้างคอร์สเรียนไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
                afterClose: "/tutor/course"
            }))
        })
    }

    function success() { return { type: offlineCourseConstants.CREATE_OFFLINE_COURSE_SUCCESS } }
    function failure() { return { type: offlineCourseConstants.CREATE_OFFLINE_COURSE_FAILURE, payload: true } }
}

function getOfflineCourse(id) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/offline-course/${id}`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure())
            })
    }

    function success(course) { return { type: offlineCourseConstants.GET_OFFLINE_COURSE_SUCCESS, payload: course } }
    function failure() { return { type: offlineCourseConstants.GET_OFFLINE_COURSE_FAILURE, payload: true } }
}

function enRollOfflineCourse(id) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post(`/offline-course/${id}/enroll`)
            .then(() => {
                dispatch(success())
                dispatch(loadingActions.stopLoading())
            })
            .catch(() => {
                dispatch(failure())
                dispatch(loadingActions.stopLoading())
            })
    }

    function success(course) { return { type: offlineCourseConstants.ENROLL_OFFLINE_COURSE_SUCCESS, payload: course } }
    function failure() { return { type: offlineCourseConstants.ENROLL_OFFLINE_COURSE_FAILURE, payload: true } }
}


function getEnrollOfflineCourse(id) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/offline-course/${id}/enroll`)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch(() => {
                dispatch(failure())
                dispatch(loadingActions.stopLoading())

            })
    }

    function success(data) { return { type: offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_SUCCESS, payload: data } }
    function failure() { return { type: offlineCourseConstants.GET_ENROLL_OFFLINE_COURSE_FAILURE, payload: true } }
}

function acceptEnrollOfflineCourse(idCourse, learnerid, status) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/offline-course/${idCourse}/accept`, {
            params: {
                learnerId: learnerid,
                action: status
            }
        }).then(() => {
            dispatch(success())
            dispatch(getEnrollOfflineCourse(idCourse))
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "จัดการการอนุมัติเข้าเรียนสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))
        })
            .catch(() => {
                dispatch(failure())
                dispatch(loadingActions.stopLoading())
                dispatch(modalAction.openModal({
                    text: "จัดการการอนุมัติเข้าเรียนไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
            })
    }

    function success() { return { type: offlineCourseConstants.ACCEPT_ENROLL_OFFLINE_COURSE_SUCCESS } }
    function failure() { return { type: offlineCourseConstants.ACCEPT_ENROLL_OFFLINE_COURSE_FAILURE, payload: true } }
}


function getLearnerOfflineCourse() {
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
            .catch(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure())
            })
    }

    function success(data) { return { type: offlineCourseConstants.GET_LEARNER_OFFLINE_COURSE_SUCCESS, payload: data } }
    function failure() { return { type: offlineCourseConstants.GET_LEARNER_OFFLINE_COURSE_FAILURE, payload: true } }
}



function clearOfflineCourse() {
    return dispatch => dispatch({ type: offlineCourseConstants.CLEAR_OFFLINE_COURSE })
}

export const offlineCourseAction = {
    createOfflineCourse,
    updatefflineCourse,
    getOfflineCourse,
    clearOfflineCourse,
    enRollOfflineCourse,
    getEnrollOfflineCourse,
    acceptEnrollOfflineCourse,
    getLearnerOfflineCourse
}