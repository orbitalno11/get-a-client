import React, { Fragment, useCallback, useEffect, useState } from "react"
import { Typography, Grid } from "antd"
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
import { getHandleProfile } from "../../../../../../../redux/actions/profileActions";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function ProfileDetail({ mainPage }) {
    const screens = useBreakpoint();
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
            {!mainPage && (screens.xs || (screens.sm && !screens.md)) && <Header pageBack="goback" />}
            <div className={screens.xs || (screens.sm && !screens.md) ? style.paddingbody : !mainPage ? style.bodyEdit : null}>
                {
                    !mainPage &&
                    (
                        <div className={screens.xs || (screens.sm && !screens.md) ? style.paddingTopBody : style.banner}  >
                            <ProfileIntroduce />
                        </div>
                    )
                }
                <div className={mainPage && (screens.xs || (screens.sm && !screens.md)) ? style.marginTop20 : style.contrainnerProfilePubile}>
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
                    ((mainPage && !(screens.xs || (screens.sm && !screens.md))) ||  !mainPage )&&
                    
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
