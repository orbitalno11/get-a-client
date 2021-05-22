import { Button } from "antd"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import React from 'react'
import { Fragment } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { color } from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style"
import style from "../styles.module.scss";

export default function ButtonReview({ owner, isOfflineCourse, handleOpenReviewForm, enrollCourse, learn_status, showReview, switchComponent, typeShow }) {
    const { type, id } = useParams()
    const screens = useBreakpoint();
    return (
        <Fragment>
            {
                typeShow !== "mobile" ? (
                    <Fragment>
                        {
                            !isOfflineCourse ? (
                                <Link to={`/course/online/${id}/video`}>
                                    <Button
                                        className="buttonColor"
                                        style={styleComponent.buttonFull(color.orange)}
                                        size="middle">
                                        ดูบทเรียน
                            </Button>
                                </Link>
                            ) : (
                                !owner && (
                                    learn_status ? (
                                        <Button className="buttonColor" size="large" style={styleComponent.buttonFull(color.orange)} onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</Button>
                                    ) : (
                                        <Button className="buttonColor" size="large" style={styleComponent.buttonFull(color.orange)} onClick={() => enrollCourse()} >สมัครเรียน</Button>
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
                                                        className="buttonColor"
                                                        size="large"
                                                        style={styleComponent.buttonFull(color.orange)}>
                                                        อนุมัติคำขอ
                                            </Button>
                                                </Link>
                                            )
                                        )
                                    }
                                    <Link to={`/tutor/${type}/${id}/edit`} >
                                        <div style={{ marginTop: "0.5rem" }}>
                                            <Button
                                                className="buttonColor"
                                                size="large"
                                                style={styleComponent.buttonFull(color.blue)}>
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
                                        <button className={style.leftbuttom} >อนุมัติคำขอ</button>
                                    </Link>
                                ) : (
                                    <Link to={`/course/online/${id}/video`}>
                                        <button className={style.leftbuttom} >ดูบทเรียน</button>
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
                                        <button className={style.leftbuttom} onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</button>
                                    ) : (
                                        <button className={style.leftbuttom} onClick={() => enrollCourse()} >สมัครเรียน</button>
                                    )
                                ) : (
                                    <Link to={`/course/online/${id}/video`}>
                                        <button className={style.leftbuttom} >ดูบทเรียน</button>
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
