import * as yup from "yup";

export  const exchangeSchema = yup.object().shape({
    baht: yup.number().required("กรุณากำหนดค่าเงิน"),
    coin: yup.number().required("กรุณากำหนดค่าเหรียญ"),
});
