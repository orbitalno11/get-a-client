import React from "react"
import { Row, Col } from "antd";
import styles from "./styles.module.scss"
import findKeyObject from "../defaultFunction/findKeyObject";
import { color, defaultValue } from "../defaultValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookReader,
    faClock,
    faCoins,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

export default function CardCourseTutor({ data }) {
    const history = useHistory();

    const redirectToCoursePage = () => {
        history.push(`/course/${data.id}`)
    }

    return (
        <Row className={styles.CardCourseTutor} onClick={() => redirectToCoursePage()}>
            <Col span={19}>
                <span className={`${styles.titleH4} ${styles.textOneLine}`}>{data.name}</span>
            </Col>
            <Col span={5}>
                <span className={styles.textNormal} style={{ float: "right" }}>
                    <FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} />
                    {data.rating} </span></Col>

            <Col span={12}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                {findKeyObject(defaultValue.grade, data.grade.grade)}, {data.subject.title}
            </Col>
            <Col >
                <span>
                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                    {data.costText}
                </span>

            </Col>
            <Col span={24}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                {data.timeText}
            </Col>
        </Row>
    )
}
