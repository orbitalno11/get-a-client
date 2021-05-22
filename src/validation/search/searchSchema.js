import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";

const nonSpecified = {
    "ไม่ระบุ" : 99
}

export const searchSchema = yup.object().shape({
    grade: yup
        .string()
        .nullable()
        .required("กรุณาระบุระดับชั้นที่ต้องการค้นหา")
        .test(
            "valueSelector",
            "กรุณาระบุระดับชั้นที่ต้องการค้นหา",
            value => value !== null && defaultValue.grade[value] !== null
        ),
    gender: yup
        .string()
        .nullable()
        .required("กรุณาระบุเพศที่ต้องการค้นหา")
        .test(
            "valueSelector",
            "กรุณาระบุเพศที่ต้องการค้นหา",
            value => value !== null && (defaultValue.gender[value] !== null || nonSpecified[value] !== null)
        ),
    subject: yup
        .string()
        .nullable()
        .required("กรุณาระบุวิชาที่ต้องการค้นหา")
        .test(
            "valueSelector",
            "กรุณาระบุวิชาที่ต้องการค้นหา",
            value => value !== null && defaultValue.subject[value] !== null
        ),
    courseType: yup
        .string()
        .nullable()
        .required("กรุณาระบุประเภทการเรียนที่ต้องการค้นหา")
        .test(
            "valueSelector",
            "กรุณาระบุประเภทการเรียนที่ต้องการค้นหา",
            value => value !== null && (defaultValue.typeCourse[value] !== null || nonSpecified[value] !== null )
        )
});