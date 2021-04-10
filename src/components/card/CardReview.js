import React from "react"
import { Card, Rate, Typography } from "antd";
import styles from "./styles.module.scss"
const { Title } = Typography;

export default function CardReview() {
    return (
        <Card className={styles.cardRoundReview} >
            <Card.Grid hoverable={false} className={styles.gridhalf}>
            <Rate disabled defaultValue={2} />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
               <span className={styles.floatRight}>วันที่ 01/01/2563</span> 
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <span className={styles.textIcon}>สอนดีมากเลยค่ะ สนุกมากๆค่ะ กร๊าวใจสาวดี กร๊๊ดดดดดดดดดดดดดดดดดดดดดดดดดดดดด</span>
            </Card.Grid>
        </Card>
    )
}
