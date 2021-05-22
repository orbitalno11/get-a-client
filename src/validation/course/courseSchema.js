import * as yup from "yup";
import moment from "moment";

export const courseSchema = yup.object().shape({
  namecourse: yup.string().required("กรุณาใส่ชื่อคอร์ส"),
  subject: yup
    .string()
    .nullable()
    .required("กรุณาเลือกวิชา"),
  grade: yup
    .string()
    .nullable()
    .required("กรุณาเลือกระดับชั้น"),
  type: yup
    .string()
    .nullable()
    .required("กรุณาเลือกประเภทการสอน"),
  dateOfWeek: yup
    .string()
    .nullable()
    .required("กรุณาระบุวันที่สอน"),
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