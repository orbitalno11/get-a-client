import { Button, Col, Image, Row } from "antd";
import React, { Fragment } from "react"
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import isMobile from "../../../../../../isMobile/isMobile";
import style from "../../../styles.module.scss"
import { SkeletonComponent } from "../../../../../../loading/SkeletonComponent"
import profileSample from "../../../../../../images/profile.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfo } from "@fortawesome/free-solid-svg-icons";

export default function ProfileIntroduce({ mainPage }) {
    const { tutorHandle } = useSelector(state => state.tutor)
    const { id } = useParams()

    return (
        <Fragment>
            <Row className={style.paddingbody} >
                <Col lg={5} md={6} sm={24} xs={24} className={isMobile() ? style.alignCenter : null} align={isMobile() ? "center" : "flex-start"} >
                    <Image
                        className={style.imageProfilePubile}
                        src={tutorHandle ? tutorHandle.picture : profileSample}
                        preview={false}
                    ></Image>
                    {
                        (isMobile()) &&
                        (
                            <div className={style.infogroup}>
                                {
                                    mainPage &&
                                    (
                                        <Link to={`/profile/${id}`}>
                                            <Button className={style.infoButton} shape="circle" icon={<FontAwesomeIcon icon={faInfo} />} />
                                        </Link>
                                    )
                                }

                                <Button className={style.colorGray} shape="circle" icon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: "19pt" }} />} />
                            </div>
                        )
                    }
                </Col>
                <Col lg={17} md={17} sm={24} xs={24} className={isMobile() ? style.marginTop20 : style.columnJustify} align={isMobile() ? "center" : "flex-start"}>
                    {
                        tutorHandle ?
                            (
                                <Fragment>
                                    <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>
                                        {tutorHandle.fullNameText}
                                    </h2>
                                    <span className={style.textNormal}>
                                        {tutorHandle.introduction}
                                    </span>
                                </Fragment>
                            ) : (
                                <SkeletonComponent.SkeletonText size="default" />
                            )
                    }
                </Col>
            </Row>
        </Fragment>
    )
}
