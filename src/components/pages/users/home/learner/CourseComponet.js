import { Grid, Typography } from "antd";
import React from "react"
import CardCorseLearner from "../../../../card/CardCorseLearner";
import { chunksArray, SliderComponent } from "../../../../slider/SliderComponent";
import style from "../styles.module.scss"
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function CourseComponet({ title, link, array }) {

    const screens = useBreakpoint();

    const componentListTutor = () => {
        let size = 2
        if (screens.lg) {
            size = 3
        } else {
            if (!screens.md) {
                size = 1
            } else {
                size = 2
            }
        }

        const chunksArrays = chunksArray(array, size)

        return (
            chunksArrays && chunksArrays.map((item, index) => (
                <div key={index} className={style.row}>
                    {
                        item && item.map((item1, index) => (
                            <div className={!screens.md ? !screens.sm ? (style.paddingCoruseCardXS) : (style.paddingCoruseCardSM) : (style.paddingCoruseCard)} key={index}>
                                <CardCorseLearner data={item1} />
                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    return (
        <div>
            <div className={style.flexRow}>
                <Title level={3}>{title}</Title>
                <span className={style.paddingLeft}>ดูเพิ่มเติม</span>
            </div>
            <div className={style.paddingTop}>
                <SliderComponent dot={false} item={componentListTutor()} />
            </div>
        </div>
    )
}
