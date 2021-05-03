import { Grid, Row, Col } from "antd";
import React, { Fragment } from 'react'
import CardCourseLearner from "../../../card/CardCourseLearner"
import Header from "../../../headerMobile/Header";
import responseMobile from "../../../response/responseMobile";
import TabHorizontal from "../../../tab/TabHorizontal";
import style from './styles.module.scss'
const { useBreakpoint } = Grid;

export default function ResultSearch() {
    const screens = useBreakpoint();

    const courseTutor = [
        {
            name: "1 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "2 พิคาชู",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "3 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "4 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "5 หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        },
        {
            name: "6 พิคาชู หนูเทพซาโตชิ",
            place: "บางมด, ทุ่งครุ",
            subject: "ชีววิทยา",
            date: "1 มกราคม 2563"
        }
    ]

    const CardResults = () => {
        return (
            <Row >
                {
                    courseTutor && courseTutor.map((item1, index) => (
                        <Col lg={8} md={12} sm={24} xs={24} key={index} className={style.cardResult}>
                            <CardCourseLearner data={item1} />
                        </Col>
                    ))
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
            tab: <CardResults />
        },
        {
            key: "course",
            name: "Course",
            tab: <CardResults />
        },
        {
            key: "course1",
            name: "Course1",
            tab: <CardResults />
        },

    ]


    return (
        <Fragment>
            {(responseMobile()) && <Header pageBack="goback" title="ผลการค้นหา" />}
            <div className={`${style.bodymobileprofile} ${style.paddingTopBody}`} >
                {
                    screens.md && (
                        <span className={style.titleH2}>ผลการค้นหา</span>
                    )
                }
                <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style="TabPane" />
            </div>
        </Fragment> 
    )
}