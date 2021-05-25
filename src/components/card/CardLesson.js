import React from "react"
import { Image, Row, Col } from "antd";
import styles from "./styles.module.scss"
import { faBookReader, faCoins, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

export default function CardLesson({ data, isCourse }) {

    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} align="middle">
            <Col xs={9} sm={8} md={8} lg={10} xl={10}>
                <Image
                    src={data ? data.coverUrl : ""}
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col xs={15} sm={14} md={14} lg={12} xl={14} align="start" className={styles.marginLeft}>
                <Col span={24}>
                    <span className={`${styles.titleH5} ${styles.cutText1Line}`}>{data && data.name}</span>
                </Col>
                <Col span={24} className={`${styles.paddingTop} ${styles.textNormal} ${styles.cutText1Line}`}  >
                    {
                        !isCourse ? (
                            <span > ความยาวตอน   {data && data.time} ชั่วโมง</span>
                        ) : (
                            <Fragment>
                                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                                <span className={styles.marginLeft}>{data && data.grade.title} , {data && data.subject.title}</span>
                            </Fragment>
                        )
                    } </Col>
                <Col className={styles.paddingTop} span={24} >
                    <FontAwesomeIcon icon={!isCourse ? faCoins : faClock} className={styles.icon} />
                    <span className={styles.marginLeft}>ฟรี</span>
                </Col>
            </Col>
        </Row>
    )
}


