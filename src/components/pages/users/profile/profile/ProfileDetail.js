import { faBook, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Row, Col } from "antd"
import React from 'react'
import { styleComponent } from "../../../../defaultFunction/style"
import { color } from "../../../../defaultValue"
import isMobile from "../../../../isMobile/isMobile"
import ProfileContact from "./ProfileContact"
import style from "./../styles.module.scss"
import { SkeletonComponent } from "../../../../loading/SkeletonComponent"
import { Link } from "react-router-dom"

export default function ProfileDetail({ data, isTutor }) {
    return (
        <div >
            {
                (isMobile()) && (
                    <Row align="middle" className={style.paddingProfileMobile} >
                        <Col span={18}>
                            <Row className={style.marginSection} align="middle" >
                                <Col span={2}>
                                    <styleComponent.iconCoin size="large" />
                                </Col>
                                <Col className={style.marginLeftOne} span={19}>
                                    {
                                        !data ? (
                                            <SkeletonComponent.SkeletonText size="default" width="150px" />
                                        ) : (
                                            <span className={`${style.textOne25} ${style.marginLeftOne}`}>100,000 เหรียญ</span>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6} align="end">
                            <Link to={!isTutor ? "/coin" : "/tutor/me/redeem"}>
                                <Button className={`${style.buttonColor} ${style.textOne}`} style={styleComponent.buttonFull(color.yellow, "5rem")} size="small">{isTutor ? "แลกเหรียญ" : "ซื้อเหรียญ"}</Button>
                            </Link>        
                        </Col>
                    </Row>
                )
            }
            <Row align="middle" justify="space-between" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                <Col >
                    <span className={style.textOne75}>สถานที่สะดวก{isTutor ? "สอน" : "เรียน"}</span >
                </Col>
                <Col span={6} align="end">
                    <Link to={`/me/edit/map`}>
                        <Button className={`${style.buttonColor} ${style.textOne} ${!isMobile() && style.marginLeftOne}`} style={styleComponent.buttonFull(color.blue, "4rem")} size="small">แก้ไข</Button>
                    </Link>
                </Col>
                <Col span={24}>
                    <Row className={style.marginTopHalf} align="middle" >
                        <Col span={3}>
                            <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faMapMarkerAlt} />
                        </Col>
                        <Col className={style.marginLeftOne} span={19}>
                            {
                                !data ? (
                                    <SkeletonComponent.SkeletonText size="default" width="150px" />
                                ) : (
                                    <span className={`${style.textOne25} `}>{data ? data.address : "ยังไม่ได้กำหนด"}</span>
                                )
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
            {
                isTutor && (
                    <Row align="middle" justify="space-between" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                        <Col span={24}>
                            <span className={style.textOne75}>วิชาที่สอน</span >
                        </Col>
                        <Col span={24}>
                            {
                                data && data.subject.map((item, index) => {
                                    return (
                                        <Row key={index} className={style.marginTopHalf} align="middle" >
                                            <Col span={3}>
                                                <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faBook} />
                                            </Col>
                                            <Col className={style.marginLeftOne} span={19}>
                                                <span className={style.textOne25}>{item.title}</span>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                )
            }
            {
                ((!isMobile() && isTutor) || !isTutor) && <ProfileContact data={data && data.contact} />
            }
        </div>
    )
}