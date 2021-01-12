import { Col, Row, Grid } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardCorseTutor from '../../../../../../card/CardCorseTutor'
import style from '../../../styles.module.scss'
const { useBreakpoint } = Grid;

export default function ProfileCorse() {
    const screens = useBreakpoint();
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

    return (
        <Fragment>
            <div className={style.marginTop}>
                <Row justify="space-around" align="middle" className={screens.xs || (screens.sm && !screens.md) ? style.paddingbody : style.contrainnerProfilePubile}>
                    <Col span={24}>
                        <Title level={4}>วิชาที่สอน</Title>
                    </Col>
                    <Col xs={24} sm={20} md={23} lg={20} xl={12} className={style.padding}>
                        <CardCorseTutor />
                    </Col>
                    <Col xs={24} sm={20} md={23} lg={20} xl={12} className={style.padding}>
                        <CardCorseTutor />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
