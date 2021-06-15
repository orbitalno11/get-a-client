import * as yup from "yup";

export const courseClipSchema = (isEdit) =>{
    return (
        yup.object().shape({
            name: yup.string().required("กรุณาใส่ชื่อคอร์ส"),
            subject: yup
                .string()
                .nullable()
                .required("กรุณาเลือกวิชา"),
            grade: yup
                .string()
                .nullable()
                .required("กรุณาเลือกระดับชั้น"),
            image: yup
                .mixed()
                .nullable()
                .test(
                    "is_upload",
                    "กรุณาอัพโหลดรูปภาพ",
                    value => {
                        if(isEdit){
                            return true
                        }else{
                            return value[0] !== undefined
                        }
                    } 
                )
        })
    )
}
