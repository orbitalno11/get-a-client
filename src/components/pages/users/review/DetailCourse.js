import React, { Fragment } from "react"
import { Grid, Row } from "antd"
import {
    faBook,
    faBookReader,
    faClock,
    faCoins,
    faStar,
    faUser,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import { useSelector } from "react-redux";
import { color } from "../../../defaultValue";

const { useBreakpoint } = Grid;

export default function DetailCourse() {
    const screens = useBreakpoint();
    const course = useSelector(state => state.offlineCourse.data)
    const owner = course && course.owner

    return (
        <Fragment>
            <div className={screens.md ? `${style.marginTop20} ${style.borderOrange}` : null} >
                <div>
                    <Row className={!screens.md && style.horizontalCenter} >
                        <span className={style.titleH2}>{course && course.name}</span>
                    </Row>
                    <div className={screens.xs || (screens.sm && !screens.md) ? style.paddingbody : null}>
                        {course ?
                            (
                                <div className={(screens.xs || (screens.sm && !screens.md)) ? style.marginTop20 : style.contrainnerProfilePubile}>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faUser} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.owner.fullName}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.grade.value}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.timeText}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faUserFriends} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.studentNumber}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.subject.value}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <FontAwesomeIcon icon={faCoins} className={style.iconmarker} />
                                        <span className={style.textNormal}>{course && course.costText}</span>
                                    </div>
                                    <div className={style.TitleCoin}>
                                        <Rate className={style.titleH3} defaultValue={course && course.rating} allowHalf disabled />
                                    </div>
                                </div>
                            )
                            : (
                                <Fragment>
                                    <SkeletonComponent.SkeletonTextDetail/>
                                    <SkeletonComponent.SkeletonTextDetail/>
                                    <SkeletonComponent.SkeletonTextDetail/>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
