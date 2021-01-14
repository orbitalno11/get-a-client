import React from 'react'
import { Col, Row, Grid, Divider } from 'antd'
import style from '../../styles.module.scss'
import ProfileDetail from './ProfileDetail'
import ProfileCoruse from './ProfileCoruse'
const { useBreakpoint } = Grid;

export default function ProfileLearner() {
    const screens = useBreakpoint();
    console.log(screens)
    return (
        <Row className={style.body}>
            <Col xs={24} sm={18} md={10} lg={9} xl={8} >
                <ProfileDetail />
            </Col>
            {
                !screens.md ? null 
                    :
                    <Col lg={1} xl={2}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
            }
            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                <ProfileCoruse />
            </Col>
        </Row>
    )
}
