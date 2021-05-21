import { Row, Col, Grid, Divider } from "antd"
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import style from "../styles.module.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../../../headerMobile/Header";
import ModalComponent from "../../../../modal/ModalComponent";
import AllReview from "../../review/AllReview";
import DetailCourse from "./DetailCourse";
import { modalAction, offlineCourseAction } from "../../../../../redux/actions";
import ReviewForm from "../../review/ReviewForm";
import { sizeModal } from "../../../../modal/SizeModal";
import isMobile from "../../../../isMobile/isMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FormEnroll from "./FormEnroll";
import { color } from "../../../../defaultValue";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import { trackImpressCourseDetail } from "../../../../../analytic/Analytic";
const { useBreakpoint } = Grid;

export default function OfflineCourse() {
    const { offlineCourse, auth } = useSelector(state => state)
    const course = offlineCourse.data && offlineCourse.data
    const owner = (course && auth) && (auth.profile === course.owner.id)
    const [showReview, setShowReview] = useState(true)
    const dispatch = useDispatch()
    const screens = useBreakpoint();
    const params = useParams();
    const learn_status = false
    const type = "course"
    const idCourse = params.id


    useEffect(() => {
        dispatch(offlineCourseAction.getOfflineCourse(idCourse))
        trackImpress()
        return () => {
            dispatch(offlineCourseAction.clearOfflineCourse())
        }
    }, [])

    const trackImpress = () => {
        const courseType = 1 // set course type
        if (idCourse?.isSafeNotBlank()) {
            trackImpressCourseDetail(idCourse, courseType)
        }
    }


    const ContactTutor = () => {
        return (
            <div className={isMobile() ? style.subProfile : style.backgroungContact} >
                <div className={style.marginTop20}>
                    <span className={style.titleH3}>ช่องทางสอบถามข้อมูล</span>
                </div>
                <div className={style.TitleCoin}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={style.iconmarker} />
                    {
                        course ? (
                            <span className={style.textNormal}>{course && course.owner.contact.phoneNumber}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText />
                        )
                    }
                </div>
                {
                    course && (
                        <Link to={`/profile/${course.owner.id}/course`}>
                            <span className={style.TitleCoin} style={{ color: color.black }}>. . .  ดูข้อมูลเพิ่มเติม</span>
                        </Link>
                    )
                }
            </div>
        )
    }

    const switchComponent = (status) =>{
        document.getElementById("switchComponent").scrollIntoView({ behavior: "smooth" })
        setShowReview(status)
    }

    const switchShow = () => {
        if (!isMobile() || showReview) {
            // document.getElementById('componentSelector').scrollIntoView({ behavior: "smooth" })
            return <AllReview />
        } else {
            // document.getElementById('componentSelector').scrollIntoView({ behavior: "smooth" })
            return <ContactTutor />
        }

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

    const handleOpenReviewForm = () => {
        dispatch(modalAction.openModal({
            body: <ReviewForm />,
            size: sizeModal.default,
        }))
    }


    return (
        <Fragment>
            {isMobile() && <Header pageBack="goback" />}
            <div>
                <ModalComponent />
                <Row className={style.body} justify="space-between" style={{ paddingBottom: "7.5rem" }}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                        <DetailCourse />
                    </Col>
                    {
                        !isMobile() && (
                            <Col className={style.marginTop} span={24}>
                                <Divider className={style.dividerDetail} />
                            </Col>
                        )
                    }
                    <Col xl={13} lg={13} md={14} sm={24} xs={24} id="switchComponent" >
                        {
                            switchShow()
                        }
                    </Col>
                    {
                        !isMobile() && (
                            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                                <ContactTutor />
                            </Col>
                        )
                    }
                </Row>
                {
                    (!learn_status && !screens.lg && screens.md) && (
                        <div className={style.navbarBottomMD}>
                            <button className={style.reviewbottom} onClick={() => enrollCourse()}>สมัครเรียน</button>
                        </div>
                    )
                }
                {
                    (!learn_status && !screens.md) && (
                        <div className={style.navbarBottom}>
                            <button className={style.leftbuttom} onClick={() => enrollCourse()}>สมัครเรียน</button>
                            <button className={style.rightbottom} onClick={() => switchComponent(!showReview)}>
                                {
                                    showReview ? "ถามข้อมูล" : "ความคิดเห็น"
                                }
                            </button>
                        </div>
                    )
                }
                {
                    (learn_status && !screens.lg) && (
                        <div className={style.navbarBottom} >
                            <button className={style.reviewbottom} onClick={() => handleOpenReviewForm()} >ให้คะแนนการสอนนี้</button>
                        </div>
                    )
                }

                {
                    (owner && !screens.lg) && (
                        <div className={!screens.md ? style.navbarBottom : style.navbarBottomMD}>
                            { type === "course" ? (
                                <Link to={`/tutor/course/${course.id}/enroll`}>
                                    <button className={style.leftbuttom} >อนุมัติคำขอ</button>
                                </Link>
                            ) : (
                                <button className={style.leftbuttom} >จัดการบทเรียน</button>
                            )
                            }
                            <Link to={`/tutor/course/${idCourse}/edit`}>
                                <button className={style.rightbottom} >แก้ไข</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}
