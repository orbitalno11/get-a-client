import React, { Fragment, useCallback, useEffect } from "react"
import { Col, Row, Grid, Divider } from "antd"
import style from "../../styles.module.scss"
import ProfileDetail from "./ProfileDetail"
import ProfileCourse from "./ProfileCourse"
import Header from "../../../../../headerMobile/Header"
import { useDispatch } from "react-redux"
import { profileAction } from "../../../../../../redux/actions/profile.actions";
import isMobile from "../../../../../isMobile/isMobile"
import { useSelector } from "react-redux"
const { useBreakpoint } = Grid;
import ModalComponent from "../../../../../modal/ModalComponent";

export default function ProfileLearner() {
    const screens = useBreakpoint();
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getProfile(auth.profile))
        dispatch(profileAction.getAddress())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])


    return (
        <Fragment>
            {isMobile() && <Header title="โปรไฟล์" />}
            <ModalComponent />
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
                    <ProfileCourse mainPage={false}/>
                </Col>
            </Row>
        </Fragment>
    )
}
