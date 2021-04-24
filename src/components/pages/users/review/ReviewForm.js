import { yupResolver } from "@hookform/resolvers/yup";
import { Rate } from "antd"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { reviewSchema } from "../../../../validation/review/reviewSchema";
import style from "./styles.module.scss"

export default function ReviewForm() {
    const [rate, setRate] = useState(5)
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(reviewSchema),
    });

    const handleChangeRate = (value) => {
        setRate(value)
    }

    const textarea = {
        resize: "none",
        marginTop: "1rem",
        marginBottom: "1rem",
        border: '0.15rem solid #F26419'
    }

    const onSubmit = () => {

    }

    return (
        <div className={style.textCenter}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className={style.titleH2}>ความคิดเห็น</p>
                <Rate allowHalf className={style.titleH2} onChange={handleChangeRate} defaultValue={rate} />
                <input name="rate" defaultValue={rate} ref={register} hidden />
                {
                    errors.rate && <p className="error-input">{errors.rate.message}</p>
                }
                <textarea name="comment"  className="input" rows="8" style={textarea} ref={register} />
                {
                    errors.comment && <p className="error-input">{errors.comment.message}</p>
                }
                <button className={style.reviewbottom} type="submit">ตกลง</button>
            </form>
        </div>
    )
}

