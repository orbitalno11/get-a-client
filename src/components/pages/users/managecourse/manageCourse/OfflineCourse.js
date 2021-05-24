import { Row, Col, Grid, Divider, Button } from "antd"
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import style from "../styles.module.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../../../headerMobile/Header";
import ModalComponent from "../../../../modal/ModalComponent";
import AllReview from "../../review/AllReview";
import DetailCourse from "./DetailCourse";
import { modalAction, offlineCourseAction, onlineCourseActions } from "../../../../../redux/actions";
import ReviewForm from "../../review/ReviewForm";
import { sizeModal } from "../../../../modal/SizeModal";
import isMobile from "../../../../isMobile/isMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FormEnroll from "./FormEnroll";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import { trackImpressCourseDetail } from "../../../../../analytic/Analytic";
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
const { useBreakpoint } = Grid;

export default function OfflineCourse() {
    const { offlineCourse, onlineCourse, auth } = useSelector(state => state)
    const { reviews } = useSelector(state => state.review)
    const [course, setCourse] = useState(null)
    const owner = (!isEmpty(course) && auth) && (auth.profile === course.owner.id)
    const [showReview, setShowReview] = useState(true)
    const dispatch = useDispatch()
    const screens = useBreakpoint();
    const params = useParams();
    const isOfflineCourse = params.type === "course"
    const learn_status = (auth.role === 1 && course && isOfflineCourse) ? course.enrolled : false
    const idCourse = params.id
    const myReview = !isEmpty(reviews) ? reviews.filter(value => value.reviewer.id === auth.profile)[0] : []

    useEffect(() => {
        if (isOfflineCourse) {
            dispatch(offlineCourseAction.getOfflineCourse(idCourse))
        } else {
            dispatch(onlineCourseActions.getOnlineCourse(idCourse))
        }

        if (!owner) {
            trackImpress()
        }

        return () => {
            dispatch(offlineCourseAction.clearOfflineCourse())
            dispatch(onlineCourseActions.clearListOnlineCourse())
        }
    }, [])

    useEffect(() => {
        if (isOfflineCourse) {
            setCourse(offlineCourse.data && offlineCourse.data)
        } else {
            setCourse(onlineCourse.data && onlineCourse.data)
        }
    }, [onlineCourse, offlineCourse])


    const trackImpress = () => {
        const courseType = 1
        if (idCourse?.isSafeNotBlank()) {
            trackImpressCourseDetail(idCourse, courseType)
        }
    }

    const ContactTutor = () => {
        return (
            <div className={!screens.lg ? style.subProfile : null}>
                {
                    (screens.lg && !isOfflineCourse) && (
                        <Fragment>
                            <Link to={`/tutor/online/${idCourse}`}>
                                <Button
                                    className="buttonColor backgroundOrange"
                                    shape="round"
                                    size="middle"
                                    style={{ width: "100%" }}>
                                    ดูบทเรียน
                                    </Button>
                            </Link>
                            <Link to={`/tutor/online/${idCourse}/edit`} >
                                <div style={{ marginTop: "0.5rem" }}>
                                    <Button
                                        className="buttonColor backgroundGray"
                                        shape="round"
                                        size="middle"
                                        style={{ width: "100%" }}>
                                        แก้ไขคอร์สเรียน
                                </Button>
                                </div>
                            </Link>
                        </Fragment>
                    )
                }
                <div className={isMobile() ? style.subProfile : style.backgroungContact} >
                    <div className={style.marginTop20}>
                        <span className={style.titleH3}>ช่องทางสอบถามข้อมูล</span>
                    </div>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faPhoneAlt} className={style.iconmarker} />
                        {
                            course ? (
                                // <span className={style.textNormal}>{course && course.owner.contact.phoneNumber}</span>
                                <span>xxx-xxxx-xxxx</span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </div>
                    {
                        course && (
                            <div className={style.marginTop20}>
                                <Link to={`/profile/${course.owner.id}/course`}>
                                    <Button
                                        className="buttonColor backgroundBlue"
                                        shape="round"
                                        size="middle"
                                        style={{ width: "100%" }}>
                                        ดูข้อมูลครูสอนพิเศษเพิ่มเติม
                                </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    const switchComponent = (status) => {
        document.getElementById("switchComponent").scrollIntoView({ behavior: "smooth" })
        setShowReview(status)
    }

    const switchShow = () => {
        if (!isMobile() || showReview) {
            return <AllReview />
        } else {
            return <ContactTutor />
        }

    }

    const enrollCourse = () => {
        if (!auth.isAuthenticated) {
            window.location.href = "/login"
        } else {

            const dataEnroll = !isEmpty(course) && {
                id: course.id,
                name: course.name,
                subject: course.subject.title,
                grade: course.grade.title,
                owner: "Xxxx"
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
                <Row className={style.container} justify="space-between" style={{ paddingBottom: "7.5rem" }}>
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
                    (learn_status && isEmpty(myReview)  && !screens.lg ) && (
                        <div className={screens.md ? style.navbarBottomMD : style.navbarBottom } >
                            <button className={style.reviewbottom} onClick={() => handleOpenReviewForm()} >ให้คะแนนการสอนนี้</button>
                        </div>
                    )
                }

                {
                    (owner && !screens.lg) && (
                        <div className={!screens.md ? style.navbarBottom : style.navbarBottomMD}>
                            {isOfflineCourse ? (
                                <Link to={`/tutor/course/${course.id}/enroll`}>
                                    <button className={style.leftbuttom} >อนุมัติคำขอ</button>
                                </Link>
                            ) : (
                                <Link to={`/tutor/online/${idCourse}`}>
                                    <button className={style.leftbuttom} >จัดการบทเรียน</button>
                                </Link>

                            )
                            }
                            <Link to={`/tutor/${params.type}/${idCourse}/edit`}>
                                <button className={style.rightbottom} >แก้ไข</button>
                            </Link>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}