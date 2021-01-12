import React from 'react'
import { Col, Row, Grid, Divider } from 'antd'
import style from '../styles.module.scss'
import ProfileDetail from './ProfileDetail'
import ProfileCoruse from './ProfileCoruse'
const { useBreakpoint } = Grid;

export default function ProfileDesktop() {
    const screens = useBreakpoint();
    console.log(screens)
    return (
        <Row className={style.body}>
            <Col xs={24} lg={8}  xl={8} >
                <ProfileDetail />
            </Col>
            {
                screens.xl ?
                    <Col xl={2}>
                        <Divider type="vertical" style={{ height: '100%' }} />
                    </Col>
                    : null
            }
            <Col xs={24} lg={14} xl={14} >
                <ProfileCoruse />
            </Col>
        </Row>
    )
}
