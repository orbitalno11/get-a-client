import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";
import { imageConstants } from "../constants";

export const redeemSchema = yup.object().shape({
    image: yup
        .mixed()
        .nullable()
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            (value) => {
                if (value[0]) {
                    return value[0].size <= imageConstants.FILE_IMAGE
                } else {
                    return true
                }
            }

        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            (value) => {
                if (value[0]) {
                    return imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
                } else {
                    return true
                }
            }
        ),
    coin: yup.string().required("กรุณาใส่จำนวนเหรียญที่ต้องการจะแลก"),
    accountNo: yup.string().required("กรุณาใส่หมายเลขบัญชี"),
    bank: yup
        .string()
        .nullable()
        .test(
            "valueSelector",
            "กรุณาเลือกธนาคาร",
            value => value !== null && defaultValue.gender[value] !== null
        ),
    accountName: yup.string().required("กรุณาใส่ชื่อบัญชี"),
});