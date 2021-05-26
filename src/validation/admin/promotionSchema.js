import * as yup from "yup";
import moment from "moment";

export  const promotionSchema = yup.object().shape({
    name: yup.string().required(), 
    start: yup
    .string()
    .required("กรุณาระบุเวลาที่เริ่มโปรโมชั่น"),
    end: yup
    .string()
    .required("กรุณาระบุเวลาสิ้นสุดโปรโมชั่น")
    .test("is-greater", "เวลาสิ้นสุดโปรโมชั่นควรที่จะมีเวลามากกว่าเวลาเริ่มโปรโมชั่น", function (value) {
      const { start } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"));
    }),
    startDate: yup
    .string()
    .required("กรุณาระบุวันที่เริ่มโปรโมชั่น"),
    endDate: yup
    .string()
    .required("กรุณาระบุวันสิ้นสุดโปรโมชั่น")
    .test("is-greater", "เวลาสิ้นสุดโปรโมชั่นควรที่จะมีเวลามากกว่าเวลาเริ่มโปรโมชั่น", function (value) {
      const { start } = this.parent;
      return moment(value,"YYYY-MM-DD").isSameOrAfter(moment(start, "YYYY-MM-DD"));
    }),
    baht: yup.number().required("กรุณากำหนดค่าเงิน"),
    coin: yup.number().required("กรุณากำหนดค่าเหรียญ"),
});
