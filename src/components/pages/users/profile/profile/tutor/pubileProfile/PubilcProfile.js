import {  Row, Col } from "antd"
import React, { Fragment, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux";
import { getHandleProfile } from "../../../../../../../redux/actions/profile.actions";
import Header from "../../../../../../headerMobile/Header";
import responseMobile from "../../../../../../response/responseMobile";
import style from "../../../styles.module.scss"
import ProfileCourse from "./ProfileCourse";
import ProfileDetail from "./ProfileDetail";
import ProfileIntroduce from "./ProfileIntroduce";

export default function PubilcProfile() {
    const dispatch = useDispatch()
    
    const fetchProfile = useCallback(() => {
        dispatch(getHandleProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (
        <Fragment>
            {(responseMobile() )&& <Header pageBack="goback" /> }
            <div className={responseMobile() ? style.bodymobileprofile : style.bodyEdit}>
                <div className={responseMobile() ?style.paddingTopBody : style.banner}  >
                    <ProfileIntroduce  mainPage={true}/>
                </div>
                <Row  >
                    <Col className={!responseMobile() && style.paddingbody} xl={8} lg={8} md={10} sm={24} xs={24} >
                        <ProfileDetail mainPage={true}/>
                    </Col>
                    <Col xl={14}  lg={14}  md={12} sm={24} xs={24} >
                        <ProfileCourse />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
