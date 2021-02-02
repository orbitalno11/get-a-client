import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { screen } from '@testing-library/react';
import { Button, Col, Grid, Row, Typography } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import CardCorseLearner from '../../../../card/CardCorseLearner';
import { chunksArray, SliderComponent } from '../../../../Slider/Slider';
import style from '../styles.module.scss'
const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function CourseComponet({ title, link, array }) {

    const screens = useBreakpoint();
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.removeEventListener('resize',setWidth(window.innerWidth))
    }, [window.innerWidth])

console.log(screens)
    const componentListTutor = () => {
        let size =  2
        if(width > '1240'){
            size = 3
        }else if(width < '1240') {
            if(!screens.md){
                size = 1
            }else{
                size = 2
            }
        }
        const chunksArrays = chunksArray(array, size)
        return (
            chunksArrays && chunksArrays.map((item, index) => (
                <div key={index} className={style.row}>
                    {
                        item && item.map((item1, index) => (
                            <div className={!screens.md ? !screens.sm ? (style.paddingCoruseCardXS) : (style.paddingCoruseCardSM)  : (style.paddingCoruseCard)} key={index}>
                                <CardCorseLearner data={item1} />
                            </div>
                        ))
                    }
                </div>
            )
            )
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
