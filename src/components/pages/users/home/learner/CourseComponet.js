import React from "react"
import { Link } from "react-router-dom";
import CardCourseLearner from "../../../../card/CardCourseLearner";
import { color } from "../../../../defaultValue";
import style from "../styles.module.scss"

export default function CourseComponet({ title, array }) {

    return (
        <div style={{ overflow: "hidden" }}>
            <div className={style.flexRow}>
                <span className={style.titleH3}>{title}</span>
                <Link to={`/rank/online`}>
                    <span className={style.paddingLeft} style={{color : color.black}}>ดูเพิ่มเติม</span>
                </Link>

            </div>
            <div className={`${style.scroll} ${style.paddingTop}`}>
                <div className={style.row}>
                    {
                        array && array.map((item) => (
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
