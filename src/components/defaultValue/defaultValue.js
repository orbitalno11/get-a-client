const gender = {
    "ชาย":0,
    "หญิง":1,
    "ทางเลือก":2
}

const grade = {
    "ม.1":7,
    "ม.2":8,
    "ม.3":9,
    "ม.4":10,
    "ม.5":11,
    "ม.6":12
}

const subject = {
    "คณิตศาสตร์":"MTH",
    "ภาษาไทย":"THA",
    "วิทยาศาสตร์":"SCI",
    "ฟิสิกส์":"PHY",
    "เคมี":"CHM",
    "ชีววิทยา":"BIO",
    "สังคมศึกษา":"SOC",
    "ภาษาอังกฤษ":"ENG"
}

const dateOfWeek = {
    "วันอาทิตย์":1,
    "วันจันทร์":2,
    "วันอังคาร":3,
    "วันพุธ":4,
    "วันพฤหัสบดี":5,
    "วันศุกร์":6,
    "วันเสาร์":7
}

const type = {
    "กลุ่ม":2,
    "เดี่ยว":1,
}

const examType = {
    "O-NET":1,
    "GAT":2,
    "PAT":3
}

const educationStatus = {
    "จบแล้ว" : "graduated",
    "กำลังศึกษา" : "studying"
}

const typeIdentity = {
    "education" : 0,
    "testing" : 1
}

const requestStatus = {
    "ผ่านการตรวจสอบ" : 1,
    "กำลังตรวจสอบ" : 0,
    "ไม่ผ่านการตรวจสอบ" : -1
}

const typeAcion = {
    "create":"create",
    "edit":"edit"
}

const enrollStatus = {
    "WAITING_FOR_APPROVE":"0",
    "APPROVE":"approve",
    "DENIED":"denied"
}

const dateFormat = "YYYY-MM-DD"
const timeFormat = "HH:mm";

const constantLocation = {
    defaultLat : 13.6500138,
    defaultLng : 100.4943362,
    defaultAddress : "126 ถ. ประชาอุทิศ",
    defaultDetailAddress : "แขวง บางมด เขตทุ่งครุ กรุงเทพมหานคร 10140"
}

const userRole = {
    "admin" : 0,
    "learner" : 1,
    "tutor" : 2
}

const typeCourse = {
    "ออนไลน์" : 0,
    "นัดเจอ" : 1,
    "ไม่ระบุ" : 2
}

export const defaultValue = {
    gender,
    grade,
    subject,
    dateOfWeek,
    type,
    dateFormat,
    constantLocation,
    examType,
    educationStatus,
    typeIdentity,
    requestStatus,
    typeAcion,
    timeFormat,
    enrollStatus,
    userRole,
    typeCourse
}