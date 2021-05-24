import React, { Fragment } from 'react'
import CardReview from "../../../card/CardReview"
import { Col, Row } from "antd"
import style from "./styles.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { modalAction, reviewActions } from "../../../../redux/actions";
import { sizeModal } from "../../../modal/SizeModal";
import ReviewForm, { DeleteForm } from "./ReviewForm";
import { useParams } from "react-router-dom";
import EmptyImage from "../../../loading/EmptyImage";
import { useEffect } from "react";
import isEmpty from "../../../defaultFunction/checkEmptyObject";

export default function AllReview() {
    const dispatch = useDispatch()
    const { id, videoId } = useParams()
    const { offlineCourse, auth, review, onlineCourse  } = useSelector(state => state)
    const course = videoId ? (onlineCourse.clip && onlineCourse.data) : (offlineCourse.data && offlineCourse.data)
    const owner = (course && auth) && (auth.profile === course.owner.id)

    const reviewList = !isEmpty(review.reviews) ? review.reviews.filter(value => value.owner !== true) : []
    const myReview = !isEmpty(review.reviews) ? review.reviews.filter(value => value.owner === true)[0] : []

    useEffect(() => {
        if(videoId){
            dispatch(reviewActions.getReviewClip(videoId))
        }else{
            dispatch(reviewActions.getReviewByCourse(id, 1))
        }
       
        return()=>{
            dispatch(reviewActions.clearReview())
        }
    }, [])

    const handleOpenReviewForm = (id, action) => {
        if (action !== "delete") {
            dispatch(modalAction.openModal({
                body: <ReviewForm idReview={id} />,
                size: sizeModal.default,
            }))
        }else{
            dispatch(modalAction.openModal({
                body : <DeleteForm idReview={id} type="review"/>,
                size: sizeModal.default
            }))
        }
       
    }

    return (
        <Fragment>
                <div>
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
        </Fragment>
    )
}