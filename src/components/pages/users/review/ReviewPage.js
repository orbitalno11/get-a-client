import { Row, Col, Grid } from "antd"
import React, { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getHandleProfile } from "../../../../redux/actions/profile.actions";
import Header from "../../../headerMobile/Header";
import ProfileIntroduce from "../profile/profile/tutor/pubileProfile/ProfileIntroduce";
import AllReview from "./AllReview";
import DetailCourse from "./DetailCourse";
import ModalComponent from "../../../modal/ModalComponent"
import style from "./styles.module.scss"
import { modalAction } from "../../../../redux/actions/modal.actions"
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm from "./ReviewForm";

const { useBreakpoint } = Grid;

export default function ReviewPage() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const learn_status = false
    const status = "learner"
    const type = "course"

    const fetchProfile = useCallback(() => {
        dispatch(getHandleProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const handleOpenReviewForm = () => {
        dispatch(modalAction.openModal({
            body: <ReviewForm />,
            size: sizeModal.default,
        }))
    }

    return (
        <Fragment>
            <ModalComponent />
            {(screens.xs || (screens.sm && !screens.md)) && <Header pageBack="goback" />}
            <div className={screens.xs || (screens.sm && !screens.md) ? style.bodymobileprofile : style.bodyEdit}>
                {
                    screens.md && (
                        <div className={style.profile}  >
                            <ProfileIntroduce mainPage={true} review={true} />
                        </div>
                    )
                }
                <Row className={!screens.md && style.paddingTopBody}>
                    <Col className={screens.xs || (screens.sm && !screens.md) ? null : style.paddingbody} xl={9} lg={9} md={10} sm={24} xs={24} >
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
                (status === "tutor" && !screens.md) && (
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
        </Fragment>
    )
}
