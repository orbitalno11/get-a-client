import moment from "moment";
import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";
import { imageConstants } from "../constants";

export const profileSchema = yup.object().shape({
    image: yup
        .mixed()
        .nullable()
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            (value) => {
                if (value[0]) {
                    return value[0].size <= imageConstants.FILE_IMAGE
                } else {
                    return true
                }
            }

        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            (value) => {
                if (value[0]) {
                    return imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
                } else {
                    return true
                }
            }
        ),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    gender: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณาเลือกเพศ",
            value => value !== null && defaultValue.gender[value] !== null
        ),
    dateOfBirth: yup
        .date()
        .max(moment(), "กรุณากรอกวันเดือนปีเกิดอีกครั้ง")
        .required("กรุณากรอกวันเดือนปีเกิด")
        .nullable(),
    grade: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณากรอกระดับชั้น",
            value => value !== null && defaultValue.grade[value] !== null
        ),
    email: yup.string().email().required(),
    phoneNumber: yup
        .string()
        .required("กรุณาเพิ่มเบอร์โทรศัพท์")
        .test(
            "phoneformat",
            "กรุณาเพิ่มเบอร์โทรศัพท์ที่ถูกต้อง",
            value => value.length === 10
        ),
    facebook: yup
        .string(),
    line: yup
        .string(),
});