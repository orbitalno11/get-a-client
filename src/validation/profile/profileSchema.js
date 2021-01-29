import * as yup from "yup";

export const profileSchema = yup.object().shape({
    profile: yup.object(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    grade: yup.string().required(),
    email: yup.string().email().required(),
});