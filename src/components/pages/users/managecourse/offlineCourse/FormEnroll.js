import { Button, Spin } from "antd"
import React from 'react'
import style from "../styles.module.scss";
import { offlineCourseAction } from "../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Fragment } from "react";


export default function FormEnroll({ data }) {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const { enrollSuccess } = useSelector(state => state.offlineCourse)
    const button = {
        width: "100%",
        marginTop: "1rem"
    }

    const enrollCourse = () => {
        dispatch(offlineCourseAction.enRollOfflineCourse(data.id))
    }

    return (
        <div align="center">
            <p className={style.titleH3}>คุณต้องการสมัครเรียน {data.name} </p>
            <p> ระดับชั้น{data.grade}  วิชา{data.subject}</p>
            <p>ผู้สอน : {data.owner}</p>

            <Button id="reviewForm" className="buttonColor backgroundOrange" shape="round" size="middle" style={button} onClick={() => enrollCourse()}>
                {
                    loading.loading && (
                        <Fragment>
                            <Spin style={{ marginRight: "0.5rem" }} />
                            <span> กำลังส่งคำขอ</span>
                        </Fragment>
                    )
                }
                {
                    !loading.loading && (
                        enrollSuccess ? "ส่งคำขอเรียบร้อย รอการอนุมัติจากครูสอนพิเศษ" : "ส่งคำขอเรียน"
                    )
                }
            ส่งคำขอเรียน
        </Button>
        </div>)

}
