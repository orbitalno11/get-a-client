import { apiURL } from "../../utils/setAxios"
import { favoriteConstants } from "../constants"
import { loadingActions } from "./loading.actions"

function getFavoriteList(){ 
        return  (dispatch) => {
            dispatch(loadingActions.startLoading())
            apiURL.apiGetA.get("/favorite/list").then(res => {
                dispatch(loadingActions.stopLoading())
                const favorite = res.data.data
                dispatch(success(favorite))
            }).catch(err => {
                dispatch(loadingActions.stopLoading())
                dispatch(failure(err.response))
            })
        }
        function success(data) { return { type: favoriteConstants.GET_FAVORITE_LIST_SUCCESS, payload: data } }
        function failure(err) { return { type: favoriteConstants.GET_FAVORITE_LIST_FAILURE, payload: err } }
        
}

function likeTutor(tutorId, status){ 
    return  (dispatch)=> {
        dispatch(loadingActions.startLoading())
         apiURL.apiGetA.get("/favorite", {
            params: {
                tutor : tutorId
            }
        })
        .then(() => {
            const data = !status
            dispatch(success(data))    
            dispatch(loadingActions.stopLoading())              
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response))
        })
    }
    function success(data) { return { type: favoriteConstants.LIKE_TUTOR_SUCCESS, payload: data } }
    function failure(err) { return { type: favoriteConstants.LIKE_TUTOR_FAILURE, payload: err } }
    
    
}

function checkFavoriteTutor(tutorId){ 
    return  (dispatch) => {
        dispatch(loadingActions.startLoading())
         apiURL.apiGetA.get("/favorite/liked", {
            params: {
                tutor : tutorId
            }
        })
        .then((res) => {
            dispatch(loadingActions.stopLoading())
            const favorite = res.data.data
            dispatch(success(favorite))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response))
        })
    }
    function success(data) { return { type: favoriteConstants.GET_CHECK_FAVORITE_SUCCESS, payload: data } }
    function failure(err) { return { type: favoriteConstants.GET_CHECK_FAVORITE_FAILURE, payload: err } }
    
    
}

function checkFavoriteTutor(tutorId){ 
    return  dispatch => {
        dispatch(loadingActions.startLoading())
         apiURL.apiGetA.get("/favorite/liked", {
            params: {
                tutor : tutorId
            }
        })
        .then((res) => {
            dispatch(loadingActions.stopLoading())
            const favorite = res.data.data
            dispatch(success(favorite))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
        })
    }
    function success(data) { return { type: favoriteConstants.GET_CHECK_FAVORITE_SUCCESS, payload: data } }
    function failure(err) { return { type: favoriteConstants.GET_CHECK_FAVORITE_FAILURE, payload: err } }
    
}

function clearListFavorite() {
    return (dispatch) => { dispatch({ type: favoriteConstants.CLEAR_LIST_FAVORITE }) }
}

export const favoriteAction = {
    getFavoriteList,
    likeTutor,
    checkFavoriteTutor,
    clearListFavorite
}