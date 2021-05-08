import React, { Fragment, useEffect, useState } from 'react'
import { Typography, Image, Badge, Button } from 'antd';
import {
    faCoins,
    faMapMarkerAlt,
    faEdit,
    faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../../styles.module.scss'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { color } from "../../../../../defaultValue";
const { Title, Link } = Typography;

export default function ProfileDetail() {
    const { auth, profile } = useSelector(state => state)
    const [profileDetail, setProfileDetail] = useState(null)
    const [addressDetail, setAddressDetail] = useState("ยังไม่ได้กำหนด")

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
        }
        if (profile.address) {
            const address = profile.address.fullAddress
            setAddressDetail(address)
        }
    }, [profile])


    return (
        <Fragment>
            {
                profileDetail && (
                    <Fragment>
                        <div className={style.profileSet}>
                            <Image
                                className={style.imageProfile}
                                src={profileDetail.profileUrl && profileDetail.profileUrl}
                                preview={false}
                            />
                            <NavLink to={`/learner/${auth.profile}/edit`}>
                                <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[12, 0]}>
                                    <h2 className={`${style.marginLeft} ${style.titleH3}`}>{profileDetail && profileDetail.firstname}<br />{profileDetail && profileDetail.lastname} </h2>
                                </Badge>
                            </NavLink>
                        </div>
                        <div className={style.subProfile}>
                            <div className={style.TitleCoin}>
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
                        </div>
                        <div className={style.subProfile}>
                            <Title level={5}>สถานที่สะดวกเรียน</Title>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={style.iconmarker} />
                                <span>{addressDetail ? addressDetail : "ยังไม่ได้กำหนด"}</span>

                                <div className={style.floatLeft}>
                                    <NavLink to={`/learner/${auth.profile}/edit/map`}>
                                        <Button className="backgroundBlue buttonColor" shape="round" size="middle" style={{ width: "100px" }}>แก้ไข</Button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={style.subProfile}>
                            <Title level={5}>ช่องทางติดต่อ</Title>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faFacebook} className={style.iconcoin} style={{ color: color.blue }} />
                                <span>{profileDetail.contact.facebookUrl ? profileDetail.contact.facebookUrl : "ยังไม่ได้กำหนด"}</span>
                            </div>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faLine} className={style.iconcoin} style={{ color: color.green }} />
                                <span>{profileDetail.contact.lineId ? profileDetail.contact.lineId : "ยังไม่ได้กำหนด"}</span>
                            </div>
                            <div className={style.subTitle}>
                                <FontAwesomeIcon icon={faPhoneAlt} className={style.iconcoin} style={{ color: color.gray }} />
                                <span>{profileDetail.contact.phoneNumber ? profileDetail.contact.phoneNumber : "ยังไม่ได้กำหนด"}</span>
                            </div>
                        </div>
                    </Fragment>
                )
            }

        </Fragment>
    )
}