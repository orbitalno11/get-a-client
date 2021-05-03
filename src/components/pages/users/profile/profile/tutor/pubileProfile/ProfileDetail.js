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
import { getHandleProfile } from "../../../../../../../redux/actions/profile.actions";
import ResponseMobile from "../../../../../../response/ResponseMobile";

const { Title } = Typography;

export default function ProfileDetail({ mainPage }) {
    const dispatch = useDispatch()
    const data = useSelector(state => state.profile)
    const [profile, setProfile] = useState(null)

    const fetchProfile = useCallback(() => {
        dispatch(getHandleProfile())
    }, [dispatch])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    useEffect(() => {
        setProfile(data.profileHandle)
    }, [data])

    return (
        <Fragment>
            {!mainPage && ResponseMobile() && <Header pageBack="goback" />}
            <div className={ResponseMobile() ? style.bodymobileprofile : !mainPage ? style.bodyEdit : null}>
                {
                    !mainPage &&
                    (
                        <div className={ResponseMobile() ? style.paddingTopBody : style.banner}  >
                            <ProfileIntroduce />
                        </div>
                    )
                }
                <div className={mainPage && ResponseMobile() ? style.marginTop20 : style.contrainnerProfilePubile}>
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
                    ((mainPage && !ResponseMobile()) ||  !mainPage )&&
                    
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
