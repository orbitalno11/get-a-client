import React from "react"
import { Image, Row, Col } from "antd";
import styles from "./styles.module.scss"
import { faBookReader, faCoins, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import vdoSample  from "../images/vdoSample.webp"

export default function CardLesson({ data, isCourse }) {
    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} align="middle">
            <Col xs={9} sm={8} md={8} lg={9} xl={9}>
                <Image
                    src={data.coverUrl ? data.coverUrl : vdoSample}
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col xs={13} sm={14} md={14} lg={12} xl={14} align="start" className={styles.marginLeft}>
                <Col span={24} className={styles.textOneLine}>
                    <span className={`${styles.titleH5} `}>{data && data.name}</span>
                </Col>
                <Col span={24} className={`${styles.paddingTop} ${styles.textNormal} ${styles.textOneLine}`}  >
                    {
                        !isCourse ? (
                            <span className={styles.textOneLine}> ความยาวตอน   {data && data.time} ชั่วโมง</span>
                        ) : (
                            <span className={styles.textOneLine}><FontAwesomeIcon icon={faBookReader} className={styles.icon} />   {data && data?.grade.title} , {data && data?.subject.title}</span>
                        )
                    } </Col>
                <Col className={styles.paddingTop} span={24} >
                    
                    <span><FontAwesomeIcon icon={!isCourse ? faCoins : faVideo} className={styles.icon} /> {!isCourse ? data.cost : data.numberOfVideo}</span>
                </Col>
            </Col>
        </Row>
    )
}


