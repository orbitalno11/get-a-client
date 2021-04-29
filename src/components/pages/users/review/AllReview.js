import React, { Fragment } from 'react'
import CardReview from "../../../card/CardReview"
import { Button, Col, Grid, Row } from "antd"
import style from "./styles.module.scss"
import { useDispatch } from "react-redux";
import { modalAction } from "../../../../redux/actions";
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm from "./ReviewForm";
const { useBreakpoint } = Grid;

export default function AllReview() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const learn_status = false
    const status = "tutor"
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
                    <CardReview />
                </div>
                {
                    (status !== "tutor" && screens.md)  && (
                        <Col className={`${style.marginTop20} ${style.alignCenter}`}>
                            <Button className="buttonColor backgroundOrange" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>สมัครเรียน</Button>
                            <Button className="buttonColor backgroundBlue" shape="round" size="large" onClick={() => { handleOpenReviewForm() }} style={paddingButton}>สอบถามข้อมูล</Button>
                        </Col>
                    )
                }

                {
                    (status === "tutor" && screens.md) && (
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
