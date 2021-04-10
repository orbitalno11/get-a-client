import React from "react"
import { Card, Typography, Image } from "antd";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import profileSample from "../images/profile.webp"
const { Title } = Typography;

export default function CardOnlineCourse({ data, profile, width }) {
    return (
        <Card className={styles.cardRound}>
            <Card.Grid hoverable={false} className={styles.gridImage} >
                <Image
                    src={profileSample}
                    className={styles.imageClip}
                    preview={false}
                />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridRow}>
                <span className={styles.titleH4}>โครงสร้างอะตอม</span>
                <span className={styles.textNormal}>ตอนที่ 2</span>
                <span className={styles.textSmall}>ความยาวตอน 1 ชม.</span>
                <span className={styles.textSmall}>
                    <FontAwesomeIcon icon={faCoins} className={styles.iconyellow}/> 
                    ฟรี
                </span>
            </Card.Grid>
        </Card>
    )
}