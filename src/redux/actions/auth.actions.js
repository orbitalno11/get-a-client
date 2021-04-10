import axios from "axios"
import { authConstants } from "../constants"
import { modalAction } from "./modal.actions"
import auth from '../../config/firebase'
import setAuthToken from "../../utils/setAuthToken"
import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"

function startLoading() { return { type: authConstants.START_LOADING } }
function stopLoading() { return { type: authConstants.STOP_LOADING } }

function loginUser(loginData) {
    return async dispatch => {
        startLoading()
  
        auth.signInWithEmailAndPassword(loginData.email, loginData.password).then(user => {
            stopLoading()
            auth.currentUser.getIdToken().then(token => {
                localStorage.setItem('token', token);
                setAuthToken(token)
                dispatch(success(token))
            })
            // for student
            window.location.href = "/"
            // for tutor 
            // window.location.href = "/tutor/"
        }).catch(err => {
            dispatch(failure(err))
            console.log(err)
            dispatch(modalAction.openModal({
                text: "เข้าสู่ระบบไม่สำเร็จ",
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
        startLoading()
        await axios.post("/learner/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            stopLoading()
            dispatch(success(res.data.data))
            dispatch(modalAction.openModal({
                text: "create account already , please login",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose : "/login"
            }))
        }).catch(err => {
            dispatch(failure())
            dispatch(modalAction.openModal({
                text: err.response.data.message,
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
        startLoading()
        await axios.post("/tutor/create", signUpData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            stopLoading()
            dispatch(success(res.data.data))
            dispatch(modalAction.openModal({
                text: "create account already , please login",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose : "/login"
            }))
        }).catch(err => {
            dispatch(failure())
            console.log(err.response.data)
            dispatch(modalAction.openModal({
                text: err.response.data.message,
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

export const userActions = {
    signUpLearner,
    signUpTutor,
    loginUser,
    setUser
}; 