import React, { Fragment, useCallback, useEffect } from "react"
import { Col, Row, Grid, Divider } from "antd"
import style from "../../../styles.module.scss"
import ProfileDetail from "./ProfileDetail"
// import ProfileIdentity from "./ProfileIdentity"
import Header from "../../../../../../headerMobile/Header"
import { useDispatch } from "react-redux"
import { profileAction } from "../../../../../../../redux/actions/profile.actions";
import isMobile from "../../../../../../isMobile/isMobile"
const { useBreakpoint } = Grid;

export default function ProfileTutor() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (
        <Fragment>
            {isMobile() && <Header title="โปรไฟล์" /> }
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
                    {/* <ProfileIdentity /> */}
                </Col>
            </Row>
        </Fragment>
    )
}
