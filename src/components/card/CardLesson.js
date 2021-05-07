import React from "react"
import { Card,Image,Row,Col,Grid} from "antd";
import styles from "./styles.module.scss"
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { useBreakpoint } = Grid;

export default function CardLesson({data}) {
    const screens = useBreakpoint();
    return (
            <Card  className={screens.xs? (styles.cardLessonXS):(styles.cardLesson)} >
                <Row>
                    <Col xs={13} sm={10} md={10} lg={10} xl={10} className={styles.gridImage}>
                        <Image
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            className={styles.imageClip}
                            preview={false}
                        />                    
                    </Col>
                    <Col xs={11} sm={14} md={14} lg={14} xl={14} style={{paddingTop:"0.5rem"}}>
                        <Col className={styles.titleH5} span={24}>{data && data.title}</Col>
                        <Col className={styles.textNormal} span={24}>ตอนที่ {data && data.episode}</Col>
                        <Col span={24} className={styles.textSmall} style={{marginTop:"0.5rem"}} >
                            ความยาวตอน   {data && data.time} ชั่วโมง</Col>
                        <Col span={24} style={{marginTop:"0.5rem"}}>
                            <FontAwesomeIcon icon={faCoins} className={styles.rate}/>
                            <span className={styles.textIcon}>ฟรี</span>
                        </Col>
                    </Col>
                </Row>
            </Card>
    )
}