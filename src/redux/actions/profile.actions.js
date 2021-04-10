import { profileConstants } from "../constants"

const data =
{
    firstname: "พิคาชู",
    lastname : "หนูเทพซาโตชิ",
    sex : 1,
    coin: "1000",
    place: "บางมด, ทุ่งครุ",
    introduction : "แนะนำตัว",
    contact: {
        facebook: "Picacha",
        email : "Picacha.k@gmail.com",
        line : "Picacha",
        phone : "09123456"
    },
    grade : "10",
    course: {
        tutor:
            [
                {
                    name :  "หนูเทพซาโตชิ",
                    place : "บางมด, ทุ่งครุ",
                    subject : "ชีววิทยา" ,
                    date : "1 มกราคม 2563"
                },
                {
                    name :  "พิคาชู หนูเทพซาโตชิ",
                    place : "บางมด, ทุ่งครุ",
                    subject : "ชีววิทยา" ,
                    date : "1 มกราคม 2563"
                }
            ],
        course : []
    },
    history : [
        {
            type: "education",
            name: "โรงชื่อยาว",
            brance: " วิทยาศาสตร์ - คณิตศาสตร์",
            grade: "4.00",
            status: "2"
        },
        {
            type: "test",
            name: "ผลสอบ O-NET",
            brance: "คณิตศาสตร์",
            grade: "150",
            status: "0"
        },

    ]
}

function getProfile() {
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiGetA.get("/me").then(res => {
            dispatch(loadingActions.stopLoading())
            const profileDetail = res.data.data
            dispatch(success(profileDetail))
        }).catch(err => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data.message.message))
        })
    }
}

export const getHandleProfile = () => async (dispatch) => {
    try {
        dispatch(setHandleProfile(data))
    } catch (error) {
        // todo handle error
    }
}

function updateProfileLearner(data, profileId) {
    
    return async dispatch => {
        dispatch(loadingActions.startLoading())
        await apiGetA.post(`/me`,data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(() => {
            dispatch(success())
            dispatch(getProfile(profileId))
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลสำเร็จ",
                size: sizeModal.small,
                alert: typeModal.corrent
            }))

        }).catch((err) => {
            dispatch(loadingActions.stopLoading())
            dispatch(failure(err.response.data.message.message))
            dispatch(modalAction.openModal({
                text: "แก้ไขข้อมูลไม่สำเร็จ",
                size: sizeModal.small,
                alert: typeModal.wrong
            }))
        })
    }
}

export const addHistory = (data) => async(dispatch) =>{
    try{
        dispatch(addEducation(data))
    }catch (error){
        // todo handle error
    }
}

export const removeHistory = (data) => async(dispatch) =>{
    try{
        dispatch(removeEducation(data))
    }catch (error){
        // todo handle error
    }
}