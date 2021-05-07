import * as yup from "yup";

export  const promotionSchema = yup.object().shape({
    name: yup.string().required(), 
});
