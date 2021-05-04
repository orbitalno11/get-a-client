import React from "react"
import { Card} from "antd";
import styles from "./styles.module.scss"
import {
    faBookReader,
    faClock,
    faCoins,
    faBell,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardCourse({data}) {

    return (
        <Card className={styles.cardCourse} >
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <span className={styles.titleH5}>{data && data.subject}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
               <FontAwesomeIcon icon={faBell} className={styles.floatBell} />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon}/>
                <span className={styles.textIcon}>{data && data.grade} , {data && data.name}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <FontAwesomeIcon icon={faCoins} className={styles.icon}/>
                <span className={styles.textIcon}>{data && data.cost} บาท/ชั่วโมง</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <FontAwesomeIcon icon={faUsers} className={styles.icon}/>
                <span className={styles.textIcon}>{data && data.type}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <FontAwesomeIcon icon={faClock} className={styles.icon}/>
                <span className={styles.textIcon}>{data && data.dateOfWeek}  {data && data.startTime} - {data && data.endTime} น.</span>
            </Card.Grid>
        </Card>
    )
}
