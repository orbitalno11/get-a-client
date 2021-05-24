import * as yup from "yup";

export const profileAddressSchema = yup.object().shape({
    address: yup
        .string()
        .required("กรุณาใส่ข้อมูลที่อยู่"),
    hintAddress: yup.string(),
});