import { loadingConstants } from "../constants"

function startLoading() { 
    return { type: loadingConstants.START_LOADING }
}
function stopLoading() { 
    return { type: loadingConstants.STOP_LOADING }
}

export const loadingActions = {
    startLoading,
    stopLoading
}