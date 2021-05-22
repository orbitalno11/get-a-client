import React from "react"
import { Image, Row, Col } from "antd";
import styles from "./styles.module.scss"
import { faBookReader, faCoins, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import vdoSample from "../images/vdoSample.webp"
import { styleComponent } from "../defaultFunction/style";

export default function CardLesson({ data, isCourse, search }) {
    return (
        <Row className={`${styles.card} ${styles.paddingCard}`} align="middle">
            <Col xs={8} sm={8} md={8} lg={9} xl={9}>
                <Image
                    src={data.coverUrl ? data.coverUrl : vdoSample}
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col xs={15} sm={15} md={15} lg={12} xl={14} align="start" className={styles.marginLeft}>
                <Row align="middle">
                    <Col span={search ? 16 : 24} className={styles.textOneLine}>
                        <span className={`${styles.headerOne75} `}>{data && data.name}</span>
                    </Col>
                    {
                        search && (
                            <Col span={6} >
                                <div align="end">
                                   <styleComponent.iconStar/>
                                    <span className={`${styles.marginLeftOneHalf} ${styles.textOne}`} >
                                        {data.rating} </span>
                                </div>
                            </Col>
                        )
                    }
                </Row>

                <Col span={24} className={`${styles.paddingTop} ${styles.textNormal} ${styles.textOneLine}`}  >
                    {
                        !isCourse ? (
                            <span className={`${styles.textOneLine} ${styles.textOne}`}> ความยาวตอน   {data && data.time} ชั่วโมง</span>
                        ) : (
                            <span className={`${styles.textOneLine} ${styles.textOne}`}><FontAwesomeIcon icon={faBookReader} className={styles.icon} />   {data && data?.grade.title} , {data && data?.subject.title}</span>
                        )
                    }
                </Col>
                <Col className={styles.paddingTop} span={24} >

                    <span className={`${styles.textOneLine} ${styles.textOne}`}><FontAwesomeIcon icon={!isCourse ? faCoins : faVideo} className={styles.icon} /> {!isCourse ? data.cost : data.numberOfVideo}</span>
                </Col>
            </Col>
        </Row>
    )
}
