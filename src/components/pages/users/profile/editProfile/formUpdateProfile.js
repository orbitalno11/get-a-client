import { defaultValue } from "../../../../defaultValue"

export const formUpdateProfile = (type, data) => {
    let formData = new FormData()
    const formatted_date = data.dateOfBirth
    formData.append("firstname", data.firstname)
    formData.append("lastname", data.lastname)
    formData.append("gender", defaultValue.gender[data.gender])
    formData.append("dateOfBirth", formatted_date)
    formData.append("email", data.email)
    formData.append("username", data.email)
    formData.append("phoneNumber", data.phoneNumber)
    if (data.image.length !== 0) {
        formData.append("image", data.image[0])
    }
    if (data.facebook) {
        formData.append("facebookUrl", data.facebook)
    }
    if (data.lineId) {
        formData.append("lineId", data.line)
    }

    if (type === "learner") {
        formData.append("grade", data.grade)

    } else if (type === "tutor") {
        data.subject.forEach((item, index) =>
            formData.append(`subject${index + 1}`, defaultValue.subject[item])
        )
        formData.append("introduction", data.introduce)
    }
    return formData
}