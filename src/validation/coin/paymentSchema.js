import * as yup from "yup";

export const paymentSchema = yup.object().shape({
    payment: yup.string().required("กรุณาเลือกช่องทางการชำระเงิน").nullable()
});