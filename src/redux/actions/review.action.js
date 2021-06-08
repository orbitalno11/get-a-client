import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { reviewConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"
import { offlineCourseAction } from "./offlineCourse.actions"
import { onlineCourseActions } from "./onlineCourse.actions"

const getReviewByCourse = (id, courseType) => {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/review/course/${id}`, {
            params: {
                type: courseType
            }
        }).then((res) => {
            if (res.data.data) {
                const data = res.data.data
                dispatch(success(data))
                dispatch(loadingActions.stopLoading())
            }
        })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
            })

        function success(data) { return { type: reviewConstants.GET_REVIEW_SUCCESS, payload: data } }
        function failure(err) { return { type: reviewConstants.GET_REVIEW_FAILURE, payload: err } }
    }
}

const createReview = (data) => {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/review", data)
            .then(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(success())
                if (data.isClip) {
                    dispatch(getReviewClip(data.clipId))
                    dispatch(onlineCourseActions.getOnlineCourse(data.courseId))
                } else {
                    dispatch(getReviewByCourse(data.courseId, data.courseType))
                    dispatch(offlineCourseAction.getOfflineCourse(data.courseId))
                }
                dispatch(modalAction.closeModal())
                dispatch(modalAction.openModal({
                    text: "แสดงความคิดเห็นสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.closeModal())
                dispatch(modalAction.openModal({
                    text: "แสดงความคิดเห็นไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
            })

        function success() { return { type: reviewConstants.CREATE_REVIEW_SUCCESS } }
        function failure(err) { return { type: reviewConstants.CREATE_REVIEW__FAILURE, payload: err } }
    }
}


const updateReview = (data) => {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.put("/review", data)
            .then(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(success())
                if (data.isClip) {
                    dispatch(getReviewClip(data.clipId))
                    dispatch(onlineCourseActions.getOnlineCourse(data.courseId))
                } else {
                    dispatch(getReviewByCourse(data.courseId, data.courseType))
                    dispatch(offlineCourseAction.getOfflineCourse(data.courseId))
                }
                dispatch(modalAction.closeModal())
                dispatch(modalAction.openModal({
                    text: "แก้ไขความเห็นสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
            })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.closeModal())
                dispatch(modalAction.openModal({
                    text: "แก้ไขความคิดเห็นไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong
                }))
            })

        function success() { return { type: reviewConstants.UPDATE_REVIEW_SUCCESS } }
        function failure(err) { return { type: reviewConstants.UPDATE_REVIEW__FAILURE, payload: err } }
    }
}

const deleteReviewByCourse = (Reviewid, courseType, idCourse, videoId) => {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.delete(`/review/${Reviewid}`, {
            params: {
                course: idCourse,
                type: courseType,
                clip: videoId
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            if (videoId) {
                dispatch(getReviewClip(videoId))
                dispatch(onlineCourseActions.getOnlineCourse(idCourse))
            } else {
                dispatch(getReviewByCourse(idCourse, courseType))
                dispatch(offlineCourseAction.getOfflineCourse(idCourse))
            }
            dispatch(modalAction.closeModal())
            dispatch(modalAction.openModal({
                text: "ลบความเห็นสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))
        })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
                dispatch(modalAction.closeModal())
                dispatch(modalAction.openModal({
                    text: "ลบความคิดเห็นไม่สำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.wrong
                }))
            })


        function success() { return { type: reviewConstants.DELETE_REVIEW_SUCCESS } }
        function failure(err) { return { type: reviewConstants.DELETE_REVIEW__FAILURE, payload: err } }
    }
}

const getReviewClip = (id) => {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/review/clip/${id}`,).then((res) => {
            if (res.data.data) {
                const data = res.data.data
                dispatch(loadingActions.stopLoading())
                dispatch(success(data))
            }
        })
            .catch((err) => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
            })

        function success(data) { return { type: reviewConstants.GET_REVIEW_SUCCESS, payload: data } }
        function failure(err) { return { type: reviewConstants.GET_REVIEW_FAILURE, payload: err } }
    }
}

function clearReview() {
    return dispatch => { dispatch({ type: reviewConstants.CLEAR_REVIEW }) }
}


export const reviewActions = {
    createReview,
    getReviewByCourse,
    updateReview,
    deleteReviewByCourse,
    clearReview,
    getReviewClip
}