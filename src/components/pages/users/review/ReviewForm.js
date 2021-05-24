import React, { Fragment } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Rate, Spin } from "antd"
import { Controller, useForm } from "react-hook-form";
import { reviewSchema } from "../../../../validation/review/reviewSchema";
import { color } from "../../../defaultValue";
import style from "./styles.module.scss"
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { reviewActions } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import isEmpty from "../../../defaultFunction/checkEmptyObject";
import { useEffect } from "react";

export function DeleteForm({ idReview }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { loading } = useSelector(state => state.loading)
    const styleWarningText = {
        color: color.red,
    }

    const buttonDelete = {
        width : "100%",
        marginTop : "1rem"
    }

    const handleDeleteComment = () => {
        dispatch(reviewActions.deleteReviewByCourse(idReview, 1,id))
    }

    return (
        <div align="center">
            <h3 className={style.titleH4}>
                ยืนยันการลบความคิดเห็นของบทเรียนนี้
            </h3>
            <p style={styleWarningText}>หากลบความคิดเห็นแล้วจะไม่สามารถกู้ความมเห็นคืนได้</p>
            <Button  className="buttonColor backgroundRed" style={buttonDelete} id="reviewForm" shape="round" onClick={()=>handleDeleteComment()} disabled={loading ? true : false}>
                {
                    loading && (
                        <Fragment>
                            <Spin style={{ marginRight: "0.5rem" }} /> กำลัง
                        </Fragment>
                    )
                }
                    ลบความคิดเห็นนี้
                </Button>
        </div>
    )
}

export default function ReviewForm({ idReview }) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.loading)
    const { review, modal } = useSelector(state => state)
    const myReview = review.reviews && review.reviews.filter((item) => item.id === idReview)[0]
    const { register, handleSubmit, errors, control, reset } = useForm({
        resolver: yupResolver(reviewSchema),
    });

    useEffect(() => {
        console.log(!isEmpty(idReview) && !isEmpty(myReview))
        reset({
            "rate": (!isEmpty(idReview) && !isEmpty(myReview)) ? myReview.rating : "5",
            "comment": (!isEmpty(idReview) && !isEmpty(myReview)) ? myReview.review : ""
        })
    }, [idReview, modal.status])

    const textarea = {
        resize: "none",
        marginTop: "1rem",
        marginBottom: "1rem",
        border: `0.15rem solid ${color.orange}`
    }
    console.log(isEmpty(idReview) ? "created " : "update")
    const onSubmit = (data) => {
        if (data) {
            const formData = {
                "courseId": id,
                "reviewId": profile,
                "rating": data.rate,
                "comment": data.comment,
                "isClip": false,
                courseType: 1
            }
           

            if (isEmpty(idReview)) {
                dispatch(reviewActions.createReview(formData))
            } {
                dispatch(reviewActions.updateReview(formData))
            }

        }
    }

    return (
        <div align="center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <span className={style.titleH2}>ความคิดเห็น</span>
                <br />
                <Controller
                    as={
                        <Rate allowHalf name="rate" className={style.rate} />
                    }
                    name="rate"
                    control={control}
                    defaultValue=""
                />
                {
                    errors.rate && <p className="error-input">{errors.rate.message}</p>
                }
                <textarea name="comment" className="input" rows="8" style={textarea} ref={register} placeholder="ความคิดเห็นในบทเรียนนี้" />
                {
                    errors.comment && <p className="error-input">{errors.comment.message}</p>
                }
                <button id="reviewForm" className={style.reviewbottom} type="submit">
                    {
                        loading && (
                            <Fragment>
                                <Spin style={{ marginRight: "0.5rem" }} /> กำลัง
                            </Fragment>
                        )
                    }
                    ส่งคำขอ
                </button>
            </form>
        </div>
    )
}

