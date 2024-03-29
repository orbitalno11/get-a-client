import React from "react"
import { Col, Image, Row} from "antd";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLocationArrow, faMapMarkerAlt, faStar, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { color } from "../defaultValue";
import { Fragment } from "react";
import ProfileSample from "../images/profile.webp"

export default function CardCourseLearner({ data, verizontal, type, ranking }) {
    const history = useHistory();
    const isOffline = type === "course"
    const redirectToCoursePage = () => {
        if (isOffline) {
            history.push(`/profile/${data.id}/course`)
        } else {
            history.push(`/online/${data.id}`)
        }
    }
    const styleCard = {
        padding: "1rem",
        width: "16rem",
        height: "12.5rem"
    }

    const styleCardVerizontal = {
        alignItems: "center",
        padding: '0.5rem',
        height: "9rem",
        border: ranking ? "none" : ""
    }

    const styleRow = {
        position: "relative",
        height: "100%",
        width: "100%"
    }

    return (
        <div className={styles.card} style={verizontal ? styleCardVerizontal : styleCard} onClick={() => redirectToCoursePage()} >
            {
                verizontal ? (
                    <Fragment>
                        <Row align="middle" justify={"space-between"} style={styleRow}>
                            <Col span={8} >
                                <Image
                                    src={data ? (isOffline ? data.pictureUrl : data.coverUrl) : ProfileSample}
                                    className={isOffline ? styles.imageLarge : styles.imageClip}
                                    preview={false}
                                />
                            </Col>
                            <Col span={16} align="start" style={{ paddingLeft: "1rem" }}>
                                <span className={`${styles.titleH5} ${styles.textOneLine}`}>{data && (isOffline ? data.fullNameText : data.name)}</span>
                                <Row align="start">
                                    <Col className={styles.widthIcon}><FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} /></Col>
                                    <Col ><span className={styles.textOne}>{data && data.rating}</span></Col>
                                </Row>
                                {
                                    isOffline ? (
                                        <Fragment>
                                            <Row align="start">
                                                <Col className={styles.widthIcon}><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /></Col>
                                                <Col ><span className={styles.textOne}>{data.address ? data.address.district.title : "ยังไม่ได้กำหนด"}</span></Col>
                                            </Row>
                                            <Row align="start">
                                                <Col className={styles.widthIcon}><FontAwesomeIcon icon={faBook} className={styles.icon} /></Col>
                                                <Col ><span className={styles.textOne}>{data && data.subject.title}</span></Col>
                                            </Row>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <span className={styles.textSmall}> <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} /> {data.owner && data.owner.fullNameText}</span>
                                        </Fragment>
                                    )
                                }

                            </Col>
                        </Row>
                    </Fragment>
                )
                    : (<Fragment>
                        <Row align="center" >
                            <Image
                                src={data ? (isOffline ? data.pictureUrl : data.coverUrl) : ProfileSample}
                                className={screen.md ? styles.image : styles.image}
                                preview={false}
                            />
                            <Col span={24} align="center">
                                <span className={`${styles.titleH5} ${styles.textOneLine}`}>{data && (isOffline ? data.fullNameText : data.name)}</span>
                            </Col>

                            <Row align="start">
                                <Col className={styles.widthIcon}><FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} /></Col>
                                <Col ><span className={styles.textOne}>{data && data.rating}</span></Col>
                            </Row>

                        </Row>
                        <Row align="center">
                            {
                                isOffline ? (
                                    <Fragment>
                                        <Col span={12} align="center">
                                            <Row align="center">
                                                <Col className={styles.widthIcon}><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /></Col>
                                                <Col ><span className={styles.textOne}>{data.address ? data.address.district.title : "ยังไม่ได้กำหนด"}</span></Col>
                                            </Row>
                                        </Col>
                                        <Col span={12} align="center">
                                            <Row align="center">
                                                <Col className={styles.widthIcon}><FontAwesomeIcon icon={faBook} className={styles.icon} /></Col>
                                                <Col ><span className={styles.textOne}>{data && data.subject.title}</span></Col>
                                            </Row>
                                        </Col>
                                    </Fragment>
                                ) : (
                                    <span className={`${styles.textSmall}  ${styles.textOneLine}`}> <FontAwesomeIcon icon={faUserAlt} className={styles.icon} /> {data.owner && data.owner.fullNameText}</span>
                                )
                            }
                        </Row>
                    </Fragment>)
            }
        </div>
    )
}
