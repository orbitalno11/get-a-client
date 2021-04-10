import React, { Fragment } from 'react'
import CardReview from "../../../card/CardReview"
import { Button, Col, Grid, Row } from "antd"
import style from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../redux/actions";
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm from "./ReviewForm";
const { useBreakpoint } = Grid;

export default function AllReview() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const course = useSelector(state => state.offlineCourse.data)
    const auth = useSelector(state => state.auth.status)
    const learn_status = auth.role === 1
    const status = false
    const owner = (course && auth) && (auth.id === course.owner.id)
    const review =course&&course.review
    const type = "course"

    const handleOpenReviewForm = () => {
        dispatch(modalAction.openModal({
            body: <ReviewForm />,
            size: sizeModal.default,
        }))
    }

    const paddingButton = {
        margin: '0rem 0.5rem 0rem 0.5rem'
    }

    return (
        <Fragment>
            <div className={!screens.md ? style.subProfile : null}>
                <Row>
                    <Col className={!screens.md ? style.TitleCoin : null}>
                        <span className={screens.md ? style.titleH2 : style.titleH5}>ความเห็นจากผู้เรียนจริง</span>
                    </Col>
                    {
                        learn_status && screens.md && (
                            <Col style={{ marginLeft: 'auto' }}>
                                <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }}>ให้คะแนน</Button>
                            </Col>
                        )
                    }
                </Row>
                <div className={style.marginTop20}>
                    {
                        review&&review.length ? (
                            <CardReview data={review} />
                        ):
                        (
                            <span className={style.textNormal}>บทเรียนนี้ยังไม่มีผู้แสดงความคิดเห็น</span>
                        )
                        
                    }

                </div>
                {
                    (!status && !owner && screens.md) && (
                        <Col className={`${style.marginTop20} ${style.alignCenter}`}>
                            <Button className="buttonColor backgroundOrange"  shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>สมัครเรียน</Button>
                            <Button className="buttonColor backgroundBlue" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>สอบถามข้อมูล</Button>
                        </Col>
                    )
                }

                {
                    (owner && screens.md) && (
                        <Col className={`${style.marginTop20} ${style.alignCenter}`}>
                            { type === "course" ? (
                                <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>อนุมัติคำขอ</Button>
                            ) : (
                                <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>จัดการบทเรียน</Button>
                            )
                            }
                            <Button className="buttonColor backgroundBlue" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>แก้ไข</Button>
                        </Col>
                    )
                }
            </div>
        </Fragment>
    )
}
