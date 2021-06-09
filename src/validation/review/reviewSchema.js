import * as yup from "yup";

export const reviewSchema = yup.object().shape({
    rate: yup
    .number()
    .required("กรุณาให้คะแนนสอนครั้งนี้")
    .min(1,"กรุณาให้คะแนนสอนครั้งนี้"),
    comment: yup.string().required("กรุณาแสดงความคิดเห็นการสอนครั้งนี้"),
});