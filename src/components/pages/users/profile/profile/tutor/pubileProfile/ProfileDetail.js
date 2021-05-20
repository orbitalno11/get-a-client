import React, { Fragment, useCallback, useEffect, useState } from "react"
import { Typography } from "antd"
import {
    faMapMarkerAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import EducationTutor from "../../../../../../educationTutor/EducationTutor";
import ProfileIntroduce from "./ProfileIntroduce";
import Header from "../../../../../../headerMobile/Header";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../../../../../../redux/actions";
import isMobile from "../../../../../../isMobile/isMobile";
import {trackImpressTutorProfile} from "../../../../../../../analytic/Analytic";
import {useParams} from "react-router-dom";

const { Title } = Typography;

export default function ProfileDetail({ mainPage }) {
    const dispatch = useDispatch()
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)
    const params = useParams()
    const userId = params.id

    const fetchProfile = useCallback(() => {
        dispatch(profileAction.getHandleProfile())
    }, [dispatch])

    const trackImpress = () => {
        if (userId?.isSafeNotBlank()) {
            trackImpressTutorProfile(userId)
        }
    }

    useEffect(() => {
        fetchProfile()
        trackImpress()
    }, [fetchProfile])

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

    return (
        <Fragment>
            {!mainPage && isMobile() && <Header pageBack="goback" />}
            <div className={isMobile() ? style.bodymobileprofile : !mainPage ? style.bodyEdit : null}>
                {
                    !mainPage &&
                    (
                        <div className={isMobile() ? style.paddingTopBody : style.banner}  >
                            <ProfileIntroduce />
                        </div>
                    )
                }
                <div className={mainPage && isMobile() ? style.marginTop20 : style.contrainnerProfilePubile}>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                        <span>{profile && profile.place}</span>
                    </div>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faUser} className={style.iconmarker} />
                        <span>{profile && profile.coin } คน.</span>
                    </div>
                </div>
                {
                    ((mainPage && !isMobile()) ||  !mainPage )&&
                    
                        (
                            <div className={style.marginTop}>
                                <div className={style.contrainnerProfilePubile} >
                                    <Title level={4}>ประวัติการศึกษา</Title>
                                    {
                                        profile && profile.history.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <EducationTutor data={item} size="small" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </Fragment>
    )
}
