import isEmpty from "../../components/defaultFunction/checkEmptyObject"
import { updateProfileErrorMessage } from "../../components/defaultValue/errorMessage/updateProfile"
import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { profileConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"

function checkErrorMessage(errorMessage) {
    let message = !isEmpty(errorMessage) && updateProfileErrorMessage[Object.values(errorMessage)[0].toString()]
    if (!message) {
        message = updateProfileErrorMessage["default"]
    }
    return message
}

function getProfile() {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me").then(res => {
            dispatch(loadingActions.stopLoading())
            const profileDetail = res.data.data
            dispatch(success(profileDetail))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
        })
    }
    function success(data) { return { type: profileConstants.GET_PROFILE_SUCCESS, payload: data } }
    function failure(err) { return { type: profileConstants.GET_PROFILE_FAILURE, payload: err } }
}

function updateProfileLearner(data, profileId) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post(`/me`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(getProfile(profileId))
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))

        }).catch((err) => {
            dispatch(loadingActions.stopLoading())
            const message = checkErrorMessage(err?.response?.data?.data)
            dispatch(failure(message))
            dispatch(modalAction.openModal({
                text: message,
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }

    function success() { return { type: profileConstants.UPDATE_PROFILE_SUCCESS } }
    function failure(err) { return { type: profileConstants.UPDATE_PROFILE_SUCCESS, payload: err } }
}

function getIdentifyTutor() {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me/identity").then((res) => {
            const data = res.data.data
            if (data) {
                dispatch(loadingActions.stopLoading())
                dispatch(success(data.verifiedData))
            }

        }).catch((err) => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
        })

    }
    function success(data) { return { type: profileConstants.GET_IDENTIFY_TUTOR_SUCCESS, payload: data } }
    function failure(err) { return { type: profileConstants.GET_IDENTIFY_TUTOR_FAILURE, payload: err } }
}


function updateIdentifyTutor(data) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/me/identity/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(getIdentifyTutor())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))

        }).catch((err) => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })

    }
    function success() { return { type: profileConstants.UPDATE_IDENTIFY_TUTOR_SUCCESS } }
    function failure(err) { return { type: profileConstants.UPDATE_IDENTIFY_TUTOR_FAILURE, payload: err } }
}


function createIdentifyTutor(data) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/me/identity", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(getIdentifyTutor())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
            }))

        }).catch((err) => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err?.response?.data))
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })

    }
    function success() { return { type: profileConstants.CREATE_IDENTIFY_TUTOR_SUCCESS } }
    function failure(err) { return { type: profileConstants.CREATE_IDENTIFY_TUTOR_FAILURE, payload: err } }
}

function setAddress(address) {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.post("/me/address", address)
            .then(() => {
                dispatch(modalAction.openModal({
                    text: "แก้ไขข้อมูลสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
                dispatch(success())
                dispatch(getAddress())
            })

            .catch(err => {
                dispatch(loadingActions.stopLoading())
                const message = checkErrorMessage(err?.response?.data?.data)
                dispatch(failure(message))
                dispatch(modalAction.openModal({
                    text: message,
                    size: sizeModal.small,
                    alert: typeModal.wrong
                }))
            })
    }
    function success() { return { type: profileConstants.SET_ADDRESS_SUCCESS } }
    function failure(err) { return { type: profileConstants.SET_ADDRESS_FAILURE, payload: err } }
}

function getAddress() {
    return dispatch => {
        dispatch(loadingActions.startLoading())
        apiURL.apiGetA.get("/me/address")
            .then(res => {
                dispatch(loadingActions.stopLoading())
                const data = res.data.data.filter(item => item.type === 1)[0]
                let address = {}
                if (data) {
                    address = {
                        "fullAddress": data.fullAddressText,
                        "address": data.address ? data.address : "",
                        "hintAddress": data.hintAddress ? data.hintAddress : null,
                        "road": data.road ? data.road : "",
                        "subDistrict": data.subDistrict.id ? data.subDistrict.id : "",
                        "district": data.district.id ? data.district.id : "",
                        "province": data.province.id ? data.province.id : "",
                        "postcode": data.postcode ? data.postcode : "",
                        "lat": data.geoLocation ? data.geoLocation.latitude : "",
                        "lon": data.geoLocation ? data.geoLocation.longitude : "",
                        "geoSubDistrict": data.subDistrict.title ? data.subDistrict.title : "",
                        "geoDistrict": data.district.title ? data.district.title : "",
                        "geoProvince": data.province.title ? data.province.title : "",
                        "type": data.type
                    }
                }
                dispatch(success(address))
            })
            .catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err?.response?.data))
            })
    }
    function success(data) { return { type: profileConstants.GET_ADDRESS_SUCCESS, payload: data } }
    function failure(err) { return { type: profileConstants.GET_ADDRESS_FAILURE, payload: err } }
}


export const profileAction = {
    getProfile,
    updateProfileLearner,
    setAddress,
    getAddress,
    getIdentifyTutor,
    createIdentifyTutor,
    updateIdentifyTutor
}