import * as yup from "yup";

export const profileEducationSchema = () => {
    const schema = yup.object().shape({
        image1: yup
            .string()
            .required("กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป"),
        grade: yup
            .string()
            .nullable()
            .required("กรุณากรอกวิชาที่สอบ"),
        branch: yup
            .string()
            .nullable()
            .required("กรุณากรอกสาขาวิชา"),
        institute: yup
            .string()
            .nullable()
            .required("กรุณากรอกมหาลัย"),
        gpax: yup
            .string()
            .required("กรุณากรอกคะแนน"),
        status: yup
            .string()
            .nullable()
            .required("กรุณาสถานะการศึกษา"),
    });
    return schema
}