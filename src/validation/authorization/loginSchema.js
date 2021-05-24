import * as yup from "yup";

export  const loginSchema = yup.object().shape({
    email: yup.string().email().required("กรุณากรอกอีเมล"),
    password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});