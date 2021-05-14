import React, { Fragment, useEffect, useState } from "react"
import { Image, Button, Badge } from "antd";
import {
    faCoins,
    faMapMarkerAlt,
    faEdit,
    faBook
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


export default function ProfileDetail() {
    const { profile, auth } = useSelector(state => state)
    const [profileDetail, setProfileDetail] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
        }
    }, [profile])

    return (
        <Fragment>
            {
                profileDetail ? (
                    <Fragment>
                        <div className={style.profileSet}>
                            <Image
                                className={style.imageProfile}
                                src={profileDetail.profileUrl && profileDetail.profileUrl}
                                preview={false}
                            />
                            <NavLink to={`/tutor/` + auth.profile + `/edit`}>
                                <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[18, 0]}>
                                    <h2 className={`${style.titleH2} ${style.marginLeft}`}>{profileDetail && profileDetail.firstname}<br />{profileDetail && profileDetail.lastname} </h2>
                                </Badge>
                            </NavLink>
                        </div>
                        <div className={style.subProfile}>
                            <div className={style.TitleCoin}>
                            <h3 className={style.titleH4}>เหรียญของคุณ</h3>
                            </div>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                                <span>{profileDetail && profileDetail.coin} เหรียญ</span>
                                <div className={style.floatLeft}>
                                    <NavLink to="/tutor/coin">
                                        <Button className="buttonColor backgroundYellow" style={{ width: "100px" }} shape="round" size="middle">แลกเหรียญ</Button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={style.subProfile}>
                        <h3 className={style.titleH4}>สถานที่สะดวกเรียน</h3>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                                <span >{profileDetail && profileDetail.place}</span>
                                <div className={style.floatLeft}>
                                    <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                                </div>
                            </div>
                        </div>
                        <div className={style.subProfile}>
                        <h3 className={style.titleH4}>วิชาที่สอน</h3>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                <span>คณิตศาสตร์</span>
                                <div className={style.floatLeft}>
                                    <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                                </div>
                            </div>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                <span>อังกฤษ</span>
                                <div className={style.floatLeft}>
                                    <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                                </div>
                            </div>
                        </div>
                       
                    </Fragment>
                ) : null
            }

        </Fragment>
    )
}