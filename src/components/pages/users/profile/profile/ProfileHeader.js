import { Button, Col, Image, Row } from "antd"
import React ,{useEffect} from "react"
import ProfileSample from "../../../../images/profile.webp"
import style from "./../styles.module.scss"
import isMobile from "../../../../isMobile/isMobile";
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfo } from "@fortawesome/free-solid-svg-icons";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { favoriteAction , coinAction} from "../../../../../redux/actions"
export default function ProfileHeader({ data, tutorPublic, isTutorInfo, isTutor }) {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const favData = useSelector(state => state.favorite)
    const { id } = useParams()
    const dispatch = useDispatch()

    const favorite = () => {
        if (auth.isAuthenticated) {
            if (tutorPublic && auth.role !== 2) {
                dispatch(favoriteAction.likeTutor(id, favData.favorite));
            }
        } else {
            const urlPathNow = encodeURIComponent(window.location.pathname)
            history.push("/login?from="+urlPathNow)
        }
    };

    useEffect(() => {
        dispatch(coinAction.getCoinBalance());
      }, []);

    return (
        <div>
            <div align={(isMobile() && tutorPublic) ? "center" : "start"} className={`${!(isMobile() && tutorPublic) && style.profileSet} ${!isMobile() && style.marginLeftThree}`}>
                <Image
                    className={!isMobile() || tutorPublic ? style.imageProfile : style.imageProfileSmall}
                    src={data ? data.profileUrl : ProfileSample}
                    preview={false}
                />
                {
                    (isMobile() && tutorPublic) &&
                    (
                        <div className={style.infogroup}>
                            {
                                !isTutorInfo && (
                                    <Link to={`/profile/${id}`}>
                                        <Button className={style.infoButton} shape="circle" icon={<FontAwesomeIcon icon={faInfo} />} />
                                    </Link>
                                )
                            }
                            <Button className={favData.favorite ? style.colorOrange : style.colorGray} shape="circle" icon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: "19pt" }} />} onClick={() => favorite()} />
                        </div>
                    )
                }
                <Row className={`${!isMobile() && style.marginLeftThree} ${(isMobile() && !tutorPublic) && style.marginLeftOne5} ${(tutorPublic && isMobile()) && style.marginSection}`} align="middle">
                    <Col span={24} >
                        <span className={`${isMobile() ? style.headerTwo25 : style.headerTwo75} ${style.TextHeight}`}>{data ? data.firstname : <SkeletonComponent.SkeletonText size="default" width="150px" />} {(isMobile() && !tutorPublic) && (<br />)} {data ? data.lastname : <SkeletonComponent.SkeletonText size="default" width="150px" />} </span>
                        {
                            (isMobile() && !tutorPublic) && (<br />)
                        }
                        {
                            !tutorPublic && (
                                <Link to={!isTutor ? "/me/edit" : `/tutor/${auth.profile}/edit`}>
                                    <Button className={`${style.buttonColor} ${style.textOne} ${!isMobile() && style.marginLeftOne}  ${isMobile() && style.marginTopHalf}`} style={styleComponent.buttonFull(color.blue, "4rem")} size="small">แก้ไข</Button>
                                </Link>
                            )
                        }
                    </Col>
                    <Col span={24}>
                        {
                            tutorPublic && (
                                <span className={style.textOne25}>{data ? data?.introduction : <SkeletonComponent.SkeletonText size="default" width="150px" />}</span>
                            )
                        }
                    </Col>
                    {
                        (!tutorPublic && !isMobile()) && (
                            <Row align="middle">
                                <styleComponent.iconCoin size="large" />
                                <Link to={!isTutor && "/historycoin"}>
                                    <span className={`${style.textTwo} ${style.marginLeftOne} ${style.textCoin}`}>{data ? data.coin : <SkeletonComponent.SkeletonText size="default"/>} &nbsp;เหรียญ</span>
                                </Link>
                                <Link to={!isTutor ? "/coin" : "/redeem"}>
                                    <Button className={`${style.buttonColor} ${style.textOne} ${style.marginLeftOne}`} style={styleComponent.buttonFull(color.yellow, "5rem")} size="small">{isTutor ? "แลกเหรียญ" : "ซื้อเหรียญ"}</Button>
                                </Link>
                            </Row>
                        )
                    }
                </Row>
            </div>
        </div >
    )
}