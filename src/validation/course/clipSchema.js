import * as yup from "yup";

export const clipSchema = (edit) => {
    return (
        yup.object().shape({
            name: yup.string().required("กรุณากรอกชื่อคลิป"),
            description: yup.string().required("กรุณากรอกรายละเอียดของคลิป"),
            cost: yup.string().required("กรุณากรอกราคาของคลิปการสอนนี้"),
            video: yup
                .mixed()
                .nullable()
                .test(
                    "is_upload",
                    "กรุณาเพิ่มคลิปการสอน",
                    value => {
                        if (edit) {
                            return true
                        } else {
                            return value[0] !== undefined
                        }
                    }
                ),
        })
    )
}