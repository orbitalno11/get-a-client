import React, { Fragment } from "react"
import { Grid, Row, Rate } from "antd"
import {
    faBook,
    faBookReader,
    faClock,
    faCoins,
    faUser,
    faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./styles.module.scss"
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;

export default function DetailCourse() {
    const screens = useBreakpoint();
    const course = useSelector(state => state.offlineCourse.data)

    return (
        <Fragment>
            <div className={screens.md ? `${style.marginTop20} ${style.borderOrange}` :null} >
            {
                    course && (
                        <div>
                            <Row className={!screens.md && style.alignCenter} >
                                <span className={style.titleH2}>{course.name}</span>
                            </Row>
                            <div className={screens.xs || (screens.sm && !screens.md) ? style.paddingbody : null}>
                                <div >
                                    <div className={(screens.xs || (screens.sm && !screens.md)) ? style.marginTop20 : style.contrainnerProfilePubile}>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faUser} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.owner.fullName}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faBookReader} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.grade.value}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faClock} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.timeText}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faUserFriends} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.studentNumber}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faBook} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.subject.value}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                            <FontAwesomeIcon icon={faCoins} className={style.iconmarker} />
                                            <span className={style.textNormal}>{course.costText}</span>
                                        </div>
                                        <div className={style.TitleCoin}>
                                        <Rate className={style.titleH3} defaultValue={course.rating} allowHalf disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}
