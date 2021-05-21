
import * as yup from "yup";

export const profileIdentitySchema = yup.object().shape({
    idCard: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปบัตรประชาชน",
            value => value[0] !== undefined
        ),
    face: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปหน้าตรง",
            value => value[0] !== undefined
        ),
    idCardWithFace: yup
        .mixed()
        .nullable()
        .test(
            "is_upload",
            "กรุณาเพิ่มรูปหน้าตรงคู่กับบัตรประชาชน",
            value => value[0] !== undefined
        )
});