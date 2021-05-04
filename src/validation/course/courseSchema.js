import * as yup from "yup";
import moment from "moment";

export const courseSchema = yup.object().shape({
    namecourse:yup.string().required("กรุณาใส่ชื่อคอร์ส"),
    subject: yup.string().required("กรุณาเลือกวิชา"),
    grade: yup.string().required("กรุณาเลือกระดับชั้น"),
    type: yup.string().required("กรุณาเลือกประเภทการสอน"),
    dateOfWeek: yup.string().required("กรุณาระบุวันที่สอน"),
    start: yup.string().required("กรุณาระบุเวลาที่เริ่มเรียน"),
    end: yup.string().required("กรุณาระบุเวลาที่เลิกเรียน").test("is-greater", "end time should be greater", function(value) {
      const { start } = this.parent;
      return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"));
    }),
    price: yup.string().required("กรุณาระบุราคา"),
    image: yup.mixed().required("กรุณาอัพโหลดรูปภาพ"),
});