import { authConstants } from "../constants"
import { modalAction } from "./modal.actions"
import auth from "../../config/firebase"
import { setAuthToken, apiURL } from "../../utils/setAxios"
import { sizeModal } from "../../components/modal/SizeModal"
import jwtDecode from "jwt-decode"
import { typeModal } from "../../components/modal/TypeModal"
import { authErrorMessage } from "../../components/defaultValue"
import { loadingActions } from "./loading.actions"
import { trackTutorLogin } from "../../analytic/Analytic"
import isEmpty from "../../components/defaultFunction/checkEmptyObject"

function checkErrorMessage(errorMessage) {
    const messageEmail = !isEmpty(errorMessage?.message) && authErrorMessage[errorMessage?.message]
    if (!messageEmail) {
        let message = !isEmpty(errorMessage?.data) && authErrorMessage[Object.values(errorMessage?.data)[0].toString()]
        if (!message) {
            message = authErrorMessage["default"]
        }
        return message
    }
    return messageEmail
}

function loginUser(loginData, path) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        auth.signInWithEmailAndPassword(loginData.email, loginData.password).then(user => {
            if (user) {
                auth.currentUser.getIdToken().then(token => {
                    apiURL.apiGetA.get("/auth/token", {
                        params: {
                            token: token
                        }
                    }).then(res => {
                        const getAToken = res.data.data
                        const user = jwtDecode(getAToken);
                        localStorage.setItem('token', getAToken);
                        setAuthToken(getAToken)
                        dispatch(success(user))
                        dispatch(loadingActions.stopLoading())
                        if (user.role === 2) {
                            trackTutorLogin().then(() => {
                                window.location.href = "/tutor"
                            }).catch(() => {
                                window.location.href = "/tutor"
                            })
                        } else if (user.role === 1) {
                            if (path) {
                                window.location.href = decodeURIComponent(path)
                            } else {
                                window.location.href = "/"
                            }
                        } else if (user.role === 0) {
                            window.location.href = "/admin"
                        }
                    })
                })
            }

        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "ข้อมูลผู้ใช้งานไม่ถูกต้อง",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }

    function success(user) { return { type: authConstants.LOGIN_SUCCESS, payload: user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, payload: error } }
}

function signUpLearner(signUpData) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/learner/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "สร้างบัญชีผู้ใช้สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/login"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data)
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success(user) { return { type: authConstants.SIGN_UP_SUCCESS, payload: user } }
    function failure(error) { return { type: authConstants.SIGN_UP_FAILURE, payload: error } }
}

function signUpTutor(signUpData) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/tutor/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "สร้างบัญชีผู้ใช้สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/login"
            }))
        }).catch(err => {
            const message = checkErrorMessage(err?.response?.data)
            dispatch(loadingActions.stopLoading())
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
    function success(user) { return { type: authConstants.SIGN_UP_SUCCESS, payload: user } }
    function failure(error) { return { type: authConstants.SIGN_UP_FAILURE, payload: error } }
}

function setUser(token) {
    return {
        type: authConstants.LOGIN_SUCCESS,
        payload: token
    }
}

function logout() {
    localStorage.removeItem("token")
    return {
        type: authConstants.LOGOUT,
    }
}


export const userActions = {
    signUpLearner,
    signUpTutor,
    loginUser,
    setUser,
    logout
};