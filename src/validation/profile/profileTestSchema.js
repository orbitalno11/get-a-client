import * as yup from "yup";

export const profileTestSchema = () => {
    const schema = yup.object().shape({
        image1: yup
        .string()
        .required("กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป"),
        test: yup
            .string()
            .nullable()
            .required("กรุณากรอกประเภทการสอบ"),
        subject: yup
            .string()
            .nullable()
            .required("กรุณากรอกวิชาที่สอบ"),
        score: yup.string().required("กรุณากรอกคะแนน"),
        year: yup
            .string()
            .required("กรุณากรอกปีการสอบ"),
    })
    return schema
}