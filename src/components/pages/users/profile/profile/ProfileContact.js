import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons"
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Row } from "antd"
import React from 'react'
import { Fragment } from "react"
import isMobile from "../../../../isMobile/isMobile"
import { SkeletonComponent } from "../../../../loading/SkeletonComponent"
import style from "./../styles.module.scss"

export default function ProfileContact({ data, isTutorProfile }) {
    return (
        <div>
            <Row align="middle" justify="space-between" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                <Col span={24}>
                    <span className={style.textOne75}>ช่องทางติดต่อ</span >
                </Col>
                <Col span={24}>
                    <Row className={style.marginTopHalf} align="middle" >
                        <Col span={3}>
                            <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faMobileAlt} />
                        </Col>
                        <Col className={style.marginLeftOne} span={19}>
                            {
                                data ? (
                                    <span className={style.textOne25}>{data?.phoneNumber ? data.phoneNumber : "ยังไม่ได้กำหนด"}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText size="default"width="150px" />
                                )
                            }
                        </Col>
                    </Row>
                    {
                        !isTutorProfile && (
                            <Fragment>
                                <Row className={style.marginSection} align="middle" >
                                    <Col span={3}>
                                        <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faFacebook} />
                                    </Col>
                                    <Col className={style.marginLeftOne} span={19}>
                                        {
                                            data ? (
                                                <span className={style.textOne25}>{data?.facebookUrl ? data.facebookUrl : "ยังไม่ได้กำหนด"}</span>
                                            ) : (
                                                <SkeletonComponent.SkeletonText size="default"width="150px" />
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Row className={style.marginSection} align="middle" >
                                    <Col span={3}>
                                        <FontAwesomeIcon className={`${style.iconGray} ${style.marginLeftOneHalf}`} icon={faLine} />
                                    </Col>
                                    <Col className={style.marginLeftOne} span={19}>
                                        {
                                            data ? (
                                                <span className={style.textOne25}>{data?.lineId ? data.lineId : "ยังไม่ได้กำหนด"}</span>
                                            ) : (
                                                <SkeletonComponent.SkeletonText size="default"width="150px" />
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Fragment>
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}