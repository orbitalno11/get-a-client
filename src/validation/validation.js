import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const learnnerRegisSchema = yup.object().shape({
    profile: yup.object(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    grade: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    comfirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});


const tutorRegisSchema = yup.object().shape({
    profile: yup.object(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    subject: yup.array().max(3,"Max").nullable(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    comfirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
});

export {
    loginSchema ,
    learnnerRegisSchema ,
    tutorRegisSchema
}