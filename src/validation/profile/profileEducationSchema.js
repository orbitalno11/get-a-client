import * as yup from "yup";

export const profileEducationSchema = yup.object().shape({
    image: yup
    .mixed()
    .required("A file is required"),
    type: yup.string().required(),
    grade: yup.string().required(),
    brance: yup.string().required(),
    university: yup.string().required(),
    gradeScore: yup.number().required(),
    status: yup.string().required(),
});