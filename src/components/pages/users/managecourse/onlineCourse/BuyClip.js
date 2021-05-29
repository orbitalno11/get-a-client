import { Spin } from "antd";
import React from "react"
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { onlineCourseActions } from "../../../../../redux/actions";
import buttonFull from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import style from "../styles.module.scss";

export default function BuyClip({ title, coin }) {
    const { videoId } = useParams()
    const dispatch = useDispatch()
    const onHandleBuyCourse = () => {
        dispatch(onlineCourseActions.buyClip(videoId))
    }

    const loading = useSelector(state => state.loading)
    const { buySuccess } = useSelector(state => state.onlineCourse)

    return (
        <div align="center">
            <span>คุณต้องการซื้อคลิปการสอน {title && title} </span>
            <p>ในราคา {coin && coin} เหรียญ</p>
            <button id="reviewForm" className={style.buttonColor} style={buttonFull(color.orange)} onClick={() => onHandleBuyCourse()}>
                {
                    loading.loading && (
                        <Fragment>
                            <Spin style={{ marginRight: "0.5rem" }} />
                            <span> กำลัง</span>
                        </Fragment>
                    )
                }
                ซื้อคลิปการสอน
                {
                    !loading.loading && (
                        buySuccess ? "สำเร็จ" : "ไม่สำเร็จ"
                    )
                }
            </button>
        </div>
    )
}
