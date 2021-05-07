import * as yup from "yup";

export const courseClipSchema = yup.object().shape({
    namecourse:yup.string().required("กรุณาใส่ชื่อคอร์ส"),
    subject: yup.string().required("กรุณาเลือกวิชา"),
    grade: yup.string().required("กรุณาเลือกระดับชั้น"),
    image: yup.mixed().required("กรุณาอัพโหลดรูปภาพ"),
});