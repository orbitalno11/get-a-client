
import React from "react"
import { Row, Col } from "antd";
import styles from "./styles.module.scss"
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookReader,
    faClock,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import isMobile from "../isMobile/isMobile";
import { styleComponent } from "../defaultFunction/style";

export default function CardCourseTutor({ data, search }) {
    const history = useHistory();

    const redirectToCoursePage = () => {
        history.push(`/course/${data.id}`)
    }

    return (
        <Row className={(isMobile() || search) ? `${styles.card} ${styles.paddingOne}` : styles.fullWidth} onClick={() => redirectToCoursePage()} align="middle">
            <Col span={16} >
                <span className={`${styles.textTwo} ${styles.textOneLine}`}>{data.name}</span>
            </Col>
            <Col span={8}>
                <div className={`${styles.textTwo} ${styles.textOneLine} ${styles.floatRight}`}>
                    <FontAwesomeIcon icon={faStar} className={`${styles.icon} ${styles.colorYellow} ${styles.textOne75}`} />
                    <span className={`${styles.textTwo} ${styles.marginLeftOneHalf}`}>
                        {data.rating}
                    </span>
                </div>
            </Col>
            <Col span={24} >
                <Row align="middle" justify={"space-between"}>
                    <Col xl={search ? 12 : 6} lg={search ? 12 : 6} md={12} sm={12} xs={24} >
                        <div className={`${styles.textOneLine} ${styles.marginTopHalf}`}>
                            <FontAwesomeIcon icon={faBookReader} className={`${styles.grayIcon}`} />
                            <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>
                                {findKeyObject(defaultValue.grade, data.grade.grade)}, {data.subject.title}
                            </span>
                        </div>

                    </Col>
                    <Col  xl={search ? 12 : 7} lg={search ? 12 : 7} md={12} sm={12} xs={24} >
                        <div className={`${styles.textOneLine} ${styles.marginTopHalf}`}>
                            <span >
                                <styleComponent.iconCoin size={27} gray/>
                            </span>
                            <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>
                                {data.costText}
                            </span>
                        </div>
                    </Col>
                    <Col xl={search ? 24 : 9} lg={search ? 24 : 9} md={24} sm={24} xs={24} >
                        <div className={`${styles.textOneLine} ${styles.marginTopHalf}`}>
                            <FontAwesomeIcon icon={faClock} className={`${styles.grayIcon}`} />
                            <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>
                                {data.timeText}
                            </span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}