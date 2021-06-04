
import React from "react"
import { Row, Col } from "antd";
import styles from "./styles.module.scss"
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookReader,
    faClock,
    faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Fragment } from "react";
import { styleComponent } from "../defaultFunction/style";

export default function CardCourseTutor({ data, search }) {
    const history = useHistory();

    const redirectToCoursePage = () => {
        history.push(`/course/${data.id}`)
    }

    return (
        <Row className={styles.CardCourseTutor} onClick={() => redirectToCoursePage()}>
            <Col span={16}>
                <span className={`${styles.titleH4} ${styles.textOneLine}`}>{data.name}</span>
            </Col>
            <Col span={8}>
                <div align="end">
                    <styleComponent.iconStar />
                    <span className={`${styles.marginLeftOneHalf} ${styles.textOne}`} >
                        {data.rating} </span>
                </div>
            </Col>

            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                {
                    search && (
                        <Fragment>
                            <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                            {data.owner.fullNameText}
                        </Fragment>
                    )
                }
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                <Fragment>
                    <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                    {findKeyObject(defaultValue.grade, data.grade.grade)}, {data.subject.title}
                </Fragment>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24} >
                <span className={`${styles.textOneLine}`}>
                    <FontAwesomeIcon icon={faCoins} className={styles.icon} />
                    {data.costText}
                </span>

            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <span className={`${styles.textOneLine}`}>
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    {data.timeText}
                </span>
            </Col>
        </Row>
    )
}