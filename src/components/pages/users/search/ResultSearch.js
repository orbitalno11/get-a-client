
import React, { Fragment } from 'react'
import TabHorizontal from "../../../tab/TabHorizontal"
import { useState } from "react"
import { useSelector } from "react-redux"
import isEmpty from "../../../defaultFunction/checkEmptyObject"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { searchActions } from "../../../../redux/actions/search.actions"
import CardCourseTutor from "../../../card/CardCourseTutor"
import { Button, Col, Row } from "antd"
import CardLesson from "../../../card/CardLesson"
import style from "./styles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import isMobile from "../../../isMobile/isMobile"
import EmptyImage from "../../../loading/EmptyImage"
import { Link } from "react-router-dom"

export default function ResultSearch() {
    const [tabStart, setTabStart] = useState({
        key: "all",
        name: "ทั้งหมด",
    })
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const [course, setCourse] = useState()

    useEffect(() => {
        if (search.offlineCourse || search.onlineCourse) {
            setCourse({
                offlineCourse: search.offlineCourse,
                onlineCourse: search.onlineCourse,
                nearby: search.nearby,
                links: search.links,
                meta: search.meta,
                type: search.type,
                location: search.location
            })
        }
    }, [search.onlineCourse, search.offlineCourse, search.nearby])

    const onHandleChangePage = (redirectPath, typeFocus) => {
        dispatch(searchActions.getSearch({
            redirectPath: redirectPath,
            typeFocus: typeFocus,
            type: course.type,
        }))
    }
   
    const CardResult = ({ type, data }) => {
        const checkNotNull = !isEmpty(course[type])
        const prevPage = (checkNotNull && !isEmpty(course.links[type].previous)) ? false : true
        const nextPage = (checkNotNull && !isEmpty(course.links[type].next)) ? false : true
        const currentPage = (checkNotNull && !isEmpty(course.meta[type].currentPage)) && course.meta[type].currentPage
        const denineLocation = (type === "nearby" && isEmpty(course[type]) && !course.location)

        return (
            <Row className={(!isMobile() && course.type !== 3) ? style.padding1 : null} justify={"space-between"} >
                {
                    checkNotNull ? data.map((item) => (
                        <Col className={style.paddingCardResult} key={item.id} xl={11} lg={11} md={24} sm={24} xs={24} >
                            {
                                (type !== "onlineCourse") ? (
                                    <CardCourseTutor data={item} search />
                                ) : (
                                    <Link to={`/online/${item.id}`}>
                                        <CardLesson data={item} search />
                                    </Link>
                                )
                            }
                        </Col>
                    )) : (
                        <Col span={24} align="center">

                            <EmptyImage size="default" />
                            <p className={style.textNormal}>{
                                denineLocation ?
                                    "ไม่สามารถค้นหาบทเรียนที่อยู่ใกล้คุณได้ เนื่ืองจากถูกปฎิเสธในการขอตำแหน่งที่ตั้ง"
                                    : "ไม่พบข้อมูลในส่วนนี้"
                            }</p>
                        </Col>
                    )
                }
                {
                    checkNotNull && (
                        <Col className={style.marginTop2} span={24} align="center">
                            <Button className="buttonColor" shape="circle" hidden={prevPage} onClick={() => onHandleChangePage(course.links[type].previous, type)}>
                                <FontAwesomeIcon className={style.pageHeader} icon={faArrowCircleLeft} />
                            </Button>
                            {
                                course.meta[type].totalPages !== 1 && (
                                    <span className={`${style.paddingPage} ${style.textOne5}`}>หน้าที่ {currentPage}</span>
                                )
                            }
                            <Button className="buttonColor" shape="circle" hidden={nextPage} onClick={() => onHandleChangePage(course.links[type].next, type)}>
                                <FontAwesomeIcon className={style.pageHeader} icon={faArrowCircleRight} />
                            </Button>
                        </Col>
                    )
                }
            </Row>
        )
    }

    const tabDetail = () => {
        const data = [
            {
                key: "offlineCourse",
                name: "ทั้งหมด",
                tab: <CardResult data={course.offlineCourse} type="offlineCourse" />
            },
            {
                key: "nearby",
                name: "ใกล้คุณ",
                tab: <CardResult data={course.nearby} type="nearby" />
            },
            {
                key: "onlineCourse",
                name: "ออนไลน์",
                tab: <CardResult data={course.onlineCourse} type="onlineCourse" />
            },
        ]

        if (course.type === 1) {
            return data.filter(value => value.key !== "onlineCourse")
        } else if (course.type === "N/A") {
            return data
        }
    }

    const handleSetSelectTab = (key) => {
        const tabActive = tabDetail().filter(value => value.key === key)[0]
        setTabStart(tabActive)
    }


    return (
        <Fragment>
            <div id="showCard">
                {
                    (course && !isEmpty(course.type) && course.type !== 3) && (
                        <TabHorizontal ontal type="tab" tabStart={tabStart} tabDetail={tabDetail()} style={"TabPane"} handleSetSelectTab={handleSetSelectTab} />
                    )
                }
            </div>
            {
                course?.type === 3 && (
                    <CardResult data={course.onlineCourse} type="onlineCourse" />
                )
            }
        </Fragment>
    )
}