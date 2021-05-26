import React, { Fragment, useCallback, useEffect } from "react"
import {
    faMapMarkerAlt,
    faStar,
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
import { trackImpressTutorProfile } from "../../../../../../../analytic/Analytic";
import EducationTutor from "../../../editProfile/tutor/EducationTutor";
import { color, defaultValue } from "../../../../../../defaultValue";
import isEmpty from "../../../../../../defaultFunction/checkEmptyObject";

export default function ProfileDetail({ mainPage }) {
    const dispatch = useDispatch()
    const { tutorHandle, listTesting, listEducation } = useSelector(state => state.tutor)
    const params = useParams()
    const userId = params.id
    const address = tutorHandle && (tutorHandle.address && tutorHandle.address.district.title)
    const testing = listTesting && (listTesting.filter(item => item.verified === 1))
    const education = listEducation && (listEducation.filter(item => item.verified === 1))

    const fetchProfile = useCallback(() => {
        if (!mainPage) {
            dispatch(tutorAction.getProfileTutor(userId))
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
            <div className={(isMobile() && !mainPage) ? style.paddingBottomBody : (!mainPage ? style.bodyEdit : null)} >
                {
                    !mainPage &&
                    (
                        <div className={isMobile() ? style.paddingTopBody : style.banner}  >
                            <ProfileIntroduce />
                        </div>
                    )
                }

                <div className={!isMobile() ? `${style.paddingbody} ${style.marginTop20}` : style.paddingbody}>
                    <div className={!isMobile() ? style.TitleCoin : style.profileSet}>
                        {address && (
                            <Fragment>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                                {
                                    tutorHandle ? (
                                        <span className={style.textNormal}>{address}</span>
                                    ) : (
                                        <SkeletonComponent.SkeletonText />
                                    )
                                }
                            </Fragment>
                        )
                        }
                    </div>
                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faUser} className={style.iconmarker} />
                        {
                            tutorHandle ? (
                                <span className={style.textNormal}>{tutorHandle && tutorHandle.numberOfLearner} คน</span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </div>

                    <div className={style.TitleCoin}>
                        <FontAwesomeIcon icon={faStar} className={style.iconmarker} style={{ color: color.yellow }} />
                        {
                            tutorHandle ? (
                                <span className={style.textNormal}>{tutorHandle && tutorHandle.rating} </span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </div>
                </div>
                {
                    ((mainPage && !isMobile()) || !mainPage) &&

                    (
                        <div className={style.marginTop}>
                            <div className={`${style.paddingbody} ${style.marginTop20}`} >
                                {
                                    (!isEmpty(testing) || !isEmpty(education)) && (
                                        <Fragment>
                                            <span className={style.titleH2}>ประวัติการศึกษา</span>
                                            {
                                                !isEmpty(testing) && <EducationTutor data={testing} type={defaultValue.typeIdentity["testing"]} status="learner" />
                                            }
                                            {
                                                !isEmpty(education) && <EducationTutor data={education} type={defaultValue.typeIdentity["education"]} status="learner" />
                                            }
                                        </Fragment>
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
