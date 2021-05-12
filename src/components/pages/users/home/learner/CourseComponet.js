import React from "react"
import CardCourseLearner from "../../../../card/CardCourseLearner";
import style from "../styles.module.scss"

export default function CourseComponet({ title, array }) {

    return (
        <div>
            <div className={style.flexRow}>
                <span className={style.titleH3}>{title}</span>
                <span className={style.paddingLeft}>ดูเพิ่มเติม</span>
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
