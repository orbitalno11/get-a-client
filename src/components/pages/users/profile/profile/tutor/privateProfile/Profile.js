import React, { Fragment, useCallback, useEffect } from "react"
import { Col, Row, Grid, Divider } from "antd"
import style from "../../../styles.module.scss"
import ProfileDetail from "./ProfileDetail"
import ProfileIdentity from "./ProfileIdentity"
import Header from "../../../../../../headerMobile/Header"
import { useDispatch } from "react-redux"
import { getProfile } from "../../../../../../../redux/actions/profileActions";
const { useBreakpoint } = Grid;

export default function ProfileTutor() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()

    const fetchProfile = useCallback(() => {
        dispatch(getProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (
        <Fragment>
            {screens.xs || (screens.sm && !screens.md) ? <Header title="โปรไฟล์" /> : null}
            <Row className={style.body}>
                <Col xs={24} sm={24} md={11} lg={9} xl={8} >
                    <ProfileDetail />
                </Col>
                {
                    screens.md &&
                    (
                        <Col md={1} lg={2} xl={3} className={style.alignCenter}>
                            <Divider type="vertical" style={{ height: "100%" }} />
                        </Col>
                    )
                }
                <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                    <ProfileIdentity />
                </Col>
            </Row>
        </Fragment>
    )
}
