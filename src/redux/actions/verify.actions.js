import { apiURL } from "../../utils/setAxios"
import { verifyConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"
import { typeModal } from "../../components/modal/TypeModal"
import { sizeModal } from "../../components/modal/SizeModal"

function getIdentityVerifyList(){ 
        return async dispatch => {
            dispatch(loadingActions.startLoading())
            await apiURL.apiGetA.get("/verify/identities").then(res => {
                dispatch(loadingActions.stopLoading())
                const verify = res.data.data
                dispatch(success(verify))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err.response.data))
            })
        }
        function success(data) { return { type: verifyConstants.GET_IDENTITY_LIST_SUCCESS, payload: data } }
        function failure(err) { return { type: verifyConstants.GET_IDENTITY_LIST_FAILURE, payload: err } }
        
}

function geteEducationVerifyList(){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/verify/educations").then(res => {
            dispatch(loadingActions.stopLoading())
            const verify = res.data.data
            dispatch(success(verify))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: verifyConstants.GET_EDUCATION_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: verifyConstants.GET_EDUCATION_LIST_FAILURE, payload: err } }
    
}

function geteTestVerifyList(){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/verify/testings").then(res => {
            dispatch(loadingActions.stopLoading())
            const verify = res.data.data
            dispatch(success(verify))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: verifyConstants.GET_TEST_LIST_SUCCESS, payload: data } }
    function failure(err) { return { type: verifyConstants.GET_TEST_LIST_FAILURE, payload: err } }
    
}

function geteProfileDetail(id){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/verify/identity/${id}`)
        .then(res => {
            dispatch(loadingActions.stopLoading())
            const verify = res.data.data
            dispatch(success(verify))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: verifyConstants.GET_PROFILE_DETAIL_SUCCESS, payload: data } }
    function failure(err) { return { type: verifyConstants.GET_PROFILE_DETAIL_FAILURE, payload: err } }
    
}

function geteEducationDetail(id){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/verify/education/${id}`)
        .then(res => {
            dispatch(loadingActions.stopLoading())
            const verify = res.data.data
            dispatch(success(verify))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data.message.message))
        })
    }
    function success(data) { return { type: verifyConstants.GET_EDUCATION_DETAIL_SUCCESS, payload: data } }
    function failure(err) { return { type: verifyConstants.GET_EDUCATION_DETAIL_FAILURE, payload: err } }
    
}

function geteTestingDetail(id){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get(`/verify/testing/${id}`)
        .then(res => {
            dispatch(loadingActions.stopLoading())
            const verify = res.data.data
            dispatch(success(verify))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: verifyConstants.GET_TESTING_DETAIL_SUCCESS, payload: data } }
    function failure(err) { return { type: verifyConstants.GET_TESTING_DETAIL_FAILURE, payload: err } }
    
}

function geteManageIdentity(requestId,approved){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/verify/identity", {
            params: {
                id : requestId,
                approved :  approved
            }
        })
        .then(() => {
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/admin/verify/profile",
            }))
                  
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function failure(err) { return { type: verifyConstants.GET_MANAGE_IDENTITY_FAILURE, payload: err } }
    
}

function geteManageEducation(requestId,approved){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/verify/education", {
            params: {
                id : requestId,
                approved :  approved
            }
        })
        .then(() => {
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/admin/verify/education",
            }))
                  
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function failure(err) { return { type: verifyConstants.GET_MANAGE_EDUCATION_FAILURE, payload: err } }
    
}

function geteManageTesting(requestId,approved){ 
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.get("/verify/testing", {
            params: {
                id : requestId,
                approved :  approved
            }
        })
        .then(() => {
            dispatch(modalAction.openModal({
                text: "ดำเนินการสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/admin/verify/test",
            }))
                  
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function failure(err) { return { type: verifyConstants.GET_MANAGE_TEST_FAILURE, payload: err } }
    
}

function clearListVerify() {
    return dispatch => { dispatch({ type: verifyConstants.CLEAR_LIST_VERIFY }) }
}

export const verifyAction = {
    getIdentityVerifyList,
    geteEducationVerifyList,
    geteTestVerifyList,
    geteProfileDetail,
    geteEducationDetail,
    geteTestingDetail,
    geteManageIdentity,
    geteManageEducation,
    geteManageTesting,
    clearListVerify
}