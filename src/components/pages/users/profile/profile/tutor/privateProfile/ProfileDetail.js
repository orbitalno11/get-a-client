import React, { Fragment, useEffect, useState } from "react"
import { Image, Button, Badge } from "antd";
import {
    faMapMarkerAlt,
    faEdit,
    faBook,
    faCoins
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileSample from "../../../../../../images/profile.webp"
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent";

export default function ProfileDetail() {
    const { profile, auth } = useSelector(state => state)
    const [profileDetail, setProfileDetail] = useState(null)
    const [address, setAddress] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
            if (profile.profile.address) {
                setAddress(profile.profile.address)
            }
        }
    }, [profile])

    const SampleSubject = () => {
        return (
            <div className={style.subTitle}>
                <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                <span><SkeletonComponent.SkeletonText size="default" /></span>
            </div>
        )
    }

    return (
        <Fragment>
            <div className={style.profileSet}>
                <Image
                    className={style.imageProfile}
                    src={profileDetail ? profileDetail.profileUrl : ProfileSample}
                    preview={false}
                />
                <NavLink to={`/tutor/` + auth.profile + `/edit`}>
                    {
                        profileDetail ? (
                            <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[10, 0]}>
                                <h2 className={`${style.marginLeft} ${style.titleH2}`}>{profileDetail.firstname && profileDetail.firstname} <br /> {profileDetail.lastname && profileDetail.lastname}</h2>
                            </Badge>
                        ) : (
                            <div className={style.marginLeft}>
                                <SkeletonComponent.SkeletonText size="default" />
                            </div>
                        )
                    }
                </NavLink>
            </div>
            <div className={style.subProfile}>
                <div className={style.TitleCoin}>
                    <span className={style.titleH5}>เหรียญของคุณ</span>
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.coin} เหรียญ</span>
                    <div className={style.floatLeft}>
                        <NavLink to="/tutor/coin">
                            <Button className="buttonColor backgroundYellow" shape="round" size="middle">แลกเหรียญ</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={style.subProfile}>
                <span className={style.titleH4}>สถานที่สะดวกเรียน</span>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    {
                        profileDetail ? (
                            <span>{address ? address : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                    <Link className={style.floatLeft} to={`/tutor/${auth.profile}/edit/map`}>
                        <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                    </Link>
                </div>
            </div>
            <div className={style.subProfile}>
                <span className={style.titleH4}>วิชาที่สอน</span>
                {
                    profileDetail ? (
                        profileDetail.subject.map((item) => {
                            return (
                                <div className={style.subTitle} key={item.id}>
                                    <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                    <span>{item.title}</span>
                                </div>
                            )
                        })
                    ) : (
                        <Fragment>
                            <SampleSubject />
                            <SampleSubject />
                            <SampleSubject />
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    )
}