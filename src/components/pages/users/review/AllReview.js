import React, { Fragment } from 'react'
import CardReview from "../../../card/CardReview"
import { Button, Grid } from "antd"
import style from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../redux/actions";
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm from "./ReviewForm";
import { Link } from "react-router-dom";
import FormEnroll from "../managecourse/offlineCourse/FormEnroll";
import EmptyImage from "../../../loading/EmptyImage";
const { useBreakpoint } = Grid;

export default function AllReview() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { offlineCourse, auth } = useSelector(state => state)
    const owner = (offlineCourse.data && auth) && (auth.profile === offlineCourse.data.owner.id)
    const type = "course"
    const learn_status = false
    const review = null

    const handleOpenReviewForm = () => {
        dispatch(modalAction.openModal({
            body: <ReviewForm />,
            size: sizeModal.default,
        }))
    }

    const paddingButton = {
        margin: '0rem 0.5rem 0rem 0.5rem'
    }

    const enrollCourse = () => {
        if (!auth.isAuthenticated) {
            window.location.href = "/login"
        } else {
            const dataEnroll = offlineCourse.data && {
                id: offlineCourse.data.id,
                name: offlineCourse.data.name,
                subject: offlineCourse.data.subject.title,
                grade: offlineCourse.data.grade.title,
                owner: offlineCourse.data.owner.fullNameText
            }

            dispatch(modalAction.openModal({
                body: <FormEnroll data={dataEnroll} />,
                size: sizeModal.default,
            }))
        }
    }


    return (
        <Fragment>
            <div className={style.marginTop20}>
                <div className={style.TitleCoin}>
                    <span className={style.titleH3}>ความเห็นจากผู้เรียนจริง</span>
                    <div style={{ marginLeft: 'auto' }}>
                        {
                            learn_status && screens.lg && (
                                <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</Button>
                            )
                        }
                        {
                            (!status && !owner && screens.lg) && (
                                <Fragment>

                                    <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => enrollCourse()} style={paddingButton}>สมัครเรียน</Button>
                                </Fragment>
                            )
                        }

                        {
                            (owner && screens.lg) && (
                                <Fragment>
                                    { type === "course" ? (
                                        <Link to={`/tutor/course/${offlineCourse.data.id}/enroll`}>
                                            <Button className="buttonColor backgroundOrange" shape="round" size="large" style={paddingButton}>อนุมัติคำขอ</Button>
                                        </Link>
                                    ) : (
                                        <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>จัดการบทเรียน</Button>
                                    )
                                    }
                                    <Link to={`/tutor/course/${offlineCourse.data.id}/edit`}>
                                        <Button className="buttonColor backgroundBlue" shape="round" size="large" style={paddingButton}>แก้ไข</Button>
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>
                </div>

                <div className={style.marginTop20}>
                    {
                        review && review.length ? (
                            <CardReview data={review} />
                        ) : (
                            <div align="center">
                                <EmptyImage size="default" />
                                <p className={style.textNormal}>บทเรียนนี้ยังไม่มีผู้แสดงความคิดเห็น&nbsp;
                                    {
                                        owner ? " อย่าลืมบอกให้นักเรียนมาแสดงคิดเห็นกันนะ" : "สมัครเรียนเพื่อแสดงความคิดเห็นสิ"
                                    }
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
