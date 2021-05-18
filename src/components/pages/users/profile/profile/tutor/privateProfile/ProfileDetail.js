import React, { Fragment, useEffect, useState } from "react"
import { Image, Button, Badge, Typography } from "antd";
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
import ProfileSample from "../../../../../../images/profile.webp"
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent";
const { Title } = Typography;

export default function ProfileDetail() {
    const { profile, auth } = useSelector(state => state)
    const [profileDetail, setProfileDetail] = useState(null)
    const [address, setAddress] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
            if(profile.profile.address){
                setAddress(profile.profile.address.filter(item => item.type === 1))
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
                            <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[18, 0]}>
                                <Title level={3} className={style.marginLeft}>{profileDetail.firstname && profileDetail.firstname}  {profileDetail.lastname && profileDetail.lastname}</Title>
                            </Badge>
                        ) : (
                            <div className={style.marginLeft}>
                                <SkeletonComponent.SkeletonText size="default" />
                            </div>
                        )
                    }
                </NavLink>
            </div>
            {/* hide the section coin */}
            <div className={style.subProfile} hidden>
                <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
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
                <Title level={5}>สถานที่สะดวกเรียน</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    {
                        profileDetail ? (
                            <span>{address ? address[0].fullAddressText : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                    <div className={style.floatLeft}>
                        <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                    </div>
                </div>
            </div>
            <div className={style.subProfile}>
                <Title level={5}>วิชาที่สอน</Title>
                {
                    profileDetail ? (
                        profileDetail.subject.map((item) => {
                            return (
                                <div className={style.subTitle} key={item.id}>
                                    <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                    <span>{item.title}</span>
                                    <div className={style.floatLeft}>
                                        <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                                    </div>
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