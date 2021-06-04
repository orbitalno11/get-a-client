import { searchConstants } from "../constants"

const initialState = {
    offlineCourse: null,
    onlineCourse: null,
    nearby: null,
    meta: null,
    type: null,
    links: null,
    location: false,
    error: null
}
const searchReducer = (state = initialState, action) => {
    const data = action.payload
    switch (action.type) {
        case searchConstants.GET_SEARCH_SUCCESS:
            if (data.typeFocus) {
                return {
                    ...state,
                    [data.typeFocus]: data.resultSearch[data.typeFocus].item,
                    links: {...state.links, [data.typeFocus]: data?.resultSearch[data.typeFocus]?.links },
                    meta: {...state.meta, [data.typeFocus]: data.resultSearch[data.typeFocus]?.meta },
                }
            } else {
                return {
                    ...state,
                    onlineCourse: data.resultSearch?.onlineCourse?.item,
                    offlineCourse: data.resultSearch?.offlineCourse?.item,
                    nearby: data.resultSearch?.nearby?.item,
                    links: {
                        "onlineCourse": data.resultSearch?.onlineCourse?.links,
                        "offlineCourse": data.resultSearch?.offlineCourse?.links,
                        "nearby": data.resultSearch?.nearby?.links,
                    },
                    meta: {
                        "onlineCourse": data.resultSearch?.onlineCourse?.meta,
                        "offlineCourse": data.resultSearch?.offlineCourse?.meta,
                        "nearby": data.resultSearch?.nearby?.meta,
                    },
                    type: data.type,
                    location: data.location,
                    error: null
                }
            }

        case searchConstants.GET_SEARCH_FAILURE:
            return {
                ...state,
                offlineCourse: null,
                onlineCourse: null,
                nearby: null,
                meta: null,
                type: null,
                links: null,
                location: false,
                error: action.payload
            }
        case searchConstants.CLEAR_SEARCH:
            return {
                ...state,
                offlineCourse: null,
                onlineCourse: null,
                nearby: null,
                meta: null,
                type: null,
                links: null,
                location: false,
                error: null
            }
        default: {
            return state
        }
    }
}

export default searchReducer;