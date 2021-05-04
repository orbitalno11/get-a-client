import * as yup from "yup";

export const clipSchema = yup.object().shape({
    title:yup.string().required(),
    description: yup.string().required(),
    image: yup
    .mixed()
    .required("กรุณาอัพโหลดรูปภาพ"),
    filemp4:yup.mixed().required("กรุณาอัพโหลดไฟล์วิดีโอคลิป"),
});