import { reviewConstants } from "../constants"

const initialState = {
    reviews: null,
    error: null
}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case reviewConstants.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                error: null
            }
        case reviewConstants.CREATE_REVIEW__FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case reviewConstants.GET_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: {
                    data : action.payload,
                    success : true
                },
                error: null
            }
        case reviewConstants.GET_REVIEW__FAILURE:
            return {
                ...state,
                reviews: {
                    data : null,
                    success : true
                },
                error: action.payload
            }
        case reviewConstants.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                error: null
            }
        case reviewConstants.UPDATE_REVIEW__FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case reviewConstants.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                error: null
            }
        case reviewConstants.DELETE_REVIEW_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case reviewConstants.CLEAR_REVIEW : 
            return {
                ...state,
                reviews: null,
                error: null
            }
        default: {
            return state
        }
    }
}

export default reviewReducer;