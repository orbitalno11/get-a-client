import * as yup from "yup";
// Note : Maybe use
// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png"
// ];
export const profileTestSchema = yup.object().shape({
    image: yup
    .mixed()
    .required("A file is required"),
    type: yup.string().required(),
    test: yup.string().required(),
    subject: yup.string().required(),
    score: yup.string().required(),
    year: yup.string().required(),
});