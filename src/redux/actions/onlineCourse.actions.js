import { sizeModal } from "../../components/modal/SizeModal"
import { typeModal } from "../../components/modal/TypeModal"
import { apiURL } from "../../utils/setAxios"
import { onlineCourseConstants } from "../constants"
import { loadingActions } from "./loading.actions"
import { modalAction } from "./modal.actions"

function createOnlineCourse(data){
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiURL.apiGetA.post("/online-course/create",data,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(() => {
            dispatch(loadingActions.stopLoading())
            dispatch(success())
            dispatch(modalAction.openModal({
                text: "สร้างคอร์สเรียนสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent,
                afterClose: "/tutor/online"
            }))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data))
            dispatch(modalAction.openModal({
                text: "สร้างคอร์สเรียนไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong,
            }))
        })
    }

    function success() { return { type: onlineCourseConstants.CREATE_ONLINE_COURSE_SUCCESS } }
    function failure(err) { return { type: onlineCourseConstants.CREATE_ONLINE_COURSE_FAILURE, payload: err } }
}

export const onlineCourseActions = {
    createOnlineCourse
}