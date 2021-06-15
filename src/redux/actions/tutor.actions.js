import isEmpty from "../../components/defaultFunction/checkEmptyObject"
import { verifyErrorMessage } from "../../components/defaultValue/errorMessage/verify"
import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { tutorConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"

function checkErrorMessage(errorMessage,type) {
    let message =  !isEmpty(errorMessage) && verifyErrorMessage[Object.values(errorMessage)[0].toString()]
    if (!message) {
        if(type === "edit"){
            message = verifyErrorMessage["default_edit"]
        }else{
            message = verifyErrorMessage["default_create"]
        }
    }
    return message
}

function getTestings(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/${id}/testings`).then((res) => {
            const data = res.data.data
            dispatch(success(data))
            dispatch(loadingActions.stopLoading())
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: tutorConstants.GET_LIST_TESTING_SUCCESS, payload: data } }
    function failure(err) { return { type: tutorConstants.GET_LIST_TESTING_FAILURE, payload: err } }
}

function getEducations(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/${id}/educations`).then((res) => {
            const data = res.data.data
            dispatch(success(data))
            dispatch(loadingActions.stopLoading())
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: tutorConstants.GET_LIST_EDUCATION_SUCCESS, payload: data } }
    function failure(err) { return { type: tutorConstants.GET_LIST_EDUCATION_FAILURE, payload: err } }
}

function getTesting(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/testing/${id}`).then((res) => {
            const data = res.data.data
            let dataTesting = {}
            if (data) {
                dataTesting = {
                    exam: data.exam.exam.id,
                    subject: data.exam.subject.id,
                    score: data.exam.score,
                    year: Number(data.exam.year),
                    image: [
                        data.verifiedData.documentUrl1,
                        data.verifiedData.documentUrl2,
                        data.verifiedData.documentUrl3
                    ]
                }
            }
            dispatch(success({
                success: true,
                data: dataTesting
            }))
            dispatch(loadingActions.stopLoading())
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: tutorConstants.GET_TESTING_SUCCESS, payload: data } }
    function failure(err) { return { type: tutorConstants.GET_TESTING_FAILURE, payload: err } }
}

function getEducation(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/education/${id}`).then((res) => {
            const data = res.data.data
            let dataEducation = {}
            if (data) {
                dataEducation = {
                    grade: data.educationData.grade.grade,
                    branch: data.educationData.branch.id,
                    institute: data.educationData.institute.id,
                    gpax: data.educationData.gpax,
                    status: data.educationData.status,
                    image: [
                        data.verifiedData.documentUrl1,
                        data.verifiedData.documentUrl2,
                        data.verifiedData.documentUrl3
                    ]
                }
            }
            dispatch(success({
                success: true,
                data: dataEducation
            }))
            dispatch(loadingActions.stopLoading())
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success(data) { return { type: tutorConstants.GET_EDUCATION_SUCCESS, payload: data } }
    function failure(err) { return { type: tutorConstants.GET_EDUCATION_FAILURE, payload: err } }
}

function createTesting(data) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/tutor/testing/verify", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "เพ่ิมข้อมูลการสอบสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/me"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data?.data,"create")
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success() { return { type: tutorConstants.CREATE_TESTING_SUCCESS } }
    function failure(err) { return { type: tutorConstants.CREATE_TESTING_FAILURE, payload: err } }
}

function createEducation(data) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/tutor/education/verify", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "เพิ่มข้อมูลการศึกษาสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/me"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data?.data,"create")
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success() { return { type: tutorConstants.CREATE_EDUCATION_SUCCESS } }
    function failure(err) { return { type: tutorConstants.CREATE_EDUCATION_FAILURE, payload: err } }
}

function updateTesting(data, id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.put(`/tutor/testing/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลการสอบสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/me"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data?.data,"edit")
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success() { return { type: tutorConstants.UPDATE_TESTING_SUCCESS } }
    function failure(err) { return { type: tutorConstants.UPDATE_TESTING_FAILURE, payload: err } }
}

function updateEducation(data, id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.put(`/tutor/education/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(modalAction.openModal({
                text: "เพิ่มข้อมูลการศึกษาสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/me"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data?.data,"edit")
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success() { return { type: tutorConstants.UPDATE_EDUCATION_SUCCESS } }
    function failure(err) { return { type: tutorConstants.UPDATE_EDUCATION_FAILURE, payload: err } }
}


function deleteTesting(id, auth) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.delete(`/tutor/testing/${id}`).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(getTestings(auth))
            dispatch(modalAction.openModal({
                text: "ลบข้อมูลการสอบสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "ลบข้อมูลการสอบไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success() { return { type: tutorConstants.DELETE_TESTING_SUCCESS } }
    function failure(err) { return { type: tutorConstants.DELETE_TESTING_FAILURE, payload: err } }
}

function deleteEducation(id, auth) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.delete(`/tutor/education/${id}`).then(() => {
            dispatch(success())
            dispatch(loadingActions.stopLoading())
            dispatch(getEducations(auth))
            dispatch(modalAction.openModal({
                text: "ลบข้อมูลการศึกษาสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))
        }).catch(err => {
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "ลบข้อมูลการศึกษาไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
            dispatch(loadingActions.stopLoading())
        })
    }
    function success() { return { type: tutorConstants.DELETE_EDUCATION_SUCCESS } }
    function failure(err) { return { type: tutorConstants.DELETE_EDUCATION_FAILURE, payload: err } }
}



function getListOfflineCourse(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/${id}/offline-course`)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            })
            .catch(err => {
                dispatch(failure(err?.response?.data))
                dispatch(loadingActions.stopLoading())
            })
    }

    function success(course) { return { type: tutorConstants.GET_LIST_OFFLINE_COURSE_SUCCESS, payload: course } }
    function failure(err) { return { type: tutorConstants.GET_LIST_OFFLINE_COURSE_FAILURE, payload: err } }
}

function getListOnlineCourse(id) {
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
            .catch(err => {
                dispatch(failure(err?.response?.data))
                dispatch(loadingActions.stopLoading())
            })
    }

    function success(course) { return { type: tutorConstants.GET_LIST_ONLINE_COURSE_SUCCESS, payload: course } }
    function failure(err) { return { type: tutorConstants.GET_LIST_ONLINE_COURSE_FAILURE, payload: err } }
}

function getProfileTutor(id) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get(`/tutor/${id}`)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data
                    dispatch(success(data))
                    dispatch(loadingActions.stopLoading())
                }
            }).catch(err => {
                dispatch(failure(err?.response?.data))
                dispatch(loadingActions.stopLoading())
            })
    }

    function success(data) { return { type: tutorConstants.GET_TUTOR_PROFILE_SUCCESS, payload: data } }
    function failure(err) { return { type: tutorConstants.GET_TUTOR_PROFILE_FAILURE, payload: err } }
}

function clearListOfflineCourse() {
    return dispatch => { dispatch({ type: tutorConstants.CLEAR_LIST_OFFLINE_COURSE }) }
}

export const tutorAction = {
    getTestings,
    getEducations,
    getTesting,
    updateTesting,
    updateEducation,
    getEducation,
    createEducation,
    createTesting,
    deleteTesting,
    deleteEducation,
    getListOfflineCourse,
    clearListOfflineCourse,
    getProfileTutor,
    getListOnlineCourse
}