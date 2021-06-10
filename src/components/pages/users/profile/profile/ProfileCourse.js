import { Row } from "antd"
import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CardCourseTutor from "../../../../card/CardCourseTutor"
import CardLesson from "../../../../card/CardLesson"
import isMobile from "../../../../isMobile/isMobile"
import TabHorizontal from "../../../../tab/TabHorizontal"
import style from "./../styles.module.scss"
import CardLearnerCourse from "../../../../card/CardLearnerCourse"
import isEmpty from "../../../../defaultFunction/checkEmptyObject"
import EmptyImage from "../../../../loading/EmptyImage"
import Loading from "../../../../loading/Loading"

export default function ProfileCourse({ isTutorProfile }) {
    const profilePage = window.location.pathname === "/me"
    const [course, setCourse] = useState({
        data: [],
        type: null
    })
    const [tabStart, setTabStart] = useState({
        key: "course",
        name: "ติวเตอร์"
    })
    const { loading } = useSelector(state => state.loading)
    const { offlineCourse, onlineCourse } = useSelector(state => isTutorProfile ? state.tutor : state.myCourse)
    const [courseFocus, setCourseFocus] = useState(tabStart.key)
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

    useEffect(() => {
        if (courseFocus === "course") {
            setCourse({
                data: isTutorProfile ? offlineCourse.data : offlineCourse,
                type: "course"
            })
        } else {
            setCourse({
                data: isTutorProfile ? onlineCourse.data : onlineCourse,
                type: "online"
            })
        }
        return () => {
            setCourse(null)
        }
    }, [courseFocus, offlineCourse, onlineCourse])

    const handleSetSelectTab = (key) => {
        const tabActive = tabDetail.filter(value => value.key === key)[0]
        setTabStart(tabActive)
        setCourseFocus(key)
    }

    const CardCoursePublicTutor = () => {
        return (
            (!isEmpty(course.data) && (courseFocus === course.type)) && (
                course?.data.map((item) => (
                    <Row className={`${!isMobile() && style.section} ${style.marginSection} ${style.cursor}`} key={item.id}>
                        {
                            isTutorProfile ? (
                                courseFocus === "course" ? (
                                    <CardCourseTutor data={item} />
                                ) : (
                                    <CardLesson data={item} isCourse={true} fullWidth />
                                )
                            ) : (
                                <CardLearnerCourse data={item} type={courseFocus === "course" ? "course" : "online"} />
                            )
                        }
                    </Row>
                ))
            )
        )
    }

    return (
        <div>
            {
                (loading && !profilePage) && (
                    <Loading />
                )
            }
            <div align="middle" className={`${!isMobile() && style.section} ${style.marginSection} ${isMobile() && style.paddingProfileMobile}`} >
                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={!isMobile() ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
            </div>
            {
                !isEmpty(course) ? (
                    <CardCoursePublicTutor />
                ) : (
                    !loading && (
                        <div align="center">
                            <EmptyImage size="default" />
                            <p className={style.textNormal}>ยังไม่มีบทเรียนที่คุณเรียน</p>
                        </div>
                    )
                )
            }
        </div>
    )
}