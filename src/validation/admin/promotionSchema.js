import * as yup from "yup";
import moment from "moment";

export  const promotionSchema = yup.object().shape({
    name: yup.string().required(), 
    startDate: yup
    .string()
    .required("กรุณาระบุวันที่เริ่มโปรโมชั่น"),
    endDate: yup
    .string()
    .required("กรุณาระบุวันสิ้นสุดโปรโมชั่น")
    .test("is-greater", "เวลาสิ้นสุดโปรโมชั่นควรที่จะมีเวลามากกว่าเวลาเริ่มโปรโมชั่น", function (value) {
      const { start } = this.parent;
      return moment(value,"MM/DD/YYYY").isSameOrAfter(moment(start, "MM/DD/YYYY"));
    }),
    baht: yup.number().required("กรุณากำหนดค่าเงิน"),
    coin: yup.number().required("กรุณากำหนดค่าเหรียญ"),
});
