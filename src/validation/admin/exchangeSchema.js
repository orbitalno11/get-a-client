import * as yup from "yup";

export  const exchangeSchema = yup.object().shape({
    baht: yup.number().required(),
    coin: yup.number().required(),
});
