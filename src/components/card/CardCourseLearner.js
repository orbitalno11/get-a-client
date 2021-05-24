import React from "react"
import { Col, Image, Row } from "antd";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLocationArrow, faStar } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { color } from "../defaultValue";
import { Fragment } from "react";
import ProfileSample from "../images/profile.webp"

export default function CardCourseLearner({ data, verizontal }) {
    const history = useHistory();

    const redirectToCoursePage = () => {
        history.push(`/profile/${data.id}/course`)
    }

    const styleCard = {
        padding: "1rem",
        width: "16rem",
        height: "12.5rem"
    }

    const styleCardVerizontal = {
        padding: '0.5rem',
        height: "9rem"
    }
    // 

    return (
        <div className={styles.card} style={verizontal ? styleCardVerizontal : styleCard} onClick={() => redirectToCoursePage()} >
            {
                verizontal ? (
                    <Fragment>
                        <Row align="middle" justify={"space-between"}>
                            <Col span={8} >
                                <Image
                                    src={data ? data.pictureUrl : ProfileSample}
                                    className={styles.imageLarge}
                                    preview={false}
                                />
                            </Col>
                            <Col span={16} align="start" style={{paddingLeft:'1rem'}}>
                                <span className={`${styles.titleH5} ${styles.cutText1Line}`}>{data && data.fullNameText}</span>
                                <span className={styles.textSmall}>
                                    <FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} />
                                    {data && data.rating}
                                </span>
                                <br />
                                <span className={styles.textSmall}> <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} /> {data.address ? data.address.district.title : "ยังไม่ได้กำหนด"}</span>
                                <br />
                                <span > <FontAwesomeIcon icon={faBook} className={styles.icon} /> {data && data.subject.title}</span>
                            </Col>
                        </Row>
                    </Fragment>
                )
                    : (<Fragment>
                        <Row align="center" >
                            <Image
                                src={data ? data.pictureUrl : ProfileSample}
                                className={styles.image}
                                preview={false}
                            />
                            <Col span={24} align="center">
                                <span className={`${styles.titleH4} ${styles.cutText1Line}`}>{data && data.fullNameText}</span>
                            </Col>

                            <Col span={24} align="center">
                                <span className={styles.textSmall}>
                                    <FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} />
                                    {data && data.rating}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} align="center">

                                <span className={styles.textSmall}> <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} /> {data.address ? data.address.district.title : "ยังไม่ได้กำหนด"}</span>
                            </Col>
                            <Col span={12} align="center">
                                <span > <FontAwesomeIcon icon={faBook} className={styles.icon} /> {data && data.subject.title}</span>
                            </Col>
                        </Row>
                    </Fragment>)
            }
        </div>

    )
}
