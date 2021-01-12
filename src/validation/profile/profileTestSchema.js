import * as yup from "yup";

export const profileTestSchema = yup.object().shape({
    image: yup.object(),
    type: yup.string().required(),
    test: yup.string().required(),
    subject: yup.string().required(),
    score: yup.number().required(),
    year: yup.number().required(),
});