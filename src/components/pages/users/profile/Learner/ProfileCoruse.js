import { Col, Row, Typography, Grid } from 'antd';
import React from 'react'
import TabHorizontal from '../../../../tab/TabHorizontal'
import CardCorses from '../../../../card/CardCorse'
import style from '../styles.module.scss'

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileCoruse() {
    const screens = useBreakpoint();
    const tabStart = [{
        key:"tutor",
        name:"Tutor"
    }]

    const tabDetail = [
        {
            key:"tutor",
            name:"Tutor"
        },
        {
            key:"course",
            name:"Course"
        },
    ]
    return (
        <div className={screens.lg?null:style.subProfile}>
            <Title level={screens.lg?3:5}>คอร์สที่เคยเรียน</Title>
            <TabHorizontal tabStart={tabStart} tabDetail={tabDetail}/>
            <Row justify="space-between" className={style.alignCenter}>
                <Col  xl={11}  md={16} sm={16}  xs={22} className={style.padding}>
                <CardCorses/>
                </Col>
                <Col  xl={11}  md={16} sm={16} xs={22}className={style.padding}>
                <CardCorses/>
                </Col>
            </Row>
        </div>
    )
}
