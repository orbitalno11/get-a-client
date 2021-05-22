import React, { Fragment, useEffect, useState } from 'react'
import { Image, Badge, Button } from 'antd';
import {
    faMapMarkerAlt,
    faEdit,
    faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import ProfileSample from "../../../../../images/profile.webp"
import { color } from "../../../../../defaultValue";
import { SkeletonComponent } from "../../../../../loading/SkeletonComponent"

export default function ProfileDetail() {
    const { auth, profile, loading } = useSelector(state => state)
    const [profileDetail, setProfileDetail] = useState(null)
    const [addressDetail, setAddressDetail] = useState("ยังไม่ได้กำหนด")

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
        }
        if (profile.profile) {
            const address = profile.profile.address && profile.profile.address
            setAddressDetail(address)
        }
    }, [profile])


    return (
        <Fragment>
            <div className={style.profileSet}>
                <Image
                    className={style.imageProfile}
                    src={profileDetail ? profileDetail.profileUrl : ProfileSample}
                    preview={false}
                />
                <Link to={`/learner/${auth.profile}/edit`}>
                {
                        profileDetail ? (
                            <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[0, 0]}>
                                <h2 className={`${style.marginLeft} ${style.titleH2}`}>{profileDetail.firstname && profileDetail.firstname} <br /> {profileDetail.lastname && profileDetail.lastname}</h2>
                            </Badge>
                        ) : (
                            <div className={style.marginLeft}>
                                <SkeletonComponent.SkeletonText size="default" />
                            </div>
                        )
                    }
                </Link>
            </div>
            {/* hide coin section */}
            {/* <div className={style.subProfile}> */}
            {/* <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
                    <div className={style.floatLeft}>
                        <Link href="/historycoin">
                            <Button type="link" style={{ width: "100px", color: "GrayText" }}>ดูประวัติเหรียญ</Button>
                        </Link>
                    </div>

                </div> 
                 <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.coin}</span>
                    <div className={style.floatLeft}>
                        <Link href="/coin">
                            <Button className="backgroundGreen buttonColor" shape="round" size="middle" style={{ width: "100px" }}>ซื้อเหรียญ</Button>
                        </Link>
                    </div>

                </div>
            </div> */}
            <div className={style.subProfile}>
                <span className={style.titleH4}>สถานที่สะดวกเรียน</span>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                    {
                        !loading.loading  ? (
                            <span>{addressDetail ? addressDetail : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText />
                        )
                    }

                    <div className={style.floatLeft}>
                        <Link to={`/learner/${auth.profile}/edit/map`}>
                            <Button className="backgroundBlue buttonColor" shape="round" size="middle" style={{ width: "100px" }}>แก้ไข</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={style.subProfile}>
            <span className={style.titleH4}>ช่องทางติดต่อ</span>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faFacebook} className={style.iconcoin} style={{ color: color.blue }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.facebookUrl ? profileDetail.contact.facebookUrl : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText />
                        )
                    }
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faLine} className={style.iconcoin} style={{ color: color.green }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.lineId ? profileDetail.contact.lineId : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText />
                        )
                    }
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={style.iconcoin} style={{ color: color.gray }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.phoneNumber ? profileDetail.contact.phoneNumber : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText />
                        )
                    }
                </div>
            </div>

        </Fragment>
    )
}