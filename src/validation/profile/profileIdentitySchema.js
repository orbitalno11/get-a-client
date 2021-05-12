
import * as yup from "yup";
import { imageConstants } from "../constants";

export const profileIdentitySchema = yup.object().shape({
    idCard: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปบัตรประชาชน",
            value => value[0] !== undefined
        )
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            value => value[0] && value[0].size <= imageConstants.FILE_IMAGE_IDENTITY
        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            value => value[0] && imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
        ),
    face: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปหน้าตรง",
            value => value[0] !== undefined
        )
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            value => value[0] && value[0].size <= imageConstants.FILE_IMAGE_IDENTITY
        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            value => value[0] && imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
        ),
    idCardWithFace: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปหน้าตรงคู่กับบัตรประชาชน",
            value => value[0] !== undefined
        )
        .test(
            "fileSize",
            "รูปภาพมีขนาดใหญ่เกินไป",
            value => value[0] && value[0].size <= imageConstants.FILE_IMAGE_IDENTITY
        ).test(
            "fileFormat",
            "ไม่รองรับประเภทของไฟล์นี้",
            value => value[0] && imageConstants.SUPPORTED_FORMATS.includes(value[0].type)
        )
});