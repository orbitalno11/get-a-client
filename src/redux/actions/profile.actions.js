import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { profileConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"

const data =
{
    firstname: "พิคาชู",
    lastname: "หนูเทพซาโตชิ",
    sex: 1,
    coin: "1000",
    place: "บางมด, ทุ่งครุ",
    introduction: "แนะนำตัว",
    contact: {
        facebook: "Picacha",
        email: "Picacha.k@gmail.com",
        line: "Picacha",
        phone: "09123456"
    },
    grade: "10",
    course: {
        tutor:
            [
                {
                    name: "หนูเทพซาโตชิ",
                    place: "บางมด, ทุ่งครุ",
                    subject: "ชีววิทยา",
                    date: "1 มกราคม 2563"
                },
                {
                    name: "พิคาชู หนูเทพซาโตชิ",
                    place: "บางมด, ทุ่งครุ",
                    subject: "ชีววิทยา",
                    date: "1 มกราคม 2563"
                }
            ],
        course: []
    },
    history: [
        {
            type: "education",
            name: "โรงชื่อยาว",
            brance: " วิทยาศาสตร์ - คณิตศาสตร์",
            grade: "4.00",
            status: "2"
        },
        {
            type: "test",
            name: "ผลสอบ O-NET",
            brance: "คณิตศาสตร์",
            grade: "150",
            status: "0"
        },

    ]
}

function getProfile() {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/me").then(res => {
            dispatch(loadingActions.stopLoading())
            const profileDetail = res.data.data
            dispatch(success(profileDetail))
        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
        })
    }
    function success(data) { return { type: profileConstants.GET_PROFILE_SUCCESS, payload: data } }
    function failure() { return { type: profileConstants.GET_PROFILE_FAILURE, payload: true } }
}

function getHandleProfile() {
    return async dispatch => {
        dispatch(success(data))
    }
    function success(data) { return { type: profileConstants.GET_HANDLE_PROFILE, payload: data } }
}

function updateProfileLearner(data, profileId) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post(`/me`,data, {
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

        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }

    function success() { return { type: profileConstants.UPDATE_PROFILE_SUCCESS } }
    function failure() { return { type: profileConstants.UPDATE_PROFILE_SUCCESS, payload: true } }
}

function getIdentifyTutor() {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/me/identity").then((res) => {
            const data = res.data.data
            if(data){
                dispatch(loadingActions.stopLoading())
                dispatch(success(data.verifiedData))
            }
           
        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
        })

    }
    function success(data) { return { type: profileConstants.GET_IDENTIFY_TUTOR_SUCCESS, payload : data} }
    function failure() { return { type: profileConstants.GET_IDENTIFY_TUTOR_FAILURE, payload: true } }
}


function updateIdentifyTutor(data) {
    return async dispatch => {
     
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/me/identity/update", data, {
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

        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })

    }
    function success() { return { type: profileConstants.UPDATE_IDENTIFY_TUTOR_SUCCESS} }
    function failure() { return { type: profileConstants.UPDATE_IDENTIFY_TUTOR_FAILURE, payload: true } }
}


function createIdentifyTutor(data) {
    return async dispatch => {
     
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/me/identity", data, {
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

        }).catch(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure())
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })

    }
    function success() { return { type: profileConstants.CREATE_IDENTIFY_TUTOR_SUCCESS} }
    function failure() { return { type: profileConstants.CREATE_IDENTIFY_TUTOR_FAILURE, payload: true } }
}

function setAddress(address) {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/me/address", address)
            .then(() => {
                dispatch(modalAction.openModal({
                    text: "แก้ไขข้อมูลสำเร็จ",
                    size: sizeModal.small,
                    alert: typeModal.corrent
                }))
                dispatch(success())
                dispatch(getAddress())
            })

            .catch(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure())
            })
    }
    function success() { return { type: profileConstants.SET_ADDRESS_SUCCESS } }
    function failure() { return { type: profileConstants.SET_ADDRESS_FAILURE, payload: true } }
}

function getAddress() {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/me/address")
            .then(res => {
                dispatch(loadingActions.stopLoading())
                const data = res.data.data.filter(item => item.type === 1)[0]
                let address = {}
                if(data){
                    address = {
                        "fullAddress" :data.fullAddressText,
                        "address": data.address ? data.address : "",
                        "hintAddress": data.hintAddress ? data.hintAddress : null,
                        "road": data.road ? data.road : "",
                        "subDistrict": data.subDistrict.id  ? data.subDistrict.id : "",
                        "district": data.district.id ? data.district.id : "",
                        "province": data.province.id ? data.province.id : "",
                        "postcode": data.postcode ? data.postcode : "",
                        "lat": data.geoLocation ? data.geoLocation.latitude : "",
                        "lon": data.geoLocation ? data.geoLocation.longitude : "",
                        "geoSubDistrict": data.subDistrict.title ? data.subDistrict.title : "",
                        "geoDistrict": data.district.title ? data.district.title : "",
                        "geoProvince": data.province.title ? data.province.title : "",
                        "type" : data.type
                    }
                }
                dispatch(success(address))
            })
            .catch(() => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure())
            })
    }
    function success(data) {  return { type: profileConstants.GET_ADDRESS_SUCCESS, payload: data } }
    function failure() { return { type: profileConstants.GET_ADDRESS_FAILURE, payload: true } }
}


export const profileAction = {
    getProfile,
    getHandleProfile,
    updateProfileLearner,
    setAddress,
    getAddress,
    getIdentifyTutor,
    createIdentifyTutor,
    updateIdentifyTutor
}