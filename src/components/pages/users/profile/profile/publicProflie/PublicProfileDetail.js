import { faMapMarkerAlt, faStar, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row, Col, Button } from "antd"
import React from 'react'
import isMobile from "../../../../../isMobile/isMobile"
import ProfileContact from "./../ProfileContact"
import style from "./../../styles.module.scss"
import { useSelector } from "react-redux"
import { SkeletonComponent } from "../../../../../loading/SkeletonComponent"
import isEmpty from "../../../../../defaultFunction/checkEmptyObject"
import EducationTutor from "../../editProfile/tutor/EducationTutor"
import { color, defaultValue } from "../../../../../defaultValue"
import { styleComponent } from "../../../../../defaultFunction/style"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router"
import { useState } from "react"
import { favoriteAction } from "../../../../../../redux/actions"
import { useEffect } from "react"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

export default function PublicProfileDetail({ isCourse }) {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { tutorHandle, listTesting, listEducation } = useSelector(state => state.tutor)
    const testing = listTesting && (listTesting.filter(item => item.verified === 1))
    const education = listEducation && (listEducation.filter(item => item.verified === 1))
    const favData = useSelector(state => state.favorite)
    const [loadingFav, setloadingFav] = useState(false)
    const [statusFav, setstatusFav] = useState()
    const auth = useSelector(state => state.auth)
    const history = useHistory()
    const { id } = useParams()

    const favorite = () => {
        if (auth.isAuthenticated) {
            if (auth.role !== 2) {
                setloadingFav(true)
                dispatch(favoriteAction.likeTutor(id, favData.favorite));
            }
        } else {
            const urlPathNow = encodeURIComponent(window.location.pathname)
            history.push("/login?from=" + urlPathNow)
        }
    };

    useEffect(() => {
        if (!isEmpty(favData.favorite) && favData.favorite !== statusFav) {
            setloadingFav(false)
            setstatusFav(favData.favorite)
        }
    }, [favData.favorite])

    return (
        <div >
            {
                !isMobile() && (
                    <Button
                        className={`${style.buttonColor} ${style.marginSection}`}
                        style={styleComponent.buttonFull(color.orange)}
                        onClick={() => favorite()}
                    >
                        { loadingFav && (<styleComponent.spinLoading />)}
                        <span className={style.textNormal} align="center">บันทึกติวเตอร์{favData.favorite && "แล้ว"}</span>
                    </Button>
                )
            }
            <div className={`${!isMobile() && style.section} ${!isMobile() && style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                {
                    tutorHandle ? (
                        tutorHandle.address && (
                            <Row className={style.marginTopHalf} align="middle" >
                                <Col span={3}>
                                    <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faMapMarkerAlt} />
                                </Col>
                                <Col className={style.marginLeftOne} span={19}>
                                    <span className={style.textOne25}>
                                        {tutorHandle.address.fullAddressText}
                                    </span>
                                </Col>
                            </Row>
                        )
                    ) : (
                        <SkeletonComponent.SkeletonText size="default" width="150px" />
                    )
                }
                <Row className={style.marginSection} align="middle" >
                    <Col span={3}>
                        <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faUsers} />
                    </Col>
                    <Col className={style.marginLeftOne} span={19}>
                        <span className={style.textOne25}>
                            {
                                tutorHandle ? (
                                    tutorHandle.numberOfLearner ? tutorHandle.numberOfLearner : 0
                                ) : (
                                    <SkeletonComponent.SkeletonText size="default" width="150px" />
                                )
                            }
                        </span>
                    </Col>
                </Row>
                <Row className={style.marginSection} align="middle" >
                    <Col span={3}>
                        <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf} ${style.colorYellow}`} icon={faStar} />
                    </Col>
                    <Col className={style.marginLeftOne} span={19}>
                        <span className={style.textTwo}>
                            {
                                tutorHandle ? (
                                    tutorHandle.rating ? tutorHandle.rating : 0
                                ) : (
                                    <SkeletonComponent.SkeletonText size="default" width="150px" />
                                )
                            }
                        </span>
                    </Col>
                </Row>
            </div>
            <ProfileContact data={tutorHandle && tutorHandle.contact} isTutorProfile />
            {
                ((isCourse && !screens.md) || (!isCourse && screens.md)) && (
                    (!isEmpty(testing) || !isEmpty(education)) && (
                        <Row align="middle" justify="space-between" className={`${screens.md && style.section} ${style.marginSection} ${!screens.md && style.paddingProfileMobile}`} >
                            <Col span={24}>
                                <span className={style.textOne75}>ประวัติการศึกษา</span >
                            </Col>
                            {
                                !isEmpty(testing) && <EducationTutor data={testing} type={defaultValue.typeIdentity["testing"]} status="learner" />
                            }
                            {
                                !isEmpty(education) && <EducationTutor data={education} type={defaultValue.typeIdentity["education"]} status="learner" />
                            }
                        </Row>
                    )
                )
            }
        </div>
    )
}