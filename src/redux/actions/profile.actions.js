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

export const setProfile = (payload) =>({
    type: profileConstants.GET_PROFILE,
    payload: payload,
})

export const setHandleProfile = (payload) =>({
    type: profileConstants.GET_HANDLE_PROFILE,
    payload: payload,
})

export const setEducation = (payload) =>({
    type: profileConstants.GET_EDUCATION,
    payload: payload,
})

export const addEducation = (payload) =>({
    type: profileConstants.ADD_EDUCATION,
    payload: payload,
})

export const removeEducation = (payload) =>({
    type: profileConstants.DELETE_EDUCATION,
    payload: payload,
})

export const getProfile = () => async (dispatch) => {
    try {
        dispatch(setProfile(data))
    } catch (error) {

    }
}

export const getHandleProfile = () => async (dispatch) => {
    try {
        dispatch(setHandleProfile(data))
    } catch (error) {

    }
}

export const editProfileDetail = (profile) => async (dispatch) =>{
    try {
        dispatch(setProfile(data))
    } catch (error) {

    }
}

export const addHistory = (data) => async(dispatch) =>{
    try{
        dispatch(addEducation(data))
    }catch (error){

    }
}

export const removeHistory = (data) => async(dispatch) =>{
    try{
        dispatch(removeEducation(data))
    }catch (error){

    }
}