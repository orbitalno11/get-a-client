import { verifyConstants } from "../constants"

const initialState = {
    identity :  null,
    educate:null,
    test:null,
    identitydDetail:null,
    testDetail:null,
    educateDetail:null,
    manageIdentity:null,
    manageEducate:null,
    manageTest:null,
    error: null
}

const verifyReducer = (state = initialState , action)=>{
    switch(action.type){
        case verifyConstants.GET_IDENTITY_LIST_SUCCESS:{
            return {
                ...state,
                identity : action.payload,
                error : false
            }

        }
        case verifyConstants.GET_IDENTITY_LIST_FAILURE:{
            return {
                ...state,
                identity : null,
                error : true
            }

        }
        case verifyConstants.GET_EDUCATION_LIST_SUCCESS:{
            return {
                ...state,
                educate : action.payload,
                error : false
            }

        }
        case verifyConstants.GET_EDUCATION_LIST_FAILURE:{
            return {
                ...state,
                educate : null,
                error : true
               
            }

        }
        case verifyConstants.GET_TEST_LIST_SUCCESS:{
            return {
                ...state,
                test : action.payload,
                error : false
            }

        }
        case verifyConstants.GET_TEST_LIST_FAILURE:{
            return {
                ...state,
                test : null,
                error : true
               
            }

        }
        case verifyConstants.GET_PROFILE_DETAIL_SUCCESS:{
            return {
                ...state,
                identitydDetail : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_PROFILE_DETAIL_FAILURE:{
            return {
                ...state,
                identitydDetail : null,
                error : true
               
            }

        }
        case verifyConstants.GET_EDUCATION_DETAIL_SUCCESS:{
            return {
                ...state,
                educateDetail : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_EDUCATION_DETAIL_FAILURE:{
            return {
                ...state,
                educateDetail : null,
                error : true
               
            }

        }
        case verifyConstants.GET_TESTING_DETAIL_SUCCESS:{
            return {
                ...state,
                testDetail : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_TESTING_DETAIL_FAILURE:{
            return {
                ...state,
                testDetail : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_IDENTITY_SUCCESS:{
            return {
                ...state,
                manageIdentity : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_IDENTITY_FAILURE:{
            return {
                ...state,
                manageIdentity : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_EDUCATION_SUCCESS:{
            return {
                ...state,
                manageEducate : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_EDUCATION_FAILURE:{
            return {
                ...state,
                manageEducate : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_TEST_SUCCESS:{
            return {
                ...state,
                manageTest : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_TEST_FAILURE:{
            return {
                ...state,
                manageTest : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_IDENTITY_SUCCESS:{
            return {
                ...state,
                data : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_IDENTITY_FAILURE:{
            return {
                ...state,
                data : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_EDUCATION_SUCCESS:{
            return {
                ...state,
                data : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_EDUCATION_FAILURE:{
            return {
                ...state,
                data : null,
                error : true
               
            }

        }
        case verifyConstants.GET_MANAGE_TEST_SUCCESS:{
            return {
                ...state,
                data : action.payload,
                error : false
               
            }

        }
        case verifyConstants.GET_MANAGE_TEST_FAILURE:{
            return {
                ...state,
                data : null,
                error : true
               
            }

        }
        default: return state    
    }
} 

export default verifyReducer;
