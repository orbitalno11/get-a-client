import * as yup from "yup";
import isEmpty from "../../components/defaultFunction/checkEmptyObject";
import { defaultValue } from "../../components/defaultValue";

export const profileTestSchema = (edit) => {
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
        test: yup
            .string()
            .nullable()
            .test(
                "valueSelector",
                "กรุณากรอกประเภทการสอบ",
                value => value !== null && defaultValue.examType[value] !== null
            ),
        subject: yup
            .string()
            .nullable()
            .test(
                "valueSelector",
                "กรุณากรอกวิชาที่สอบ",
                value => value !== null && defaultValue.subject[value] !== null
            ),
        score: yup.string().required("กรุณากรอกคะแนน"),
        year: yup
            .string()
            .required("กรุณากรอกปีการสอบ"),
    })
    return schema
}