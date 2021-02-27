import {  Row, Col, Grid } from "antd"
import React, { Fragment, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux";
import { getHandleProfile } from "../../../../../../../redux/actions/profileActions";
import Header from "../../../../../../headerMobile/Header";
import style from "../../../styles.module.scss"
import ProfileCorse from "./ProfileCorse";
import ProfileDetail from "./ProfileDetail";
import ProfileIntroduce from "./ProfileIntroduce";
const { useBreakpoint } = Grid;

export default function PubilcProfile() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    
    const fetchProfile = useCallback(() => {
        dispatch(getHandleProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (
        <Fragment>
            {(screens.xs || (screens.sm && !screens.md) )&& <Header pageBack="goback" /> }
            <div className={screens.xs || (screens.sm && !screens.md) ? style.bodymobileprofile : style.bodyEdit}>
                <div className={screens.xs || (screens.sm && !screens.md) ?style.paddingTopBody : style.banner}  >
                    <ProfileIntroduce  mainPage={true}/>
                </div>
                <Row  >
                    <Col className={screens.xs || (screens.sm && !screens.md) ? null:style.paddingbody} xl={8} lg={8} md={10} sm={24} xs={24} >
                        <ProfileDetail mainPage={true}/>
                    </Col>
                    <Col xl={14}  lg={14}  md={12} sm={24} xs={24} >
                        <ProfileCorse />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
