import React, { Fragment } from "react"
import { Col, Grid, Image, Row, Space } from "antd"
import {
    faBook,
    faBookReader,
    faClock,
    faEye,
    faStar,
    faUsers,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../styles.module.scss";
import { useSelector } from "react-redux";
import { SkeletonComponent } from "../../../../loading/SkeletonComponent";
import profileSample from "../../../../images/profile.webp"
import { color } from "../../../../defaultValue";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { styleComponent } from "../../../../defaultFunction/style";
const { useBreakpoint } = Grid;

export default function DetailCourse() {
    const { type } = useParams();
    const [course, setCourse] = useState()
    const { onlineCourse, offlineCourse } = useSelector(state => state)
    const owner = !isEmpty(course) && course.owner
    const isOfflineCourse = type === "course"
    const screens = useBreakpoint();

    useEffect(() => {
        if (isOfflineCourse) {
            setCourse(offlineCourse.data && offlineCourse.data)
        } else {
            setCourse(onlineCourse.data && onlineCourse.data)
        }
    }, [onlineCourse, offlineCourse])

    const textCheckNull = (text) => {
        return (
            course ? (
                <span className={style.textOne5}>{text}</span>
            ) : (<SkeletonComponent.SkeletonText />)
        )
    }

    return (
        <Fragment>
            {
                <Row justify={"space-between"} align="middle">
                    {
                        !isOfflineCourse && (
                            <Col lg={6} md={7} sm={24} xs={24} align="center">
                                <Image
                                    className={style.a4Image}
                                    src={course?.coverUrl}
                                />
                            </Col>
                        )
                    }
                    <Col xl={isOfflineCourse ? 24 : 17} lg={isOfflineCourse ? 24 : 15} md={isOfflineCourse ? 24 : 15} sm={24} xs={24}>
                        <Row className={((!screens.md && !isOfflineCourse)) && style.paddingTopOne}>
                            <Col span={24} align={screens.md ? "start" : "center"} >
                                {
                                    course ? (
                                        <span className={`${!screens.md ? style.headerThree : style.headerFour} ${style.textLineHeight}`}>{course.name}</span>
                                    ) : (<SkeletonComponent.SkeletonText />)
                                }
                            </Col>
                            <Col span={24} className={style.paddingTopHalf} align={screens.md ? "start" : "center"}>
                                {
                                    course ? (
                                        <span className={style.textOne25}>{course.description} </span>
                                    ) : (
                                        <SkeletonComponent.SkeletonText />
                                    )
                                }
                            </Col>

                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf}>
                                <Image
                                    src={owner ? owner.picture : profileSample}
                                    className={style.imageIcon}
                                    preview={false}
                                />
                                {textCheckNull(owner?.fullNameText)}
                            </Col>
                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf}>
                                <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                                {textCheckNull(course?.grade?.title)}
                            </Col>
                            {
                                isOfflineCourse && (
                                    <Col xs={24} md={12} xl={12} className={style.paddingTopOneHalf}>
                                        <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                        { textCheckNull(course?.timeText)}
                                    </Col>
                                )
                            }
                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf}>
                                <FontAwesomeIcon icon={isOfflineCourse ? faUsers : faEye} className={style.iconmarker} />
                                {textCheckNull(isOfflineCourse ? (course?.studentNumber) : (course?.numberOfView))}
                            </Col>
                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf}>
                                <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                {textCheckNull(course?.subject?.title)}
                            </Col>
                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf}>
                                <Space align="center" direction="horizontal">
                                    {
                                        isOfflineCourse ? (<styleComponent.iconCoin size="large" />) : (<FontAwesomeIcon icon={faVideo} className={style.iconmarker} />)
                                    }
                                    {textCheckNull(isOfflineCourse ? (course?.costText) : (course?.numberOfVideo))}
                                </Space>
                            </Col>
                            <Col xs={24} md={12} xl={isOfflineCourse ? 6 : 8} className={style.paddingTopOneHalf} >
                                <FontAwesomeIcon icon={faStar} className={style.iconmarker} style={{ color: color.yellow }} />
                                {textCheckNull(course?.rating)}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
        </Fragment>
    )
}