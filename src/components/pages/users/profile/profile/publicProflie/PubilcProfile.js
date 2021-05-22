import { Col, Row } from "antd"
import React from "react"
import { Fragment } from "react"
import Header from "../../../../../headerMobile/Header"
import isMobile from "./../../../../../isMobile/isMobile"
import style from "./../../styles.module.scss"
import ProfileCourse from "../ProfileCourse"
import ProfileHeader from "../ProfileHeader"
import PublicProfileDetail from "./PublicProfileDetail"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { favoriteAction, tutorAction } from "../../../../../../redux/actions"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"

export default function PubilcProfile({ isCourse }) {
    const dispatch = useDispatch()
    const { tutorHandle } = useSelector(state => state.tutor)
    const [dataHeader, setDataHeader] = useState(null)
    const { id } = useParams()

    const checkFavorite = () =>{
        if (id?.isSafeNotBlank()) {
            dispatch(favoriteAction.checkFavoriteTutor(id))
        }
    }

    useEffect(() => {
        dispatch(tutorAction.getProfileTutor(id))
        dispatch(tutorAction.getListOfflineCourse(id))
        dispatch(tutorAction.getListOnlineCourse(id))
        dispatch(tutorAction.getEducations(id))
        dispatch(tutorAction.getTestings(id))
        checkFavorite()
        return () => {
            dispatch(tutorAction.clearListOfflineCourse())
        }
    }, [])

    useEffect(() => {
        if (tutorHandle) {
            setDataHeader({
                firstname: tutorHandle.firstname,
                lastname: tutorHandle.lastname,
                profileUrl: tutorHandle.picture,
                introduction: tutorHandle.introduction
            })
        }
    }, [tutorHandle])

    return (
        <Fragment>
            {(isMobile()) && <Header pageBack="goback" title={!isCourse && `โปรไฟล์`} />}
            <div className="container">
                <Row gutter={[8, 8]} className={style.bodyPaddingTopBottom} justify={"space-between"}>
                    <Col className={!isMobile() ? style.section : null} span={24}>
                        <ProfileHeader data={dataHeader} tutorPublic isTutorInfo={!isCourse} />
                    </Col>
                    <Col xl={10} lg={11} md={11} sm={24} xs={24}>
                        <PublicProfileDetail isCourse={!isCourse} />
                    </Col>
                    <Col xl={13} lg={11} md={11} sm={24} xs={24} className={isMobile() && style.marginSection} >
                        {
                           ((isCourse) || (!isCourse && !isMobile())) && <ProfileCourse isTutorProfile />
                        }
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}