import { Button, Col, Row } from "antd"
import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { onlineCourseActions } from "../../../../../redux/actions"
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile"
import DetailLeftCourse from "../request/DetailLeftCourse"
import { color } from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style"
import { Fragment } from "react"
import Header from "../../../../headerMobile/Header"
import { Link } from "react-router-dom"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import TabHorizontal from "../../../../tab/TabHorizontal"
import { useState } from "react"
import CardClip from "../../../../card/CardClip"
import EmptyImage from "../../../../loading/EmptyImage"
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint"

export default function ClipList() {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const screens = useBreakpoint();
    const { profile, role } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.loading)
    const { listClip, data } = useSelector(state => state.onlineCourse)
    const myCourse = (role === 1 && !isEmpty(listClip)) ? listClip.filter(value => value?.bought === true) : []
    const isOwner = profile === data?.owner?.id
    const [tabStart, setTabStart] = useState({
        key: "allVideo",
        name: "วิดิโอทั้งหมด"
    })

    const tabDetail = [
        {
            key: "allVideo",
            name: "วิดิโอทั้งหมด",
        },
        {
            key: "myVideo",
            name: "วิดิโอของฉัน",
        },
    ]

    const [courseFocus, setCourseFocus] = useState(isOwner ? tabDetail[0].key : tabStart.key)

    const handleSetSelectTab = (key) => {
        const tabActive = tabDetail.find(value => value.key === key)
        setTabStart(tabActive)
        setCourseFocus(key)
    }

    useEffect(() => {
        if (courseId?.isSafeNotBlank()) {
            dispatch(onlineCourseActions.getClipOnlineCourse(courseId))
            dispatch(onlineCourseActions.getOnlineCourse(courseId))
        }
        return () => {
            dispatch(onlineCourseActions.clearListOnlineCourse())
        }
    }, [])

    const CardOnFocus = () => {
        const onFocusAll = courseFocus === "allVideo"
        const onFocusCard = onFocusAll ? listClip : myCourse
        return (
            !isEmpty(onFocusCard)
                ? (
                    !isEmpty(onFocusCard) && onFocusCard.map(item => (
                        <Row key={item.id} className={`${screens.md && style.section} ${style.marginSection} ${style.cursor}`}>
                            <CardClip data={item} isOwner={isOwner} all={onFocusAll} />
                        </Row>
                    ))
                ) : (
                    !loading && (
                        <div className={`${screens.md && style.section} ${style.marginSection}`} align="center">
                            <EmptyImage size="default" />
                            <p className={style.textNormal}>{
                                courseFocus === "allVideo" ? "บทเรียนนี้ยังไม่มีการเรียนการสอน" : "คุณยังไม่ได้ซื้อคลิปการสอนในบทเรียนนี้"
                            }</p>
                        </div>
                    )
                )
        )
    }

    return (
        <Fragment>
            {isMobile() && (
                <Header pageBack={`/online/${courseId}`} />
            )}
            <div className="container">
                <Row justify="space-around" className={style.bodyPaddingTopBottom}>
                    {
                        !isMobile() && (
                            <Col xl={8} lg={8} md={24}>
                                <DetailLeftCourse courseId={courseId} />
                            </Col>
                        )
                    }
                    <Col xl={15} lg={15} md={24}>
                        {
                            role !== 1 && (
                                <Row align="middle" className={`${!isMobile() && style.section} ${!isMobile() && style.marginSection}`}>
                                    {
                                        !isMobile() && (
                                            <Fragment>
                                                <Col span={20}>
                                                    <span className={style.headerTwo5} style={{ color: color.orange }}>วิดิโอทั้งหมด</span>
                                                </Col>
                                                {
                                                    isOwner && (
                                                        <Col span={4} align="end">
                                                            <Link to={`/tutor/online/${courseId}/video/create`}>
                                                                <Button className={`${style.buttonColor} ${style.textOne}`} style={styleComponent.buttonFull(color.orange, "auto")}>เพิ่มบทเรียน</Button>
                                                            </Link>
                                                        </Col>
                                                    )
                                                }
                                            </Fragment>
                                        )
                                    }
                                </Row>
                            )}
                        {
                            role === 1 && (
                                <Row className={`${!isMobile() && style.section} ${!isMobile() && style.marginSection}`} >
                                    <Col span={24}>
                                        <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={!isMobile() ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
                                    </Col>
                                </Row>
                            )
                        }
                        <CardOnFocus />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}
