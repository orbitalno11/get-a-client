import { Button } from "antd"
import React from 'react'
import style from "../styles.module.scss";
import { modalAction, offlineCourseAction } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";


export default function FormEnroll({data}) {
    const dispatch = useDispatch()
    const button = {
        width:"100%",
        marginTop:"1rem"
    }

    const enrollCourse = () =>{
        dispatch(modalAction.closeModal())
        dispatch(offlineCourseAction.enRollOfflineCourse(data.id))
    }

    return (
    <div align="center">
        <p className={style.titleH3}>คุณต้องการสมัครเรียน {data.name} </p>
        <p> ระดับชั้น{data.grade}  วิชา{data.subject}</p>
        <p>ผู้สอน : {data.owner}</p>
        <Button className="buttonColor backgroundOrange" shape="round" size="middle" style={button} onClick={()=>enrollCourse()}>ส่งคำขอเรียน</Button>
    </div>)

}
