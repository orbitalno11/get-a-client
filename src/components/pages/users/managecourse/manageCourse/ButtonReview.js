import { Button } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import React from 'react'
import { Fragment } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { color } from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style"
import style from "../styles.module.scss";
import { useSelector } from "react-redux"

export default function ButtonReview({ owner, isOfflineCourse, handleOpenReviewForm, enrollCourse, learn_status, showReview, switchComponent, typeShow }) {
    const { id } = useParams()
    const type = window.location.pathname.split("/")[1] 
    const screens = useBreakpoint();
    const { loading } = useSelector(state => state.loading)
    return (
        <Fragment>
            {
                typeShow !== "mobile" ? (
                    <Fragment>
                        {
                            !isOfflineCourse ? (
                                <Link to={`/course/online/${id}/video`}>
                                    <Button
                                        className={`${style.buttonColor} ${style.textOne5}`}
                                        style={styleComponent.buttonFull(color.orange)}
                                        size="middle"
                                        disabled = {loading}
                                        >
                                        ดูบทเรียน
                                    </Button>
                                </Link>
                            ) : (
                                !owner && (
                                    learn_status ? (
                                        <Button disabled = {loading} className={`${style.buttonColor} ${style.textOne5}`} size="middle" style={styleComponent.buttonFull(color.orange)} onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</Button>
                                    ) : (
                                        <Button disabled = {loading} className={`${style.buttonColor} ${style.textOne5}`} size="middle" style={styleComponent.buttonFull(color.orange)} onClick={() => enrollCourse()} >สมัครเรียน</Button>
                                    )
                                )
                            )
                        }
                        {
                            owner && (
                                <Fragment>
                                    {
                                        isOfflineCourse && (
                                            (
                                                <Link to={`/tutor/course/${id}/enroll`}>
                                                    <Button
                                                        className={`${style.buttonColor} ${style.textOne5}`}
                                                        size="large"
                                                        style={styleComponent.buttonFull(color.orange)}
                                                        disabled = {loading}>
                                                        อนุมัติคำขอ
                                            </Button>
                                                </Link>
                                            )
                                        )
                                    }
                                    <Link to={`/tutor/${type}/${id}/edit`} >
                                        <div style={{ marginTop: "0.5rem" }}>
                                            <Button
                                                className={`${style.buttonColor} ${style.textOne5}`}
                                                size="large"
                                                style={styleComponent.buttonFull(color.blue)}
                                                disabled = {loading}>
                                                แก้ไขคอร์สเรียน
                                    </Button>
                                        </div>
                                    </Link>
                                </Fragment>
                            )
                        }
                    </Fragment>
                ) : (
                    owner ? (
                        <div className={!screens.md ? style.navbarBottom : style.navbarBottomMD}>
                            {
                                isOfflineCourse ? (
                                    <Link to={`/tutor/course/${id}/enroll`}>
                                        <button className={style.leftbuttom} disabled = {loading}>อนุมัติคำขอ</button>
                                    </Link>
                                ) : (
                                    <Link to={`/course/online/${id}/video`}>
                                        <button className={style.leftbuttom} disabled = {loading}>ดูบทเรียน</button>
                                    </Link>
                                )
                            }
                            <Link to={`/tutor/${type}/${id}/edit`}>
                                <button className={style.rightbottom} >แก้ไขบทเรียน</button>
                            </Link>
                        </div>
                    ) : (
                        <div className={!screens.md ? style.navbarBottom : style.navbarBottomMD}>
                            {
                                isOfflineCourse ? (
                                    learn_status ? (
                                        <button className={style.leftbuttom} onClick={() => { handleOpenReviewForm() }} disabled = {loading}>ให้คะแนน</button>
                                    ) : (
                                        <button className={style.leftbuttom} onClick={() => enrollCourse()} disabled = {loading}>สมัครเรียน</button>
                                    )
                                ) : (
                                    <Link to={`/course/online/${id}/video`}>
                                        <button className={style.leftbuttom} disabled = {loading}>ดูบทเรียน</button>
                                    </Link>
                                )
                            }
                            <button className={style.rightbottom} onClick={() => switchComponent(!showReview)}>
                                {
                                    showReview ? "ถามข้อมูล" : "ความคิดเห็น"
                                }
                            </button>
                        </div>
                    )
                )
            }
        </Fragment>
    )
}