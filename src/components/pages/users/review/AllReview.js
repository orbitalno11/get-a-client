import React, { Fragment } from 'react'
import CardReview from "../../../card/CardReview"
import { Button, Col, Grid, Row } from "antd"
import style from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { modalAction, reviewActions } from "../../../../redux/actions";
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm, { DeleteForm } from "./ReviewForm";
import { Link, useParams } from "react-router-dom";
import FormEnroll from "../managecourse/offlineCourse/FormEnroll";
import EmptyImage from "../../../loading/EmptyImage";
import { useEffect } from "react";
import isEmpty from "../../../defaultFunction/checkEmptyObject";

const { useBreakpoint } = Grid;

export default function AllReview() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { offlineCourse, auth, review } = useSelector(state => state)
    const course = offlineCourse.data && offlineCourse.data
    const owner = (course && auth) && (auth.profile === course.owner.id)
    const learn_status = (auth.role === 1 && course) ? course.enrolled : false
    const { id } = useParams()
    const type = "course"

    const reviewList = !isEmpty(review.reviews) ? review.reviews.filter(value => value.reviewer.id !== auth.profile) : []
    const myReview = !isEmpty(review.reviews) ? review.reviews.filter(value => value.reviewer.id === auth.profile)[0] : []
    console.log(myReview)
    useEffect(() => {
        dispatch(reviewActions.getReviewByCourse(id, 1))
    }, [])

    const handleOpenReviewForm = (id, action) => {
        if(action !== "delete"){
            dispatch(modalAction.openModal({
                body: <ReviewForm idReview={id} />,
                size: sizeModal.default,
            }))
        }else{
            dispatch(modalAction.openModal({
                body : <DeleteForm idReview={id}/>,
                size: sizeModal.default
            }))
        }
       
    }

    const paddingButton = {
        margin: '0rem 0.5rem 0rem 0.5rem'
    }

    const enrollCourse = () => {
        if (!auth.isAuthenticated) {
            window.location.href = "/login"
        } else {
            const dataEnroll = course && {
                id: course.id,
                name: course.name,
                subject: course.subject.title,
                grade: course.grade.title,
                owner: course.owner.fullNameText
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
                            learn_status && isEmpty() && screens.lg && (
                                <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</Button>
                            )
                        }
                        {
                            (!learn_status && !owner && screens.lg) && (
                                <Fragment>
                                    <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => enrollCourse()} style={paddingButton}>สมัครเรียน</Button>
                                </Fragment>
                            )
                        }

                        {
                            (owner && screens.lg) && (
                                <Fragment>
                                    { type === "course" ? (
                                        <Link to={`/tutor/course/${course.id}/enroll`}>
                                            <Button className="buttonColor backgroundOrange" shape="round" size="large" style={paddingButton}>อนุมัติคำขอ</Button>
                                        </Link>
                                    ) : (
                                        <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>จัดการบทเรียน</Button>
                                    )
                                    }
                                    <Link to={`/tutor/course/${course.id}/edit`}>
                                        <Button className="buttonColor backgroundBlue" shape="round" size="large" style={paddingButton}>แก้ไข</Button>
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>
                </div>

                <div className={style.marginTop20}>
                    {
                        !isEmpty(review.reviews) ? (
                            <Row>
                                {!isEmpty(myReview) &&
                                    <Col span={24} >
                                        <CardReview data={myReview} myReview={true} handleEdit={handleOpenReviewForm} />
                                    </Col>
                                }
                                {!isEmpty(reviewList) && reviewList.map((item, index) => (
                                    <Col span={24} key={index} className={style.paddingTop} >
                                        <CardReview data={item} myReview={false} />
                                    </Col>
                                ))}
                            </Row>
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
