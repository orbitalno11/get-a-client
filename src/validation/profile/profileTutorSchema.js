import * as yup from "yup";

export const profileTutorSchema = yup.object().shape({
    profile: yup.object(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email(),
    facebook: yup.string(),
    line: yup.string(),
    introduce: yup.string(),
});