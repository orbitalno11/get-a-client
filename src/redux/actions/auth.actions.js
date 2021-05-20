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

function checkErrorMessage(errorMessage) {
    let message = authErrorMessage.authMessage[errorMessage]
    if (!message) {
        message = authErrorMessage.authMessage["default"]
    }
    return message
}

function loginUser(loginData) {
    return async dispatch => {
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
                            trackTutorLogin()
                            window.location.href = "/tutor"
                        } else if (user.role === 1) {
                            window.location.href = "/"
                        }
                    })
                })
            }

        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err))
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
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/learner/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(res.data.message)
            dispatch(success(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/login"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err.response.data.message.message)
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
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/tutor/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(res.data.message)
            dispatch(success(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/login"
            }))
        }).catch(err => {
            const message = checkErrorMessage(err.response.data.message.message)
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
