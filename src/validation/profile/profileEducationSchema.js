import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";

export const profileEducationSchema = () => {
    const schema = yup.object().shape({
        image1: yup
        .string()
        .required("กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ อย่างน้อย 1 รูป"),
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