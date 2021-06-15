import { Col, Row } from "antd"
import React, { useEffect, useState } from "react"
import isMobile from "../../../../isMobile/isMobile"
import style from "./../styles.module.scss"
import ProfileRight from "./ProfileRight"
import ProfileDetail from "./ProfileDetail"
import ProfileHeader from "./ProfileHeader"
import { useCallback } from "react"
import { myCourseAction, profileAction, tutorAction, coinAction } from "../../../../../redux/actions"
import { useSelector, useDispatch } from "react-redux"
import { Fragment } from "react"
import Header from "../../../../headerMobile/Header"
import ModalComponent from "../../../../modal/ModalComponent"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

export default function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile)
    const [dataHeader, setDataHeader] = useState(null)
    const [dataDetail, setDataDetail] = useState(null)
    const profilePage = window.location.pathname === "/me"
    const isTutor = auth.role === 2
    const balanceCoin = useSelector((state) => state.coin.balance);
    const screens = useBreakpoint();
    useEffect(() => {
        if (profile.profile) {
            setDataHeader({
                firstname: profile.profile.firstname,
                lastname: profile.profile.lastname,
                profileUrl: profile.profile.profileUrl,
                coin: balanceCoin && balanceCoin.amount,
            })

            setDataDetail({
                address: profile.profile.address ? profile.profile.address : "ยังไม่ได้กำหนด",
                subject: profile.profile?.subject,
                contact: {
                    facebookUrl: profile.profile.contact.facebookUrl ? profile.profile.contact.facebookUrl : "ยังไม่ได้กำหนด",
                    lineId: profile.profile.contact.lineId ? profile.profile.contact.lineId : "ยังไม่ได้กำหนด",
                    phoneNumber: profile.profile.contact.phoneNumber ? profile.profile.contact.phoneNumber : "ยังไม่ได้กำหนด",
                },
                coin: balanceCoin && balanceCoin.amount,
            })
        }
    }, [profile])

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getProfile(auth.profile))
        dispatch(profileAction.getAddress())
        dispatch(coinAction.getCoinBalance());
        if (isTutor) {
            dispatch(tutorAction.getEducations(auth.profile))
            dispatch(tutorAction.getTestings(auth.profile))
        } else {
            dispatch(myCourseAction.getMyOfflineCourse());
            dispatch(myCourseAction.getMyOnlineCourse());
        }
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return (
        <Fragment>
            {isMobile() && <Header title={profilePage ? "โปรไฟล์" : "บทเรียนของฉัน"} />}
            <ModalComponent />
            <div className="container">
                <Row className={style.bodyPaddingTopBottom} justify={"space-between"}>
                    <Col className={!isMobile() ? style.section : null} span={24}>
                        {
                            profilePage && <ProfileHeader data={dataHeader && dataHeader} isTutor={isTutor} />
                        }
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                        {
                            profilePage && <ProfileDetail data={dataDetail} isTutor={isTutor} />
                        }
                    </Col>
                    <Col xl={13} lg={13} md={13} sm={24} xs={24}>
                        {
                           ((isTutor) || (!isTutor && screens.md) || !profilePage) && (<ProfileRight isTutor={isTutor} />)
                        }
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}