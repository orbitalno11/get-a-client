import { favoriteConstants } from "../constants"

const initialState = {
    favorite :  null,
    favoritelist : null,
    check:null,
    error: null
}

const favoriteReducer = (state = initialState , action)=>{
    switch(action.type){
        case favoriteConstants.GET_FAVORITE_LIST_SUCCESS:{
            return {
                ...state,
                favoritelist : action.payload,
                error : false
            }

        }
        case favoriteConstants.GET_FAVORITE_LIST_FAILURE:{
            return {
                ...state,
                favoritelist : null,
                error : true
            }

        }
        case favoriteConstants.LIKE_TUTOR_SUCCESS:{
            return {
                ...state,
                check : action.payload,
                error : false
            }

        }
        case favoriteConstants.LIKE_TUTOR_FAILURE:{
            return {
                ...state,
                favorite : null,
                error : true
               
            }

        }        
        case favoriteConstants.CLEAR_LIST_FAVORITE:{
            return {
                ...state,
                favorite :  null,
                favoritelist : null,
                error: null            
            }

        }
        case favoriteConstants.GET_CHECK_FAVORITE_SUCCESS:{
            return {
                ...state,
                favorite : action.payload,
                error : false
            }

        }        
        case favoriteConstants.GET_CHECK_FAVORITE_FAILURE:{
            return {
                ...state,
                favorite : null,
                error : true          
            }

        }
        default: return state    
    }
} 

export default favoriteReducer;
