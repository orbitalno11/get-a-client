import * as yup from "yup";
import isEmpty from "../../components/defaultFunction/checkEmptyObject";
import { defaultValue } from "../../components/defaultValue";

export const profileEducationSchema = (edit) => {
    const schema = yup.object().shape({
        image1: yup
        .string()
        .test(
            "is_upload",
            "กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป",
            (value) => {
                if (edit) {
                    return true
                } else {
                    return !isEmpty(value) 
                }
            }
        ),
        grade: yup
            .string()
            .nullable()
            .test(
                "valueSelector",
                "กรุณากรอกวิชาที่สอบ",
                value => value !== null && defaultValue.grade[value] !== null
            ),
        branch: yup.string().required("กรุณากรอกสาขาวิชา"),
        institute: yup.string().required("กรุณากรอกมหาลัย"),
        gpax: yup.string().required("กรุณากรอกคะแนน"),
        status: yup
            .string()
            .nullable()
            .test(
                "valueSelector",
                "กรุณาสถานะการศึกษา",
                value => value !== null && defaultValue.educationStatus[value] !== null
            ),
    });
    return schema
}