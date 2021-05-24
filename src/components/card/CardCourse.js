import React, { Fragment } from "react"
import { Badge, Col, Row } from "antd";
import styles from "./styles.module.scss"
import {
    faBookReader,
    faClock,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";

export default function CardCourse({ data, isClip }) {

    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} style={{ width: "100%" }}>
            <Col span={24} className={styles.paddingTop} align="start">
                <Badge count={data ? data.requestNumber : 0} offset={[10, 10]} >
                    <span className={`${styles.titleH5s} ${styles.cutText1Line}`}>{data.name}</span>
                </Badge>
            </Col>
            <Col className={styles.paddingTop} span={24} align="start">
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                <span className={styles.marginLeft}>{data && data.grade.title} , {data && data.subject.title}</span>
            </Col>

            <Fragment>
                <Col className={styles.paddingTop} span={24} align="start">
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    <span className={styles.marginLeft}>  {data && data.timeText}</span>
                </Col>
                <Col className={styles.paddingTop} align="start">
                    <FontAwesomeIcon icon={faUsers} className={styles.icon} />
                    <span className={styles.marginLeft}>{data && findKeyObject(defaultValue.type, data.courseType)}</span>
                </Col>
            </Fragment>

        </Row>
    )
}
