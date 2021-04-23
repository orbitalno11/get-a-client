import React, { Fragment, useCallback, useEffect } from "react"
import { Col, Row, Grid, Divider } from "antd"
import style from "../../styles.module.scss"
import ProfileDetail from "./ProfileDetail"
import ProfileCoruse from "./ProfileCoruse"
import Header from "../../../../../headerMobile/Header"
import { useDispatch } from "react-redux"
import { getProfile } from "../../../../../../redux/actions/profile.actions";
const { useBreakpoint } = Grid;

export default function ProfileLearner() {
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
                        <Col lg={1} xl={2} md={1}>
                            <Divider type="vertical" style={{ height: "100%" }} />
                        </Col>
                    )
                }
                <Col xs={24} sm={24} md={12} lg={14} xl={14} >
                    <ProfileCoruse />
                </Col>
            </Row>
        </Fragment>
    )
}