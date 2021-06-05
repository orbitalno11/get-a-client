import React, { Fragment, useCallback, useEffect,useState} from "react"
import {
    faMapMarkerAlt,
    faStar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button,Grid,Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import ProfileIntroduce from "./ProfileIntroduce";
import Header from "../../../../../../headerMobile/Header";
import { useDispatch } from "react-redux";
import isMobile from "../../../../../../isMobile/isMobile";
import { tutorAction,favoriteAction} from "../../../../../../../redux/actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent";
import { trackImpressTutorProfile } from "../../../../../../../analytic/Analytic";
import EducationTutor from "../../../editProfile/tutor/EducationTutor";
import { color, defaultValue } from "../../../../../../defaultValue";
import isEmpty from "../../../../../../defaultFunction/checkEmptyObject";
const { useBreakpoint } = Grid;

export default function ProfileDetail({ mainPage }) {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.loading)
    const [loadingFav, setloadingFav] = useState(false)
    const { tutorHandle, listTesting, listEducation } = useSelector(state => state.tutor)
    const favData = useSelector(state => state.favorite)
    const [statusFav, setstatusFav] = useState()
    const params = useParams()
    const userId = params.id
    const address = tutorHandle && (tutorHandle.address && tutorHandle.address.district.title)
    const testing = listTesting && (listTesting.filter(item => item.verified === 1))
    const education = listEducation && (listEducation.filter(item => item.verified === 1))
    const screens = useBreakpoint();

    const fetchProfile = useCallback(() => {
        if (!mainPage) {
            dispatch(tutorAction.getProfileTutor(userId))
        }
    }, [dispatch])

    
    const checkFavorite = () =>{
        if (userId?.isSafeNotBlank()) {
            dispatch(favoriteAction.checkFavoriteTutor(userId))
        }
    }

    const trackImpress = () => {
        if (userId?.isSafeNotBlank()) {
            trackImpressTutorProfile(userId)
        }
    }
    
    useEffect(() => {
        fetchProfile()
        trackImpress()
        checkFavorite()
    }, [fetchProfile])

    const favorite = () => {
        setloadingFav(true)
        dispatch(favoriteAction.likeTutor(userId,favData.favorite));
    };

    useEffect(() => {
        if(!isEmpty(favData.favorite)&& favData.favorite!== statusFav ){
            setloadingFav(false)
            setstatusFav(favData.favorite)
        }
    }, [favData.favorite])

    const favoriteButton = {
        height: "auto",
        borderRadius: "12rem",
        padding: "5px",
        width:"100%" 
      }

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
                <div className={style.contrainnerProfilePubile}>

                    {
                        screens.md &&
                        (    
                        <div className={`${style.horizontalCenter} ${style.TitleCoin}`}>              
                            <Button                     
                            className="buttonColor backgroundOrange"
                            style={favoriteButton}
                            onClick={() => favorite()}
                            disabled={loading ? true : false}
                            >
                            {
                                loadingFav && (
                                    <Fragment>
                                        <Spin style={{ marginRight: "0.5rem" }} />   
                                    </Fragment>
                                )
                            }
                            {
                                favData.favorite? (
                                    <span className={style.textNormal} align="center">บันทึกติวเตอร์แล้ว</span>

                                ):(
                                    <span className={style.textNormal} align="center">บันทึกติวเตอร์</span>
                                )
                            }
                            </Button>
                        </div>
                        )
                    }

                    {address && (
                        <div className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                            {
                                tutorHandle ? (
                                    <span className={style.textNormal}>{address}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </div>
                    )
                    }
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
