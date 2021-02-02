import React from "react"
import { Card, Typography } from "antd";
import styles from "./styles.module.scss"
import {
    faBookReader,
    faClock,
    faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Title } = Typography;


export default function CardCorseTutor() {

    return (
        <Card className={styles.cardRound} >
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <Title level={3}>คณิตศาสตร์</Title>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
               <span className={styles.floatRight}>5 ดาว</span> 
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <FontAwesomeIcon icon={faBookReader} className={styles.icon}/>
                <span className={styles.textIcon}>ม.6, Admission</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
            <FontAwesomeIcon icon={faCoins} className={styles.icon}/>
                <span className={styles.textIcon}>300 บาท/ชั่วโมง</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
            <FontAwesomeIcon icon={faClock} className={styles.icon}/>
                <span className={styles.textIcon}>จันทร์, อังคาร 13.30น. - 16.00น.</span>
            </Card.Grid>
        </Card>
    )
}
