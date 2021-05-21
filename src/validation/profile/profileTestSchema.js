import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";

export const profileTestSchema = (edit) => {
    const schema = yup.object().shape({
        image1: yup
            .mixed()
            .nullable()
            .test(
                "is_upload",
                "กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป",
                (value) => {
                    if (edit) {
                        return true
                    } else {
                        return value[0] !== undefined
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