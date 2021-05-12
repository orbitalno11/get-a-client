import React, { Fragment, useCallback, useEffect, useState } from "react"
import {
    faMapMarkerAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import ProfileIntroduce from "./ProfileIntroduce";
import Header from "../../../../../../headerMobile/Header";
import { useDispatch } from "react-redux";
import isMobile from "../../../../../../isMobile/isMobile";
import { tutorAction } from "../../../../../../../redux/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent";

export default function ProfileDetail({ mainPage }) {
    const dispatch = useDispatch()
    const {tutorHandle} = useSelector(state => state.tutor)
    const [profile] = useState(null)
    const { id } = useParams()
    const address = tutorHandle && (tutorHandle.address && tutorHandle.address.district.title)
    
    const fetchProfile = useCallback(() => {
        if(!mainPage){
            dispatch(tutorAction.getProfileTutor(id))
        }
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


    return (
        <Fragment>
            {!mainPage && isMobile() && <Header pageBack="goback" />}
            <div className={!mainPage ? style.paddingBottomBody : null}>
                {
                    !mainPage &&
                    (
                        <div className={isMobile() ? style.paddingTopBody : style.banner}  >
                            <ProfileIntroduce />
                        </div>
                    )
                }
                <div className={style.contrainnerProfilePubile}>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                        {
                            tutorHandle ? (
                                <span>{address ? address : "ยังไม่ได้กำหนด"}</span>
                            ):(
                                <SkeletonComponent.SkeletonText/>
                            )
                        }
                      
                    </div>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faUser} className={style.iconmarker} />
                        {
                            tutorHandle ? (
                                <span>{tutorHandle && tutorHandle.numberOfLearner} คน.</span>
                            ):(
                                <SkeletonComponent.SkeletonText/>
                            )
                        }
                    </div>
                </div>
                {
                    ((mainPage && !isMobile()) || !mainPage) &&

                    (
                        <div className={style.marginTop}>
                            <div className={style.contrainnerProfilePubile} >
                                <span className={style.titleH3}>ประวัติการศึกษา</span>
                                {
                                    profile ? profile.history.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <EducationTutor data={item} size="small" />
                                            </div>
                                        )
                                    }): (
                                        <p>ยังไม่มีประวัติการศึกษา</p>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}
