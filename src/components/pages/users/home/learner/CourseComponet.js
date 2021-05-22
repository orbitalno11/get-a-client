import React from "react"
import { Link } from "react-router-dom";
import CardCourseLearner from "../../../../card/CardCourseLearner";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../defaultValue";
import isMobile from "../../../../isMobile/isMobile";
import style from "../styles.module.scss"

export default function CourseComponet({ title, array }) {

    return (
        <div style={{ overflow: "hidden" }}>
            <div className={style.flexRow}>
                <div className={isMobile() ? style.paddingbody : null}>
                    <span className={style.titleH2}>{title}</span>
                    <Link to={`/rank/online`} >
                        <u className={style.paddingLeft} style={{ color: color.black }}>ดูเพิ่มเติม</u>
                    </Link>
                </div>

            </div>
            <div className={`${style.scroll} ${style.paddingTop}`}>
                <div className={style.row}>
                    {
                        !isEmpty(array) && array.map((item) => (
                            <div key={item.id} style={{ padding: "0.5rem" }}>
                                <CardCourseLearner data={item} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
