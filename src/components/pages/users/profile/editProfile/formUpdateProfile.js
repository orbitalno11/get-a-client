import { defaultValue } from "../../../../defaultValue"

export const formUpdateProfile=(type, data)=>{
    let formData = new FormData()
    const formatted_date = ( data.dateOfBirth.getMonth() + "/" + data.dateOfBirth.getDate() + "/" + data.dateOfBirth.getFullYear())
    formData.append("firstname", data.firstname)
    formData.append("lastname", data.lastname)
    formData.append("gender", defaultValue.gender[data.gender])
    formData.append("dateOfBirth",formatted_date)
    formData.append("email", data.email)
    formData.append("username", data.email)
    formData.append("phoneNumber", data.phoneNumber)
    if(data.image.length !== 0){
        formData.append("image", data.image[0])
    }
    if(data.facebook){
        formData.append("facebookUrl", data.facebook)
    }
    if(data.lineId){
        formData.append("lineId", data.line)
    }



    if (type === "learner") {
        formData.append("grade",data.grade)
    } else if (type === "tutor") {
        const length = data.subject.length
        for (let i = 0; i < length; i++) {
            formData.append(`subject${i + 1}`,defaultValue.subject[data.subject[i]])
        }
    }
    return formData
}