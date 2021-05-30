import React, { useState } from 'react'
import { Fragment } from "react"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile"
import style from "../styles.module.scss"
import Loading from "../../../../loading/Loading"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { homeActions } from "../../../../../redux/actions"
import { useEffect } from "react"
import CardCourseLearner from "../../../../card/CardCourseLearner"
import { Col, Row } from "antd"
import { useParams } from "react-router"
import TabHorizontal from "../../../../tab/TabHorizontal"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import subjectList from "../../../../defaultValue/subjectList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Ranking() {
    const { loading, home } = useSelector(state => state)
    const { type } = useParams()
    const dispatch = useDispatch()
    const [course, setCourse] = useState(null)
    const [tabStart, setTabStart] = useState({
        key: "course",
        name: "ติวเตอร์"
    })
    const [courseFocus, setCourseFocus] = useState(type ? type : tabStart.key)
    const textTitle = type ? (type === "course" ? "ติวเตอร์" : "คอร์สออนไลน์") : ""

    useEffect(() => {
        if (type) {
            if (type === "course") {
                dispatch(homeActions.getRank(20))
            } else {
                dispatch(homeActions.getRankOnline(20))
            }
        } else {
            dispatch(homeActions.getRank(20))
            dispatch(homeActions.getRankOnline(20))
        }
        return () => {
            dispatch(homeActions.clearHome())
        }
    }, [])

    useEffect(() => {
        if (courseFocus === "course") {
            setCourse(home.offlineCourseRank)
        } else {
            setCourse(home.onlineCourseRank)
        }
        return () => {
            setCourse(null)
        }
    }, [courseFocus, home.offlineCourseRank, home.onlineCourseRank])

    const handleSetSelectTab = (key) => {
        const tabActive = tabDetail.filter(value => value.key === key)[0]
        setTabStart(tabActive)
        setCourse(null)
        setCourseFocus(key)
    }

    const paddingCard = {
        paddingBottom: "1rem",
    }

    const CourseSection = () => {
        return (
            (!isEmpty(course) && !loading.loading ) && (
                <Row className={`${style.marginSection}`} justify={"space-between"}>
                    {
                        course.map((item) => (
                            <Col align="center" xl={11} lg={11} md={12} sm={24} xs={24} key={item.id} style={paddingCard}>
                                <CardCourseLearner data={item} verizontal="true" type={courseFocus} ranking />
                            </Col>

                        ))
                    }
                </Row>
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

    const iconSubject = (color) => {
        return ({
            backgroundColor: color,
        })
    }

    return (
        <Fragment>
            {
                loading.loading && (
                    <Loading />
                )
            }

            {
                isMobile() && <Header title={`${textTitle}ยอดนิยม`} />
            }
            <div className="container">
                <Row className={style.bodyPaddingTopBottom} >
                    {
                        !isMobile() &&
                        <Col span={24} className={style.section}>
                            <span className={style.headerFour}>{`${textTitle}ยอดนิยม`}</span>
                        </Col>
                    }
                    {
                        !type && (
                            <Col span={24} className={`${!isMobile() && style.section} ${style.marginSection}`}>
                                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={!isMobile() ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
                            </Col>
                        )
                    }
                    <Row justify={"space-between"}>
                        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                            <CourseSection />
                        </Col>
                        {
                            (!isMobile() && !loading.loading) && (
                                <Col xl={5} lg={5} md={5} className={`${style.section} ${style.marginSection}`}>
                                    <b className={style.textOne25}>ค้นหาจากรายวิชา</b>
                                    {
                                        subjectList && subjectList.map((item, index) => (
                                            <div key={index} >
                                                <Row align="middle" className={style.subjectSelect}>
                                                    <FontAwesomeIcon className={style.iconSubjectSmall} icon={item.icon} style={iconSubject(item.color)} />
                                                    <span className={`${style.textOne} ${style.marginLeftOneHalf}`}>{item.subject}</span>
                                                </Row>
                                            </div>
                                        ))
                                    }
                                </Col>
                            )
                        }
                    </Row>
                </Row>
            </div>
        </Fragment>
    )
}
