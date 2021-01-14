import React from 'react'
import { Col, Row, Grid, Divider } from 'antd'
import style from '../styles.module.scss'
import ProfileDetail from './ProfileDetail'
import ProfileIdentity from './ProfileIdentity'
const { useBreakpoint } = Grid;

export default function ProfileTutor() {
    const screens = useBreakpoint();
    console.log(screens)
    return (
        <Row className={style.body}>
            <Col xs={24} sm={16} md={10} lg={9} xl={8} >
                <ProfileDetail />
            </Col>
            {
                !screens.md ? null 
                    :
                    <Col md={2} lg={2} xl={2}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
            }
            <Col xs={24} sm={16} md={12} lg={12} xl={12} >
                <ProfileIdentity />
            </Col>
        </Row>
    )
}
