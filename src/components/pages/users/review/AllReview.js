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
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function AllReview({vdo}) {
    const dispatch = useDispatch()
    const { id, videoId, type } = useParams()
    const { offlineCourse, auth, review, onlineCourse, loading } = useSelector(state => state)
    const course = videoId ? (onlineCourse.clip && onlineCourse.data) : (offlineCourse.data && offlineCourse.data)
    const owner = (course && auth) && (auth.profile === course.owner.id)
    const isCourse = type === "course"
    const reviewList = !isEmpty(review.reviews) ? review.reviews.filter(value => value.owner !== true) : []
    const myReview = !isEmpty(review.reviews) ? review.reviews.filter(value => value.owner === true)[0] : []
    const screens = useBreakpoint();

    useEffect(() => {
        if (videoId) {
            dispatch(reviewActions.getReviewClip(videoId))
        } else {
            if (!isEmpty(offlineCourse.data) || !isEmpty(onlineCourse.data)) {
                dispatch(reviewActions.getReviewByCourse(id, isCourse ? offlineCourse?.data?.type : 3))
            }
        }
        return () => {
            dispatch(reviewActions.clearReview())
        }
    }, [offlineCourse.data, onlineCourse.data, type])

    const handleOpenReviewForm = (id, action) => {
        if (action !== "delete") {
            dispatch(modalAction.openModal({
                body: <ReviewForm idReview={id} />,
                size: sizeModal.default,
            }))
        } else {
            dispatch(modalAction.openModal({
                body: <DeleteForm idReview={id} type="review" />,
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
                                    <CardReview data={myReview} myReview={true} handleEdit={handleOpenReviewForm} vdo={vdo && vdo}/>
                                </Col>
                            }
                            {!isEmpty(reviewList) && reviewList.map((item, index) => (
                                <Col span={24} key={index} >
                                    <CardReview data={item} myReview={false} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        !loading.loading && (
                            <div className={`${screens.md && style.section} ${style.marginSection}`} align="center">
                                <EmptyImage size="default" />
                                <p className={style.textOne25}>บทเรียนนี้ยังไม่มีผู้แสดงความคิดเห็น&nbsp;
                                    {
                                        owner ? " อย่าลืมบอกให้นักเรียนมาแสดงคิดเห็นกันนะ" : "สมัครเรียนเพื่อแสดงความคิดเห็นสิ"
                                    }
                                </p>
                            </div>
                        )
                    )
                }
            </div>
        </Fragment>
    )
}