import * as yup from "yup";
import moment from 'moment';

export const learnnerRegisSchema = yup.object().shape({
    profile: yup.object(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    gender: yup.string().required(),
    dateOfBirth: yup.date().max(moment()).required(),
    grade: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    comfirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});