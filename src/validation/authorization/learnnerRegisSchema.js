import * as yup from "yup";
import moment from 'moment';
import { imageConstants } from "../constants";
import { defaultValue } from "../../components/defaultValue";

export const learnnerRegisSchema = yup.object().shape({
    image: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปภาพ",
            value => value[0] !== undefined
        )
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            value => value[0] && value[0].size <= imageConstants.FILE_IMAGE
        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            value => value[0] && imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
        )
    ,
    firstname: yup
        .string()
        .required("กรุณากรอกชื่อจริง"),
    lastname: yup
        .string()
        .required("กรุณากรอกนามสกุล"),
    gender: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณาเลือกเพศ",
            value => value !== null  && defaultValue.gender[value] !== null
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
    email: yup
        .string()
        .email()
        .required("กรุณากรอกอีเมล"),
    phoneNumber: yup
        .string()
        .required("กรุณาเพิ่มเบอร์โทรศัพท์")
        .test(
            "phoneformat",
            "กรุณาเพิ่มเบอร์โทรศัพท์ที่ถูกต้อง",
            value => value.length ===10
        ),
    password: yup
        .string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%-.*_#?&])[A-Za-z\d$!%-.*_#?&]{8,}$/,
            "กรุณากรอกรหัสผ่าน โดยประกอบด้วยตัวอักษรอย่างน้อย 8 ตัว ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว และอัขระพิเศษอย่างน้อย 1 ตัว"
        )
        .required(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน")
        .required("กรุณากรอกยืนยันรหัสผ่าน")
});