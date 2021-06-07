import React, { Fragment } from "react"
import { Col, Grid, Image, Row } from "antd"
import {
    faBook,
    faBookReader,
    faClock,
    faCoins,
    faStar,
    faUserFriends,
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

    return (
        <Fragment>
            {
                <Fragment>
                    <Row >
                        {
                            course ? (
                                <span className={`${!screens.md ? style.headerThree :style.headerFour} ${style.textLineHeight}`}>{course.name}</span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </Row>
                    <Row className={style.paddingTopHalf}>
                        {
                            course ? (
                                <span className={style.textOne25}>{course.description} </span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </Row>
                    <Row >
                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf}>
                            <Image
                                src={owner ? owner.picture : profileSample}
                                className={style.imageIcon}
                                preview={false}
                            />
                            {
                                course ? (
                                    <span className={style.textOne5}>{owner.fullNameText}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf}>
                            <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textOne5}>{course.grade.title} </span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        {
                            isOfflineCourse && (
                                <Col xs={24} md={12} xl={12} className={style.paddingTopOneHalf}>
                                    <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                    {
                                        course ? (
                                            <span className={style.textOne5}>{course.timeText}</span>
                                        ) : (
                                            <SkeletonComponent.SkeletonText />
                                        )
                                    }
                                </Col>
                            )
                        }
                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf}>
                            <FontAwesomeIcon icon={faUserFriends} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textOne5}>{isOfflineCourse ? course.studentNumber : course.numberOfView}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf}>
                            <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textOne5}>{course.subject.title}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf}>
                            <FontAwesomeIcon icon={isOfflineCourse ? faCoins : faVideo} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textOne5}>{isOfflineCourse ? course.costText : course.numberOfVideo}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>

                        <Col xs={24} md={12} xl={6} className={style.paddingTopOneHalf} >
                            <FontAwesomeIcon icon={faStar} className={style.iconmarker} style={{ color: color.yellow }} />
                            {
                                course ? (
                                    <span className={style.textOne5}>{course.rating}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                    </Row>
                </Fragment>
            }
        </Fragment>
    )
}