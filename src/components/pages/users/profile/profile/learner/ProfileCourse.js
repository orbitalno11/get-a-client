import { Col, Row, Typography, Grid } from "antd";
import React, { useEffect, useState } from "react"
import TabHorizontal from "../../../../../tab/TabHorizontal"
import CardCourseLearner from "../../../../../card/CardCourseLearner"
import style from "../../styles.module.scss"
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function ProfileCourse() {
    const screens = useBreakpoint();
    const profile = useSelector(state => state.profile)
    const [course, setCourse] = useState(null)

    useEffect(() => {
        if (profile.profile) {
            setCourse(profile.profile)
        }
    }, [profile])

    const TabTutor = () => {
        return (
            <Row justify="space-around" align="middle" className={style.marginTop20}>
                {
                    course !== null &&
                        (
                            course.course.tutor.length !== 0 ?
                                (
                                    course.course.tutor.map((item, index) => (
                                        <Col xs={24} sm={20} md={24} lg={20} xl={12} className={style.padding} key={index} >
                                            <CardCourseLearner data={item} />
                                        </Col>
                                    ))
                                )
                                :
                                (
                                    <Title level={4}>ยังไม่เคยเรียนพิเศษ</Title>
                                )
                        )
                }
            </Row>
        )
    }

    const TabCourse = () => {
        return (
            <Row justify="space-around" align="middle" className={style.marginTop20}>
               {
                    course !== null &&
                        (
                            course.course.tutor.length !== 0 ?
                                (
                                    course.course.course.map((item, index) => (
                                        <Col xs={24} sm={20} md={24} lg={20} xl={12} className={style.padding} key={index} >
                                            <CardCourseLearner data={item} />
                                        </Col>
                                    ))
                                )
                                :
                                (
                                    <Title level={4}>ยังไม่เคยเรียนพิเศษ</Title>
                                )
                        )
                }
            </Row>
        )
    }

    const tabStart = {
        key: "tutor",
        name: "Tutor"
    }

    const tabDetail = [
        {
            key: "tutor",
            name: "Tutor",
            tab: <TabTutor />
        },
        {
            key: "course",
            name: "Course",
            tab: <TabCourse />
        },
    ]

    return (
        <div className={screens.md ? null : style.subProfile}>
            <Title level={screens.md ? 3 : 5}>คอร์สที่เคยเรียน</Title>
            <Row justify="space-around" align="middle" className={style.marginTop20}>
                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} />
            </Row>
        </div>
    )
}
