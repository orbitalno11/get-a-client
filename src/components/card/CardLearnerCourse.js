import {  Col, Image, Row } from "antd"
import React from 'react'
import styles from "./styles.module.scss"
// import ProfileSample from "../images/profile.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faLocationArrow } from "@fortawesome/free-solid-svg-icons"

export default function CardLearnerCourse({data}) {
    const styleCard = {
        padding: "0.5rem",
        // height: "9.8rem"
    }

    return (
        <div className={styles.card} style={styleCard} >
            <Row align="middle">
                <Col span={5}>
                    <Image
                        src={data.owner.picture}
                        className={styles.image}
                        preview={false}
                    />
                </Col>
                <Col span={17} align="start" style={{ paddingLeft: "2rem" }}>
                    <span className={styles.titleH5}>{data.owner.fullNameText}</span>
                    <br/>
                    <span className={styles.textSmall}>
                        <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} />วิเศษสุขนคร
                     </span>
                    <br />
                    <span className={styles.textSmall}>
                        <FontAwesomeIcon icon={faBook} className={styles.icon} />{data.subject.title}
                            </span>

                </Col>
            </Row>
            <Row>
                เริ่มเรียนวันที่ xx-xx 
            </Row>
        </div >
    )
}
