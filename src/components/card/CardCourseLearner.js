import React from "react"
import { Col, Image, Row } from "antd";
import styles from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLocationArrow, faStar } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { color } from "../defaultValue";

export default function CardCourseLearner({ data }) {
    const history = useHistory();
    const redirectToCoursePage = () => {
        history.push(`/profile/${data.id}/course`)
    }

    return (
        <div className={styles.cardRound} style={{ padding: '1rem', width: "18rem", height: "13rem" }} onClick={() => redirectToCoursePage()}>
            <Row align="center">
                <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className={styles.image}
                    preview={false}
                />
                <Col span={24} align="center">
                    <span className={styles.titleH4}>{data && data.fullNameText}</span>
                </Col>

                <Col span={24} align="center">
                    <span> 
                    <FontAwesomeIcon icon={faStar} className={styles.icon} style={{color:color.yellow}}/>
                        {data && data.rating}
                        </span>
                </Col>
            </Row>
            <Row>
                <Col span={12} align="center">

                    <span> <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} /> {data.address ? data.address.district.title : "ยังไม่ได้กำหนด"}</span>
                </Col>
                <Col span={12} align="center">
                    <span> <FontAwesomeIcon icon={faBook} className={styles.icon} /> {data && data.subject.title}</span>
                </Col>
            </Row>
        </div>

    )
}
