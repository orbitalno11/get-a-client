import { Divider } from "antd";
import React from "react"
import { Link } from "react-router-dom";
import CardCourseLearner from "../../../../card/CardCourseLearner";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../defaultValue";
import isMobile from "../../../../isMobile/isMobile";
import style from "../styles.module.scss"
import SliderComponent from "./SliderComponent";

export default function CourseComponet({ title, array, type }) {

    const cardHome = () => {
        return (
            !isEmpty(array) && array.map((item) => (
                <div align="center" className={`${style.fullWidth} ${style.cursor} ${style.paddingCardShow}`} key={item.id} >
                    <CardCourseLearner data={item} type={type} />
                </div>
            )))
    }

    return (
        <div className={style.section} style={{ overflow: "hidden" }}>
            <div className={style.flexRow}>
                <div className={isMobile() ? style.paddingbody : null}>
                    <span className={style.titleH2}>{title}</span>
                    <Link to={`/popular/${type}`} >
                        <u className={style.marginLeftOneHalf} style={{ color: color.black }}>ดูเพิ่มเติม</u>
                    </Link>
                </div>
            </div>
            <Divider />
            <div className={style.paddingListSlider}>
                <SliderComponent data={cardHome()} card />
            </div>
        </div>
    )
}