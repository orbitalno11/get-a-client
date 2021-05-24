import {apiURL} from "../utils/setAxios"

export function launchAnalytic(fx) {
    Promise.resolve(fx()).catch()
}

export function trackTutorLogin() {
    launchAnalytic(async () => {
        await apiURL.apiGetA.get("/analytic/login")
    })
}

export function trackImpressTutorProfile(userId) {
    launchAnalytic(async () => {
        await apiURL.apiGetA.get("/analytic/tutor", {
            params: {
                userId: userId
            }
        })
    })
}

export function trackImpressCourseDetail(courseId, type) {
    launchAnalytic(async () => {
        await apiURL.apiGetA.get("/analytic/course", {
            params: {
                courseId: courseId,
                type: type
            }
        })
    })
}