import React from "react"
import { Col, Rate, Row } from "antd";
import styles from "./styles.module.scss"
import isMobile from "../isMobile/isMobile"
import { useState } from "react";

export default function CardReview({ data, myReview, handleEdit }) {

    const [showMessage, setShowMessage] = useState(false)

    const showtext = {
        display: showMessage ? "block" : "-webkit-box"
    }

    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} >
            <Col lg={15} md={15} sm={15} xs={24}>
                <span className={`${styles.titleH5} ${styles.textOneLine}`}>
                    {data.reviewer.fullName}
                </span>
            </Col>
            <Col lg={9} md={9} sm={9} xs={24} align={isMobile() ? "start" : "end"}>
                <span className={styles.floatRight}>วันที่ {new Date(data.reviewDate).toLocaleDateString()}</span>
            </Col>
            <Col lg={24} md={24} sm={24} xs={24} className={styles.marginTop1}>
                <Rate disabled value={data.rating} className={styles.rate} />
            </Col>

            {myReview && (
                <Col lg={24} md={24} sm={24} xs={24}>
                    <u onClick={() => handleEdit(data.id, "edit")} className={styles.textLink}>
                        {myReview && "(แก้ไขความคิดเห็นของคุณ)"}
                    </u>
                    &nbsp;
                    <u onClick={() => handleEdit(data.id, "delete")} className={styles.textLinkDelete}>
                        {myReview && "(ลบความคิดเห็น)"}
                    </u>
                </Col>
            )}
            <Col lg={24} md={24} sm={24} xs={24} id="comment" >
                <span className={`${styles.textNormal} ${styles.textThreeLine}`} style={showtext}>
                    {data.review}
                </span>
                <u onClick={() => setShowMessage(!showMessage)}>{showMessage ? "ย่อความคิดเห็น" : "ดูความเห็นเพิ่มเติม"}</u>
            </Col>
        </Row>
    )
}
