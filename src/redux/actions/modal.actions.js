import { modalConstants } from "../constants"

function openModal(body) {
    return {
        type: modalConstants.OPEN_MODAL,
        payload : body
    }
}

function closeModal() {
    return {
        type: modalConstants.CLOSE_MODAL,
    }
}

export const modalAction = {
    openModal,
    closeModal
}
