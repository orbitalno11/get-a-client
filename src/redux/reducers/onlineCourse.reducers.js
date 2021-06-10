import { onlineCourseConstants } from "../constants"

const initialState = {
    listOnlineTutor: null,
    listClip: null,
    newCourse : null,
    clip: null,
    data: null,
    error: null,
}


const onlineCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        // online course
        case onlineCourseConstants.CREATE_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.CREATE_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case onlineCourseConstants.UPDATEE_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.UPDATE_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case onlineCourseConstants.GET_ONLINE_COURSE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null
            }
        case onlineCourseConstants.GET_ONLINE_COURSE_FAILURE:
            return {
                ...state,
                data: null,
                error: action.payload
            }
        case onlineCourseConstants.GET_ONLINE_COURSE_NEW_SUCCESS:
            return {
                ...state,
                newCourse: action.payload,
                error: null
            }
        case onlineCourseConstants.GET_ONLINE_COURSE_NEW_FAILURE:
            return {
                ...state,
                newCourse: null,
                error: action.payload
            }
        case onlineCourseConstants.GET_LIST_ONLINE_COURSE_TUTOR_SUCCESS:
            return {
                ...state,
                listOnlineTutor: action.payload,
                error: null
            }
        case onlineCourseConstants.GET_LIST_ONLINE_COURSE_TUTOR_FAILURE:
            return {
                ...state,
                listOnlineTutor: null,
                error: action.payload
            }
        // clip-online-course 
        case onlineCourseConstants.CREATE_CLIP_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.CREATE_CLIP_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case onlineCourseConstants.UPDATE_CLIP_COURSE_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.UPDATE_CLIP_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case onlineCourseConstants.GET_LIST_CLIP_SUCCESS:
            return {
                ...state,
                listClip: action.payload,
                error: null
            }
        case onlineCourseConstants.GET_LIST_CLIP_FAILURE:
            return {
                ...state,
                listClip: null,
                error: action.payload
            }
        case onlineCourseConstants.GET_CLIP_SUCCESS:
            return {
                ...state,
                clip: action.payload,
                error: null
            }
        case onlineCourseConstants.GET_CLIP_FAILURE:
            return {
                ...state,
                clip: null,
                error: action.payload
            }
        case onlineCourseConstants.DELETE_CLIP_SUCCESS:
            return {
                ...state,
                error: null
            }
        case onlineCourseConstants.DELETE_CLIP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case onlineCourseConstants.BUY_CLIP_COURSE_SUCCESS:
            return {
                ...state,
                clip: { ...state.clip, bought: true },
                error: null
            }
        case onlineCourseConstants.BUY_CLIP_COURSE_FAILURE:
            return {
                ...state,
                clip: { ...state.clip, bought: false },
                error: action.payload
            }
        case onlineCourseConstants.CLEAR_LIST_ONLINE_COURSE:
            return {
                ...state,
                listOnlineTutor: null,
                listClip: null,
                newCourse : null,
                clip: null,
                data: null,
                error: null,
            }
        default: {
            return state
        }
    }
}

export default onlineCourseReducer;