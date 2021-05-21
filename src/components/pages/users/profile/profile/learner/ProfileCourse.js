import { Col, Row, Grid } from "antd";
import React, { useState } from "react"
import TabHorizontal from "../../../../../tab/TabHorizontal"
import CardCourseLearner from "../../../../../card/CardCourseLearner"
import style from "../../styles.module.scss"

const { useBreakpoint } = Grid;

export default function ProfileCourse() {
    const screens = useBreakpoint();
    const [course] = useState({
        tutor:
            [
                {
                    name: "หนูเทพซาโตชิ",
                    place: "บางมด, ทุ่งครุ",
                    subject: "ชีววิทยา",
                    date: "1 มกราคม 2563"
                },
                {
                    name: "พิคาชู หนูเทพซาโตชิ",
                    place: "บางมด, ทุ่งครุ",
                    subject: "ชีววิทยา",
                    date: "1 มกราคม 2563"
                }
            ],
        course: [{
            name: "พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        }]
    })

    const TabTutor = () => {
        return (
            <Row className={style.marginTop20} justify={!screens.xl && "space-around"}>
                {

                    course.tutor ?
                        (
                            course.tutor.map((item, index) => (
                                <Col xs={24} sm={20} md={24} lg={20} xl={12} className={style.padding} key={index} >
                                    <CardCourseLearner data={item} />
                                </Col>
                            ))
                        )
                        :
                        (
                            <span className={style.titleH5}>ยังไม่เคยเรียนพิเศษ</span>
                        )
                }
            </Row>
        )
    }

    const TabCourse = () => {
        return (
            <Row  className={style.marginTop20} justify={!screens.xl && "space-around"}>
                {

                    course.course ?
                        (
                            course.course.map((item, index) => (
                                <Col xs={24} sm={20} md={24} lg={20} xl={12} className={style.padding} key={index} >
                                    <CardCourseLearner data={item} />
                                </Col>
                            ))
                        )
                        :
                        (
                            <span className={style.titleH5}>ยังไม่เคยเรียนพิเศษ</span>
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
            <span className={style.titleH4}>คอร์สที่เคยเรียน</span>
            <div className={style.marginTop20}>
                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} />
            </div>
        </div>
    )
}
