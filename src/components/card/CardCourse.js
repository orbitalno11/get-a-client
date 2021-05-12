import React from "react"
import { Badge, Card } from "antd";
import styles from "./styles.module.scss"
import {
    faBookReader,
    faClock,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";

export default function CardCourse({ data }) {

    const width = {
        width : "20rem"
    }

    return (
        <Card className={styles.cardCourse} style={width}>
            <Card.Grid hoverable={false} className={styles.gridfull}>
            <Badge count={data ? data.requestNumber : 0} offset={[10, 10]} >
                <span className={styles.titleH5}>{data && data.name}</span>
                </Badge>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                <span className={styles.marginLeft}>{data && data.grade.title} , {data && data.subject.title}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                <span className={styles.marginLeft}>  {data && data.timeText}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <FontAwesomeIcon icon={faUsers} className={styles.icon} />
                <span  className={styles.marginLeft}>{data && findKeyObject(defaultValue.type, data.courseType)}</span>
            </Card.Grid>
        </Card>
    )
}
