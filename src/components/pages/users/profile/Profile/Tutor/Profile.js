import React from 'react'
import { Col, Row, Grid, Divider } from 'antd'
import style from '../../styles.module.scss'
import ProfileDetail from './ProfileDetail'
import ProfileIdentity from './ProfileIdentity'
const { useBreakpoint } = Grid;

export default function ProfileTutor() {
    const screens = useBreakpoint();
    console.log(screens)
    return (
        <Row className={style.body}>
            <Col xs={24} sm={24} md={11} lg={9} xl={8} >
                <ProfileDetail />
            </Col>
            {
                !screens.md ? null 
                    :
                    <Col md={1} lg={2} xl={2}  className={style.alignCenter}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
            }
            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                <ProfileIdentity />
            </Col>
        </Row>
    )
}
