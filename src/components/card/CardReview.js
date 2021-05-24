import React from "react"
import { Card, Rate } from "antd";
import styles from "./styles.module.scss"

export default function CardReview({ data, myReview, handleEdit }) {
    return (
        <Card className={styles.card} >
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <Rate disabled defaultValue={data.rating} className={styles.rate} />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridhalf}>
                <span className={styles.floatRight}>วันที่ {new Date(data.reviewDate).toLocaleDateString()}</span>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <u onClick={() => handleEdit(data.id, "edit")} className={styles.textLink}>
                    {myReview && "(แก้ไขความคิดเห็นของคุณ)"}
                </u>
                <u onClick={() => handleEdit(data.id,"delete")} className={styles.textLinkDelete}>
                    {myReview && "(ลบความคิดเห็น)"}
                </u>
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles.gridfull}>
                <span className={styles.textReview}>
                    {data.review}
                </span>
            </Card.Grid>
        </Card>
    )
}
