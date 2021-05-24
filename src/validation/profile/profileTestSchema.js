import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";

export const profileTestSchema = () => {
    const schema = yup.object().shape({
        image1: yup
        .string()
        .required("กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป"),
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