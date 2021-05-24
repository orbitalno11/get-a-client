import React from "react"
import { Image, Row, Col } from "antd";
import styles from "./styles.module.scss"
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "../defaultValue";

export default function CardLesson({ data }) {
    const colorFont = {
        color : color.black
    }
        return (
        <Row className={`${styles.card} ${styles.paddingCard} `} style={colorFont} align="middle">
            <Col xs={8} sm={8} md={8} lg={8} xl={10}>
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col xs={15} sm={14} md={14} lg={14} xl={14} style={{ paddingLeft: "1.75rem" }} align="start">
                <Col className={`${styles.titleH5} ${styles.cutText1Line}`} span={24}>{data && data.title}</Col>
                <Col className={styles.textNormal} span={24}>ตอนที่ {data && data.episode}</Col>
                <Col span={24} className={`${styles.textSmall} ${styles.cutText1Line}`} style={{ marginTop: "0.5rem" }} >
                    ความยาวตอน   {data && data.time} ชั่วโมง</Col>
                <Col span={24} style={{ marginTop: "0.5rem" }}>
                    <FontAwesomeIcon icon={faCoins} className={styles.rate} />
                    <span className={styles.textIcon}>ฟรี</span>
                </Col>
            </Col>
        </Row>
    )
}