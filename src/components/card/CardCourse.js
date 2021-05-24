import React, { Fragment } from "react"
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

export default function CardCourse({ data, isClip }) {

    return (
        <Card className={styles.cardCourse} style={{ width: "100%" }}>
            <Card.Grid hoverable={false} className={styles.gridfull}>
            <Badge count={data ? data.requestNumber : 0} offset={[10, 10]} >
                <span className={`${styles.titleH5} ${styles.textOneLine}`}>{data && data.name}</span>
                </Badge>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull} align="start">
                <FontAwesomeIcon icon={faBookReader} className={styles.icon} />
                <span className={styles.marginLeft}>{data && data.grade.title} , {data && data.subject.title}</span>
            </Card.Grid>
            {
                isClip ?
                    (
                        <Card.Grid hoverable={false} className={styles.gridfull} align="start">
                            <FontAwesomeIcon icon={faClock} className={styles.icon} />
                            <span className={styles.marginLeft}>  {data && data.episode}</span>
                        </Card.Grid>
                    ) : (
                        <Fragment>
                            <Card.Grid hoverable={false} className={styles.gridfull} align="start">
                                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                                <span className={styles.marginLeft}>  {data && data.timeText}</span>
                            </Card.Grid>
                            <Card.Grid hoverable={false} className={styles.gridhalf} align="start">
                                <FontAwesomeIcon icon={faUsers} className={styles.icon} />
                                <span className={styles.marginLeft}>{data && findKeyObject(defaultValue.type, data.courseType)}</span>
                            </Card.Grid>
                        </Fragment>
                    )
            }

        </Card>
    )
}
