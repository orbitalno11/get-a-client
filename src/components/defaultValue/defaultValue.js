const gender = {
    "ชาย":0,
    "หญิง":1,
    "ทางเลือก":2
}

const grade = {
    "ปฐมวัย": 0,
    "ประถมศึกษาปีที่ 1": 1,
    "ประถมศึกษาปีที่ 2": 2,
    "ประถมศึกษาปีที่ 3": 3,
    "ประถมศึกษาปีที่ 4": 4,
    "ประถมศึกษาปีที่ 5": 5,
    "ประถมศึกษาปีที่ 6": 6,
    "มัธยมศึกษาปีที่ 1": 7,
    "มัธยมศึกษาปีที่ 2": 8,
    "มัธยมศึกษาปีที่ 3": 9,
    "มัธยมศึกษาปีที่ 4": 10,
    "มัธยมศึกษาปีที่ 5": 11,
    "มัธยมศึกษาปีที่ 6": 12,
    "ปริญญาตรี": 13,
    "ปริญญาโท": 14,
    "ปริญญาเอก": 15
}

const shortGrade = {
    "ปฐมวัย": 0,
    "ป.1": 1,
    "ป.2": 2,
    "ป.3": 3,
    "ป.4": 4,
    "ป.5": 5,
    "ป.6": 6,
    "ม.1": 7,
    "ม.2": 8,
    "ม.3": 9,
    "ม.4": 10,
    "ม.5": 11,
    "ม.6": 12,
    "ปริญญาตรี": 13,
    "ปริญญาโท": 14,
    "ปริญญาเอก": 15
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
    "วันอาทิตย์": 1,
    "วันจันทร์": 2,
    "วันอังคาร": 3,
    "วันพุธ": 4,
    "วันพฤหัสบดี": 5,
    "วันศุกร์": 6,
    "วันเสาร์": 7
}

const type = {
    "กลุ่ม": 2,
    "เดี่ยว": 1,
}

const examType = {
    "O-NET": 1,
    "GAT": 2,
    "PAT": 3,
    "PISA" : 4,
    "A-NET" : 5,
    "Admission" : 6,
    "สอวน." : 7
}

const educationStatus = {
    "สำเร็จการศึกษา": "graduated",
    "กำลังศึกษา": "studying"
}

const typeIdentity = {
    "education": 0,
    "testing": 1
}

const requestStatus = {
    "ผ่านการตรวจสอบ": 1,
    "กำลังตรวจสอบ": 0,
    "ไม่ผ่านการตรวจสอบ": -1
}

const typeAcion = {
    "create": "create",
    "edit": "edit"
}

const enrollStatus = {
    "WAITING_FOR_APPROVE": "0",
    "APPROVE": "approve",
    "DENIED": "denied"
}

const dateFormat = "YYYY-MM-DD"
const timeFormat = "HH:mm";

const constantLocation = {
    defaultLat: 13.6500138,
    defaultLng: 100.4943362,
    defaultAddress: "126 ถ. ประชาอุทิศ",
    defaultDetailAddress: "แขวง บางมด เขตทุ่งครุ กรุงเทพมหานคร 10140"
}

const typeCourse = {
    "ออนไลน์": 3,
    "นัดเจอ": 1,
}

const bank = {
    "ไทยพาณิชย์": "SCB",
    "กรุงไทย": "KTB",
    "กสิกรไทย": "KBANK",
    "กรุงเทพ": "BBL"
}

const redeemType = {
    0: "อยู่ระหว่างการพิจารณา",
    1: "อนุมัติ",
    2: "โอนเงิน",
    3: "ปฏิเสธ",
    4: "ยกเลิก"
}

const transactionType = {
    0: "เติมเหรียญ",
    1: "ถอนเงิน",
    2: "แลกเหรียญ",
    3: "ซื้อเหรียญ",
    4: "รายได้จากคลิปออนไลน์",
    5: "คืนเหรียญ"
}

const userRole = {
    "admin" : 0,
    "learner" : 1,
    "tutor" : 2
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
    typeCourse,
    bank,
    transactionType,
    redeemType,
    shortGrade
}