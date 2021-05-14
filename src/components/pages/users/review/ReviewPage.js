import { Row, Col, Grid } from "antd"
import React, { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../headerMobile/Header";
import AllReview from "./AllReview";
import DetailCourse from "./DetailCourse";
import ModalComponent from "../../../modal/ModalComponent"
import style from "./styles.module.scss"
import { modalAction } from "../../../../redux/actions/modal.actions"
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm from "./ReviewForm";
import { offlineCourse } from "../../../../redux/actions";
import HeaderVerizontal from "../../../headerVerizontal/HeaderVerizontal";
import { useParams } from "react-router";
import isMobile from "../../../isMobile/isMobile";

const { useBreakpoint } = Grid;

export default function ReviewPage() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const params = useParams();
    const course = useSelector(state => state.offlineCourse.data)
    const auth = useSelector(state => state.auth.status)
    const owner = (course && auth) && (auth.id === course.owner.id)
    const learn_status = false
    const type = "course"
    const idCourse = params.id

    const fetchCourse = useCallback(() => {
        dispatch(offlineCourse.getOfflineCourse(idCourse))
    }, [dispatch])

    useEffect(() => {
        fetchCourse()
    }, [fetchCourse])

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
                <div className={isMobile() ? style.bodymobileprofile : `${style.bodyEdit} `}>
                    {
                        (screens.md) && (
                            <div className={style.profile}  >
                                <HeaderVerizontal mainPage={true} review={true} data={course && course.owner} />
                            </div>
                        )
                    }
                    <Row className={!screens.md && style.paddingTopBody}>
                        <Col className={screens.xs || (screens.sm && !screens.md) ? style.paddingBottomBody : `${style.paddingbody} ${style.paddingBottomBody}`} xl={9} lg={9} md={10} sm={24} xs={24} >
                            <DetailCourse mainPage={true} />
                        </Col>
                        <Col xl={13} lg={13} md={12} sm={24} xs={24} >
                            <AllReview />
                        </Col>
                    </Row>
                </div>
                {
                    (!learn_status && !screens.md) && (
                        <div className={style.navbarBottom}>
                            <button className={style.leftbuttom} >สมัครเรียน</button>
                            <button className={style.rightbottom} >ถามข้อมูล</button>
                        </div>
                    )
                }
                {
                    (learn_status && !screens.md) && (
                        <div className={style.navbarBottom} >
                            <button className={style.reviewbottom} onClick={() => handleOpenReviewForm()} >ให้คะแนนการสอนนี้</button>
                        </div>
                    )
                }

                {
                    (owner && !screens.md) && (
                        <div className={style.navbarBottom}>
                            { type === "course" ? (
                                <button className={style.leftbuttom} >อนุมัติคำขอ</button>
                            ) : (
                                <button className={style.leftbuttom} >จัดการบทเรียน</button>
                            )
                            }
                            <button className={style.rightbottom} >แก้ไข</button>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}
