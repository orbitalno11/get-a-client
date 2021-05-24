import { modalConstants } from "../constants";

const initialState = {
    status : false,
    body : null,
    text : null,
    header : null,
    size : null,
    alert:null,
    afterClose : null
}

const modalReducers = (state = initialState, action) => {
    switch (action.type) {
    case modalConstants.OPEN_MODAL:
        return { 
            status : true,
            body : action.payload.body,
            text : action.payload.text,
            header : action.payload.header,
            size : action.payload.size,
            alert : action.payload.alert,
            afterClose : action.payload.afterClose
        };
    case modalConstants.CLOSE_MODAL:
        return {
            status : false,
            body :  null, 
            text : null,
            header : null,
            size : null,
            alert :null,
            afterClose :null
        }
    default:
        return state
    }
}

export default modalReducers;
