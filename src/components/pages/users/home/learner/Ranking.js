import React, { useState } from 'react'
import { Fragment } from "react"
import Header from "../../../../headerMobile/Header"
import style from "../styles.module.scss"
import Loading from "../../../../loading/Loading"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { homeActions, onlineCourseActions } from "../../../../../redux/actions"
import { useEffect } from "react"
import CardCourseLearner from "../../../../card/CardCourseLearner"
import { Col, Row } from "antd"
import { useHistory, useParams } from "react-router"
import TabHorizontal from "../../../../tab/TabHorizontal"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import subjectList from "../../../../defaultValue/subjectList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"

export default function Ranking() {
    const { loading, home, onlineCourse } = useSelector(state => state)
    const { type } = useParams()
    const screens = useBreakpoint()
    const dispatch = useDispatch()
    const [course, setCourse] = useState(null)
    const isCouse = type === "course"
    const isOnline = type === "online"
    const [tabStart, setTabStart] = useState(
        isOnline === true  ? {
        key: "all",
        name: "ทั้งหมด",
    } : {
        key: "course",
        name: "ติวเตอร์"
    })
    const [courseFocus, setCourseFocus] = useState(tabStart.key)
    const textTitle = type ? (isCouse ? "ติวเตอร์" : "คอร์สออนไลน์") : ""
    const history = useHistory()

    useEffect(() => {
        if (!isEmpty(type)) {
            if (isCouse) {
                dispatch(homeActions.getRank(20))
            } else {
                dispatch(homeActions.getRankOnline(20))
                dispatch(onlineCourseActions.getOnlineCourseNew("/online-course/new-course"))
            }
        } else {
            dispatch(homeActions.getRank(20))
            dispatch(homeActions.getRankOnline(20))
        }
        setTabStart(isOnline === true  ? {
            key: "all",
            name: "ทั้งหมด",
        } : {
            key: "course",
            name: "ติวเตอร์"
        })
        setCourseFocus(isOnline === true ? "all" : "course")

        return () => {
            setCourse(null)
            dispatch(homeActions.clearHome())
            setTabStart({
                key: "course",
                name: "ติวเตอร์"
            })
        }
    }, [type])

    useEffect(() => {
        if (courseFocus === "course" || isCouse) {
            setCourse(home.offlineCourseRank)
        } else if (courseFocus === "all" || courseFocus === "online") {
            setCourse(home.onlineCourseRank)
        } else if (courseFocus === "new") {
            setCourse({
                item: onlineCourse?.newCourse?.item,
                links: onlineCourse?.newCourse?.links,
                meta: onlineCourse?.newCourse?.meta
            })
        }
        return () => {
            setCourse(null)
        }
    }, [courseFocus, home.offlineCourseRank, home.onlineCourseRank, onlineCourse.newCourse])

    const handleSetSelectTab = (key) => {
        const tabActive = (isEmpty(type) ? tabDetail : tabOnlineCourse).filter(value => value.key === key)[0]
        setTabStart(tabActive)
        setCourse(null)
        setCourseFocus(key)
    }

    const paddingCard = {
        paddingBottom: "1rem",
    }

    const onHandleChangePage = (redirectPath) => {
        dispatch(onlineCourseActions.getOnlineCourseNew(redirectPath))
    }

    const ChangePage = () => {
        const isOnePage = course?.meta?.totalPages === 1
        const prevPage = (!isEmpty(course?.links?.previous)) ? false : true
        const nextPage = (!isEmpty(course?.links?.next)) ? false : true
        return (
            <Row className={style.marginSection} align="middle" justify="center">
                <FontAwesomeIcon className={`${style.pageHeader} ${style.cursor} ${style.marginRightOne}`} icon={faArrowCircleLeft} hidden={prevPage} onClick={() => onHandleChangePage(course?.links?.previous)} />
                {
                    !isOnePage && (<span className={`${style.paddingPage} ${style.textOne5}`}>หน้าที่ {course?.meta?.currentPage}</span>)
                }
                <FontAwesomeIcon className={`${style.pageHeader} ${style.cursor} ${style.marginLeftOne}`} icon={faArrowCircleRight} hidden={nextPage} onClick={() => onHandleChangePage(course?.links?.next)} />
            </Row>
        )
    }

    const CourseSection = () => {
        const dataFocus = courseFocus === "new" ? course?.item : course
        return (
            (!isEmpty(dataFocus) && !loading.loading) && (
                <Fragment>
                    <Row gutter={[16, 0]} className={`${style.marginSection}`} justify={"space-between"}>
                        {
                            dataFocus.map((item) => (
                                <Col align="center" xl={12} lg={12} md={12} sm={24} xs={24} key={item.id} style={paddingCard}>
                                    <CardCourseLearner data={item} verizontal="true" type={courseFocus} ranking={!screens.md ? false : true} />
                                </Col>
                            ))
                        }
                    </Row>
                    {
                        courseFocus === "new" && <ChangePage />
                    }
                </Fragment>
            )
        )
    }

    const tabDetail = [
        {
            key: "course",
            name: "ติวเตอร์",
        },
        {
            key: "online",
            name: "ออนไลน์",
        },
    ]

    const tabOnlineCourse = [
        {
            key: "all",
            name: "ทั้งหมด",
        },
        {
            key: "new",
            name: "มาใหม่",
        },
    ]

    const iconSubject = (color) => {
        return ({
            backgroundColor: color,
        })
    }

    const onHandleSearch = (subject) => {
        history.push(`/search?grade=&subject=${subject}&gender=&type=&location=`)
    }

    return (
        <Fragment>
            {
                loading.loading && (
                    <Loading />
                )
            }
            {
                !screens.md && <Header title={`${textTitle}ยอดนิยม`} pageBack={type && "goback"}/>
            }
            <div className="container">
                <div className={style.bodyPaddingTopBottom} >
                    {
                        screens.md &&
                        <div className={style.section}>
                            <span className={style.headerFour}>{`${textTitle}ยอดนิยม`}</span>
                        </div>
                    }
                    {
                        !isCouse && (
                            <div className={`${screens.md && style.section} ${style.marginSection}`}>
                                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={isEmpty(type) ? tabDetail : tabOnlineCourse} style={screens.md ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
                            </div>
                        )
                    }
                    <Row justify={"space-between"}>
                        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                            <CourseSection />
                        </Col>
                        {
                            screens.md && (
                                <Col xl={5} lg={5} md={5} >
                                    <div className={`${style.section} ${style.marginSection}`} >
                                        <b className={style.textOne25}>ค้นหาจากรายวิชา</b>
                                        {
                                            subjectList && subjectList.map((item, index) => (
                                                <div key={index} onClick={() => onHandleSearch(item.id)}>
                                                    <Row align="middle" className={style.subjectSelect}>
                                                        <FontAwesomeIcon className={style.iconSubjectSmall} icon={item.icon} style={iconSubject(item.color)} />
                                                        <span className={`${style.textOne} ${style.marginLeftOneHalf}`}>{item.subject}</span>
                                                    </Row>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}