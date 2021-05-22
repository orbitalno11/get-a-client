import React from "react"
import { Image, Row, Col, Grid } from "antd";
import styles from "./styles.module.scss"
import { faBook, faBookReader, faCoins, faStar, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import vdoSample from "../images/vdoSample.webp"
import profileSample from "../images/profile.webp"
import isMobile from "../isMobile/isMobile";
import { Fragment } from "react";
import { useHistory } from "react-router";
import findKeyObject from "../defaultFunction/findKeyObject";
import { defaultValue } from "../defaultValue";
const { useBreakpoint } = Grid;

export default function CardLesson({ data, isCourse, search, course }) {
    const screens = useBreakpoint();
    const history = useHistory()

    const redirectToCoursePage = () => {
        history.push(`/online/${data.id}`)
    }
 
    return (
        <Row className={(isMobile() || search || course) ? `${styles.card} ${styles.paddingOne}` : styles.fullWidth} justify={"center"} onClick={() => redirectToCoursePage()} align="middle" >
            <Col lg={4} md={3} sm={3} xs={3} align="center">
                <Image
                    src={data.coverUrl ? data.coverUrl : vdoSample}
                    className={styles.imageClip}
                    preview={false}
                />
            </Col>
            <Col lg={15} md={15} sm={15} xs={15} align="start" className={styles.marginLeftThree}>
                <Row align="middle">
                    <Col span={13} >
                        <span className={`${styles.textOne75} ${styles.textTwoLine}`}>{data.name}</span>
                    </Col>
                    {
                        !course && (
                            <Col span={11} align="end" push={1}>
                                <div className={`${styles.textTwo} ${styles.textOneLine}`} >
                                    <FontAwesomeIcon icon={faStar} className={`${styles.icon} ${styles.colorYellow} ${styles.textOne75}`} />
                                    <span className={`${styles.textTwo} ${styles.marginLeftOneHalf}`}>
                                        {data.rating}
                                    </span>
                                </div>
                            </Col>
                        )
                    }
                    {
                        (screens.lg && !search && !course) && (
                            <Col span={12} className={`${styles.paddingTopHalf} ${styles.textOneLine}`}  >
                                <FontAwesomeIcon icon={faBookReader} className={styles.grayIcon} />
                                <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}> {data?.grade && findKeyObject(defaultValue.shortGrade,data?.grade?.grade)}</span>
                            </Col>
                        )
                    }
                    {
                        (screens.lg && !search) && (
                            <Col className={`${styles.paddingTopHalf}  ${styles.textOneLine}`} span={12}>
                                <FontAwesomeIcon icon={!isCourse ? faCoins : faUsers} className={styles.grayIcon} />
                                <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}> {!isCourse ? data.cost : data.numberOfView}</span>
                            </Col>
                        )
                    }
                    {(isCourse || search) && (
                        <Col className={`${styles.paddingTopHalf}  ${styles.textOneLine}`} xs={24} sm={24} md={24} lg={12}>
                            <FontAwesomeIcon icon={faBook} className={styles.grayIcon} />
                            <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>{data.subject.title} </span>
                        </Col>
                    )
                    }
                    {(isCourse && screens.lg) &&
                        <Fragment>
                            <Col className={`${styles.paddingTopHalf}  ${styles.textOneLine}`} span={12}>
                                <FontAwesomeIcon icon={faVideo} className={styles.grayIcon} />
                                <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>{data.numberOfVideo} </span>
                            </Col>
                        </Fragment>
                    }
                    {((isCourse && !screens.lg) || search) &&
                        <Fragment>
                            <Col className={`${styles.paddingTopHalf}  ${styles.textOneLine}`} span={24}>
                                <Image
                                    src={data ? data?.owner?.picture : profileSample} 
                                    className={styles.imageIcon}
                                    preview={false}
                                />
                                <span className={`${styles.text18} ${styles.marginLeftOneHalf}`}>{data && data?.owner?.fullNameText} </span>
                            </Col>
                        </Fragment>
                    }
                </Row>

            </Col>
        </Row>
    )
}