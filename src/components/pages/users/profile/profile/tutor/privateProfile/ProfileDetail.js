import React, { Fragment, useEffect, useState } from "react"
import { Typography, Image, Button, Badge } from "antd";
import {
    faCoins,
    faMapMarkerAlt,
    faEdit,
    faBook,
    faPhoneAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../styles.module.scss"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { color } from "../../../../../../defaultValue";
const { Title } = Typography;

export default function ProfileDetail() {
    const profile = useSelector(state => state.profile)
    const [profileDetail, setProfileDetail] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setProfileDetail(profile.profile)
        }
    }, [profile])

    console.log(profile)

    return (
        <Fragment>
            {
                profileDetail ? (
                    <Fragment>
                        <div className={style.profileSet}>
                            <Image
                                className={style.imageProfile}
                                src={profileDetail.profileUrl && profileDetail.profileUrl }
                                preview={false}
                            />
                            <NavLink to="/tutor/1/edit">
                                <Badge className="icon-addimage" count={<FontAwesomeIcon icon={faEdit} />} offset={[18, 0]}>
                                    <Title level={3} className={style.marginLeft}>{profileDetail && profileDetail.firstname}<br />{profileDetail && profileDetail.lastname} </Title>
                                </Badge>
                            </NavLink>
                        </div>
                        <div className={style.subProfile}>
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
                                <span >{profileDetail && profileDetail.place}</span>
                                <div className={style.floatLeft}>
                                    <Button className="buttonColor backgroundBlue" style={{ width: "100px" }} shape="round" size="middle">แก้ไข</Button>
                                </div>
                            </div>
                        </div>
                        <div className={style.subProfile}>
                            <Title level={5}>วิชาที่สอน</Title>
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
                ) : null
            }

        </Fragment>
    )
}
