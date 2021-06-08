import * as yup from "yup";
import { defaultValue } from "../../components/defaultValue";
import { imageConstants } from "../constants";

export const redeemSchema = yup.object().shape({
    image: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปภาพ",
            value => value[0] !== undefined
        )
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
        ).required("กรุณาใส่รูปภาพเอกสารตามรายละเอียด"),
    coin: yup.string().required("กรุณาใส่จำนวนเหรียญที่ต้องการจะแลก").test(
        "coinformat",
        "กรุณาใส่จำนวนเหรียญให้ถูกต้อง",
        value => value > 0
    ),
    accountNo: yup.string().required("กรุณาใส่หมายเลขบัญชี").test(
        "accountNoformat",
        "กรุณาเพิ่มหมายเลขบัญชีที่ถูกต้อง",
        value => value.length === 10 && value>0
    ),
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