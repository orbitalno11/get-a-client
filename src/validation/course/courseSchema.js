import * as yup from "yup";
import moment from "moment";
import { defaultValue } from "../../components/defaultValue";

export const courseSchema = yup.object().shape({
  namecourse: yup.string().required("กรุณาใส่ชื่อคอร์ส"),
  subject: yup
    .string()
    .nullable()
    .test(
      "valueSelector",
      "กรุณาเลือกระดับชั้น",
      value => value !== null && defaultValue.subject[value] !== null
    ),
  grade: yup
    .string()
    .nullable()
    .test(
      "valueSelector",
      "กรุณาเลือกระดับชั้น",
      value => value !== null && defaultValue.grade[value] !== null
    ),
  type: yup
    .string()
    .nullable()
    .test(
      "valueSelector",
      "กรุณาเลือกประเภทการสอน",
      value => value !== null && defaultValue.type[value] !== null
    ),
  dateOfWeek: yup
    .string()
    .nullable()
    .test(
      "valueSelector",
      "กรุณาระบุวันที่สอน",
      value => value !== null && defaultValue.dateOfWeek[value] !== null
    ),
  start: yup
    .string()
    .required("กรุณาระบุเวลาที่เริ่มเรียน"),
  end: yup
    .string()
    .required("กรุณาระบุเวลาที่เลิกเรียน")
    .test("is-greater", "เวลาเลิกเรียนควรที่จะมีเวลามากกว่าเวลาเริ่มเรียน", function (value) {
      const { start } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"));
    }),
  price: yup
  .string()
  .required("กรุณาระบุราคา"),
  description: yup
  .string()
  .test(
    "checkLenght",
    "กรุณาเพิ่มคำอธิบายอย่างน้อย 20 ตัวอักษร",
    value => value.length > 20 
  )
});