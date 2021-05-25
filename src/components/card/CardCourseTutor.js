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
            <Col span={8}>
                <span  className={`${styles.cutText1Line}`} style={{ float: "right" }}>
                    <FontAwesomeIcon icon={faStar} className={styles.icon} style={{ color: color.yellow }} />
                    {data.rating} </span></Col>

            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                {findKeyObject(defaultValue.grade, data.grade.grade)}, {data.subject.title}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                <span className={`${styles.cutText1Line}`}>
                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                    {data.costText}
                </span>

            </Col>
            <Col span={24}>
                <span className={`${styles.cutText1Line}`}>
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    {data.timeText}
                </span>
            </Col>
        </Row>
    )
}
