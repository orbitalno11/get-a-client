import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";

export const courseClipSchema = yup.object().shape({
    name: yup.string().required("กรุณาใส่ชื่อคอร์ส"),
    subject: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณาเลือกวิชา",
            value => value !== null && defaultValue.subject[value] !== null
        ),
    grade: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณาเลือกระดับชั้น",
            value => value !== null && defaultValue.grade[value] !== null
        ),
    image: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาอัพโหลดรูปภาพ",
            value => value[0] !== undefined
        )
});