import { Col, Row, Grid } from "antd";
import React, { useState } from "react"
import TabHorizontal from "../../../../../tab/TabHorizontal"
import CardCourseLearner from "../../../../../card/CardCourseLearner"
import style from "../../styles.module.scss"
import { Fragment } from "react";
import isMobile from "../../../../../isMobile/isMobile";
import Header from "../../../../../headerMobile/Header";

const { useBreakpoint } = Grid;

export default function ProfileCourse({ mainPage }) {
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
                },
                {
                    name: "พิคาชู หนูเทพซาโตชิ",
                    place: "บางมด, ทุ่งครุ",
                    subject: "ชีววิทยา",
                    date: "1 มกราคม 2563"
                }
            ],
        course: null
    })

    const TabTutor = () => {
        return (
            course.tutor ?
                (
                    <Row className={style.marginTop20} justify={!screens.xl && "space-around"} >
                        {
                            course.tutor.map((item, index) => (
                                <Col xs={24} sm={20} md={!mainPage ? 12 : 20} lg={!mainPage ? 8 : 12} xl={!mainPage ? 8 : 12} className={style.padding} key={index} >
                                    <CardCourseLearner data={item} verizontal />
                                </Col>
                            ))
                        }
                    </Row>
                )
                :
                (
                    <Row className={style.marginTop20} justify="space-around">
                        <span className={style.textNormal}>คุณยังไม่ได้เรียนพิเศษกับใคร? ค้นหาครูสอนพิเศษ</span>
                    </Row>
                )
        )
    }

    const TabCourse = () => {
        return (
            course.course ?
                (
                    <Row className={style.marginTop20} justify={!screens.xl && "space-around"} >
                        {
                            course.course.map((item, index) => (
                                <Col xs={24} sm={20} md={!mainPage ? 12 : 20} lg={!mainPage ? 8 : 12} xl={!mainPage ? 8 : 12} className={style.padding} key={index} >
                                    <CardCourseLearner data={item} />
                                </Col>
                            ))
                        }
                    </Row>
                )
                :
                (
                    <Row className={style.marginTop20} justify="space-around">
                        <span className={style.textNormal}>คุณยังไม่ได้เรียนพิเศษกับใคร? ค้นหาครูสอนพิเศษ</span>
                    </Row>
                )
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
        <Fragment>
            {(isMobile() && !mainPage) && <Header title="คอร์สเรียนของฉัน" pageBack="goback" />}
            <div className={!mainPage ? style.body : screens.md ? null : style.subProfile}>
                {
                    mainPage && (
                        <span className={style.titleH4}>คอร์สที่เคยเรียน</span>
                    )
                }
                <div className={style.marginTop20}>
                    <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} />
                </div>
            </div>
        </Fragment>

    )
}
