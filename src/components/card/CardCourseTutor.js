import React from "react"
import { Row, Col } from "antd";
import styles from "./styles.module.scss"
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookReader,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

export default function CardCourseTutor({ data }) {
    const history = useHistory();

    const redirectToCoursePage = () => {
        history.push(`/course/${data.id}`)
    }

    return (
        <Row className={styles.CardCourseTutor} onClick={()=>redirectToCoursePage()}>
            <Col span={24}>
                <span className={styles.titleH4}>{data.name}</span>
                <span style={{ float: "right" }}> 5 ดาว</span>
            </Col>

            <Col span={12}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                {findKeyObject(defaultValue.grade, data.grade.grade)}, {data.subject.title}
            </Col>
            <Col >{data.costText}</Col>
            <Col span={24}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                {data.timeText}
            </Col>
        </Row>
    )
}
