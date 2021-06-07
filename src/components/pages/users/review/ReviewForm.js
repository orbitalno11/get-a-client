import React, { Fragment } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Rate } from "antd"
import { Controller, useForm } from "react-hook-form";
import { reviewSchema } from "../../../../validation/review/reviewSchema";
import { color } from "../../../defaultValue";
import style from "./styles.module.scss"
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { modalAction, onlineCourseActions, reviewActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import isEmpty from "../../../defaultFunction/checkEmptyObject";
import { useEffect } from "react";
import { styleComponent } from "../../../defaultFunction/style";

export function DeleteForm({ idReview, type }) {
    const dispatch = useDispatch()
    const { id, courseId, videoId } = useParams()
    const { loading } = useSelector(state => state.loading)
    const offlineCourse = useSelector(state => state.offlineCourse)

    const text = type === "review" ? "ความคิดเห็น" : "คลิปการสอน"
    const styleWarningText = {
        color: color.red,
    }

    const handleDeleteComment = () => {
        if (type === "review") {
            if (videoId) {
                dispatch(reviewActions.deleteReviewByCourse(idReview, 3, courseId, videoId))
            } else {
                dispatch(reviewActions.deleteReviewByCourse(idReview, offlineCourse?.data?.type, id))
            }
        } else {
            dispatch(modalAction.closeModal())
            dispatch(onlineCourseActions.deleteClip(courseId, videoId))
        }
    }

    return (
        <div align="center">
            <h3 className={style.headerTwo25}>
                ยืนยันการลบ{text}ของบทเรียนนี้
            </h3>
            <p className={style.textOne25} style={styleWarningText}>หากลบ{text}แล้วจะไม่สามารถกู้{text}ได้</p>
            <Button size={"middle"} className={`${style.buttonColor} ${style.textOne25} ${style.marginSection}`} style={styleComponent.buttonFull(color.red)} htmlType="submit" disabled={loading ? true : false} onClick={() => handleDeleteComment()}>
                {
                    loading && (
                        <Fragment>
                            <styleComponent.spinLoading />
                            <span>กำลัง</span>
                        </Fragment>
                    )
                }
            ลบ{text}นี้
            </Button>
        </div>
    )
}

export default function ReviewForm({ idReview }) {
    const { id, videoId, courseId } = useParams()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.loading)
    const { review, modal, offlineCourse } = useSelector(state => state)
    const myReview = review.reviews && review.reviews.filter((item) => item.owner === true)[0]
    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(reviewSchema),
    });

    useEffect(() => {
        reset({
            "rate": (!isEmpty(myReview)) ? myReview.rating : "0",
            "comment": (!isEmpty(myReview)) ? myReview.review : ""
        })
    }, [idReview, modal.status])

    const textarea = {
        resize: "none",
        marginTop: "1rem",
        marginBottom: "0.5rem",
        border: `0.15rem solid ${color.orange}`,
        paddingTop: "0.75rem"
    }

    const onSubmit = (data) => {
        if (data) {
            if (isEmpty(idReview)) {
                const formData = {
                    "courseId": videoId ? courseId : id,
                    "rating": data.rate,
                    "comment": data.comment,
                    "isClip": videoId ? true : false,
                    "clipId": videoId && videoId,
                    "courseType": videoId ? 3 : offlineCourse.data.type
                }
                dispatch(reviewActions.createReview(formData))
            } else {
                const formData = {
                    "courseId": videoId ? courseId : id,
                    "reviewId": idReview,
                    "rating": data.rate,
                    "comment": data.comment,
                    "isClip": videoId ? true : false,
                    "clipId": videoId && videoId,
                    "courseType": videoId ? 3 : offlineCourse.data.type
                }
                dispatch(reviewActions.updateReview(formData))
            }
        }
    }

    return (
        <div align="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span className={style.headerTwo5}>ความคิดเห็น</span>
                </div>
                <Controller
                    as={
                        <Rate name="rate" className={style.rate} />
                    }
                    name="rate"
                    control={control}
                    defaultValue=""
                />
                {
                    errors.rate && <p className="error-input">{errors.rate.message}</p>
                }
                <textarea name="comment" className="input" rows="6" style={textarea} ref={register} placeholder="ความคิดเห็นในบทเรียนนี้" />
                {
                    errors.comment && <p className="error-input">{errors.comment.message}</p>
                }
                <Button className={`${style.buttonColor} ${style.textOne25}`} style={styleComponent.buttonFull(color.orange)} htmlType="submit" disabled={loading ? true : false}>
                    {
                        loading && (
                            <Fragment>
                                <styleComponent.spinLoading />
                                <span>กำลัง</span>
                            </Fragment>
                        )
                    }
                    ส่งความคิดเห็น
                </Button>
            </form>
        </div>
    )
}