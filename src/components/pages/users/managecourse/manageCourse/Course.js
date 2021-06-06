import { Row, Col, Grid, Button } from "antd"
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
import { faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FormEnroll from "./FormEnroll";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import { trackImpressCourseDetail } from "../../../../../analytic/Analytic";
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import ButtonReview from "./ButtonReview";
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
const { useBreakpoint } = Grid;

export default function Course() {
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
    console.log(myReview)
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


    const ContactTutor = () => {
        return (
            <div className={`${style.marginSection}`}>
                {/* online */}
                {
                    screens.lg && (
                        <ButtonReview
                            owner={owner}
                            isOfflineCourse={isOfflineCourse}
                            handleOpenReviewForm={handleOpenReviewForm}
                            enrollCourse={enrollCourse}
                            learn_status={learn_status}
                            typeShow="desktop"
                        />
                    )
                }
                <div className={`${style.section} ${style.marginSection}`}>
                    <div>
                        <div>
                            <span className={style.headerOne75}>ช่องทางสอบถามข้อมูล</span>
                        </div>
                        <div className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faMobileAlt} className={style.iconmarker} />
                            {
                                course?.owner.contact ? (
                                    <span className={style.textOne25}>{course && course.owner.contact.phoneNumber}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </div>
                        {
                            course && (
                                <div className={style.marginTopOne25}>
                                    <Link to={`/profile/${course.owner.id}/course`}>
                                        <Button
                                            className={`${style.buttonColor} ${style.textOne25}`}
                                            size="middle"
                                            style={styleComponent.buttonFull(color.blue)}>
                                            ดูข้อมูลครูสอนพิเศษเพิ่มเติม
                                    </Button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
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
            return (
                <Fragment>
                    <div className={`${screens.md && style.section} ${style.marginSection}`}>
                        <span className={style.headerOne75}>ความเห็นจากผู้เรียนจริง</span>
                    </div>
                    < AllReview />
                </Fragment>
            )
        } else {
            return <ContactTutor />
        }
    }

    return (
        <Fragment>
            {isMobile() && <Header pageBack={!owner ? "goback" : `/tutor/${params.type}`} />}
            <ModalComponent />
            <div className="container">
                <Row className={style.bodyPaddingTopBottom} justify="space-between" style={{ paddingBottom: "7.5rem" }}>
                    <Col className={`${!isMobile() && style.section}`} xl={24} lg={24} md={24} sm={24} xs={24} >
                        <DetailCourse />
                    </Col>
                    <Col xl={15} lg={15} md={24} sm={24} xs={24} id="switchComponent" >
                        {
                            switchShow()
                        }
                    </Col>
                    {
                        screens.lg && (
                            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                                <ContactTutor />
                            </Col>
                        )
                    }
                </Row>
            </div>
            {/* mobile and ipad screen */}
            {
                !screens.lg && (
                    <ButtonReview
                        owner={owner}
                        isOfflineCourse={isOfflineCourse}
                        handleOpenReviewForm={handleOpenReviewForm}
                        enrollCourse={enrollCourse}
                        learn_status={learn_status}
                        showReview={showReview}
                        switchComponent={switchComponent}
                        myReview={myReview}
                        typeShow="mobile"
                    />
                )
            }
        </Fragment>
    )
}