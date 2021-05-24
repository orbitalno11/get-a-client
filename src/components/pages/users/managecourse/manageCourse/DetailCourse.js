import React, { Fragment } from "react"
import { Col, Image, Row } from "antd"
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

export default function DetailCourse() {
    const { type } = useParams();
    const [course, setCourse] = useState()
    const { onlineCourse, offlineCourse } = useSelector(state => state)
    const owner = !isEmpty(course) && course.owner
    const isOfflineCourse = type === "course"

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
                                <span className={style.titleH2}>{course.name}</span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </Row>
                    <Row >
                        {
                            course ? (
                                <span className={style.textNormal}>{course.description} </span>
                            ) : (
                                <SkeletonComponent.SkeletonText />
                            )
                        }
                    </Row>
                    <Row >
                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <Image
                                src={owner ? owner.picture : profileSample}
                                className={style.imageIcon}
                                preview={false}
                            />
                            {
                                course ? (
                                    <span className={style.textNormal}>{owner.fullNameText}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textNormal}>{course.grade.title} </span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        {
                            isOfflineCourse && (
                                <Col xs={24} md={12} xl={12} className={style.TitleCoin}>
                                    <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                    {
                                        course ? (
                                            <span className={style.textNormal}>{course.timeText}</span>
                                        ) : (
                                            <SkeletonComponent.SkeletonText />
                                        )
                                    }
                                </Col>
                            )
                        }
                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faUserFriends} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textNormal}>{isOfflineCourse ? course.studentNumber : course.numberOfView}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textNormal}>{course.subject.title}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>
                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <FontAwesomeIcon icon={isOfflineCourse ? faCoins : faVideo} className={style.iconmarker} />
                            {
                                course ? (
                                    <span className={style.textNormal}>{isOfflineCourse ? course.costText : course.numberOfVideo}</span>
                                ) : (
                                    <SkeletonComponent.SkeletonText />
                                )
                            }
                        </Col>

                        <Col xs={24} md={12} xl={6} className={style.TitleCoin}>
                            <FontAwesomeIcon icon={faStar} className={style.iconmarker} style={{ color: color.yellow }} />
                            {
                                course ? (
                                    <span className={style.textNormal}>{course.rating}</span>
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