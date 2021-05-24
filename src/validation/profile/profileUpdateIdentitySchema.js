
import * as yup from "yup";

export const profileUpdateIdentitySchema = yup.object().shape({
    idCard: yup
        .mixed()
        .nullable(),
    face: yup
        .mixed()
        .nullable(),
    idCardWithFace: yup
        .mixed()
        .nullable()
});