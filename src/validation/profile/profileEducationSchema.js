import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";
import { imageConstants } from "../constants";

export const profileEducationSchema = (edit) => {
    const schema = yup.object().shape({
        image: yup
            .mixed()
            .nullable()
            .test(
                "is_upload",
                "กรุณาเพิ่มเอกสารยืนยันคะแนนการสอบ",
                (value) => {
                    if (edit) {
                        return true
                    } else {
                        return value[0] !== undefined
                    }
                }
            )
            .test(
                "fileSize",
                "รูปภาพมีขนาดใหญ่เกินไป",
                (value) => {
                    if (value[0]) {
                        return value[0].size <= imageConstants.FILE_IMAGE_IDENTITY
                    } else if (edit && !value[0]) {
                        return true
                    }
                }
            ).test(
                "fileFormat",
                "ไม่รองรับประเภทของไฟล์นี้",
                (value) => {
                    if (value[0]) {
                        return value[0] && imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
                    } else if (edit && !value[0]) {
                        return true
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