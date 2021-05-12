import { Row, Col } from "antd"
import React, { Fragment } from "react"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { tutorAction } from "../../../../../../../redux/actions";
import Header from "../../../../../../headerMobile/Header";
import isMobile from "../../../../../../isMobile/isMobile";
import style from "../../../styles.module.scss"
import ProfileCourse from "./ProfileCourse";
import ProfileDetail from "./ProfileDetail";
import ProfileIntroduce from "./ProfileIntroduce";

export default function PubilcProfile() {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(tutorAction.getProfileTutor(id))
        dispatch(tutorAction.getListOfflineCourse(id))
        return () => {
            dispatch(tutorAction.clearListOfflineCourse())
        }
    }, [])

    return (
        <Fragment>
            {(isMobile()) && <Header pageBack="goback" />}
            <div className={isMobile() ? style.paddingBottomBody : style.bodyEdit}>
                <div className={isMobile() ? style.paddingTopBody : style.banner}  >
                    <ProfileIntroduce mainPage={true} />
                </div>
                <Row  >
                    <Col className={!isMobile() && style.paddingbody} xl={8} lg={8} md={10} sm={24} xs={24} >
                        <ProfileDetail mainPage={true} />
                    </Col>
                    <Col xl={14} lg={14} md={12} sm={24} xs={24} >
                        <ProfileCourse />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
