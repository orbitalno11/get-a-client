import React, { Fragment, useEffect, useState } from 'react'
import { Badge, Button, Image, Typography } from 'antd';
import {
    faCoins,
    faMapMarkerAlt,
    faEdit,
    faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { SkeletonComponent } from "../../../../../loading/SkeletonComponent";
import ProfileSample from "../../../../../images/profile.webp"
import isMobile from "../../../../../isMobile/isMobile";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { color } from "../../../../../defaultValue";
const { Title } = Typography;

export default function ProfileDetail() {
    const profile = useSelector(state => state.profile)
    const [profileDetail, setProfileDetail] = useState(null)
    const [address, setAddress] = useState(null)
    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
            setAddress(profile.profile.address.filter(item=>item.type === 1))
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
                <Link to="/learner/1/edit">
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
                </Link>
            </div>
            <div className={style.subProfile}>
                <div className={style.TitleCoin}>
                    <Title level={5}>เหรียญของคุณ</Title>
                    <div className={style.floatLeft}>
                        <Link to="/historycoin">
                            <Button type="link" style={{ width: "100px", color: "GrayText" }}>ดูประวัติเหรียญ</Button>
                        </Link>
                    </div>

                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faCoins} className={style.iconcoin} />
                    <span>{profileDetail && profileDetail.coin}</span>
                    <div className={style.floatLeft}>
                        <Link to="/coin">
                            <Button className="backgroundGreen buttonColor" shape="round" size="middle" style={{ width: "100px" }}>ซื้อเหรียญ</Button>
                        </Link>
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

                    {
                        isMobile() &&
                        (
                            <div className={style.floatLeft}>
                                <Link to="/learner/1/edit/map">
                                    <Button className="backgroundBlue buttonColor" shape="round" size="middle" style={{ width: "100px" }}>แก้ไข</Button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
             <div className={style.subProfile}>
                <Title level={5}>ช่องทางติดต่อ</Title>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faFacebook} className={style.iconcoin} style={{ color: color.blue }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.facebookUrl ? profileDetail.contact.facebookUrl : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                   
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faLine} className={style.iconcoin} style={{ color: color.green }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.lineId ? profileDetail.contact.lineId : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                    
                </div>
                <div className={style.subTitle}>
                    <FontAwesomeIcon icon={faPhoneAlt} className={style.iconcoin} style={{ color: color.gray }} />
                    {
                        profileDetail ? (
                            <span>{profileDetail.contact.phoneNumber ? profileDetail.contact.phoneNumber : "ยังไม่ได้กำหนด"}</span>
                        ) : (
                            <SkeletonComponent.SkeletonText size="default" />
                        )
                    }
                   
                </div>
            </div>
        </Fragment>
    )
}
