import React from "react"
import { Image, Row, Col } from "antd";
import styles from "./styles.module.scss"
import { faBookReader, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

export default function CardLesson({ data, isCourse }) {

    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} align="middle">
            <Col xs={9} sm={8} md={8} lg={10} xl={10}>
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col xs={15} sm={14} md={14} lg={12} xl={14} align="start" style={{paddingLeft:"0.5rem"}}>
                <Col className={`${styles.titleH5} ${styles.cutText1Line}`} span={24}>
                    {data && data.title}
                </Col>
                <Col className={styles.paddingTop} span={24}>{!isCourse ?"ตอนที่ "+data.episode : data.name}</Col>
                <Col span={24} className={`${styles.textSmall} ${styles.cutText1Line}`} style={{ marginTop: "0.5rem" }} >
                    {
                        !isCourse ? (
                           <span> ความยาวตอน   {data && data.time} ชั่วโมง</span>
                        ) : (
                            <Fragment>
                                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                                <span className={styles.marginLeft}>{data && data.grade.title} , {data && data.subject.title}</span>
                            </Fragment>
                        )
                    } </Col>
                <Col className={styles.paddingTop} span={24} >
                    <FontAwesomeIcon icon={faCoins} className={styles.rate} />
                    <span className={styles.textIcon}>ฟรี</span>
                </Col>
            </Col>
        </Row>
    )
}


