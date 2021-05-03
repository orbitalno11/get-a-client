import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Grid, Row } from "antd";
import React, { Fragment } from 'react'
import CardOnlineCourse from "../../../card/CardOnlineCourse";
import Header from "../../../headerMobile/Header";
import responseMobile from "../../../response/responseMobile";
import style from "./styles.module.scss"
const { useBreakpoint } = Grid;

export default function OnlineCourseList() {
    const screens = useBreakpoint();
    const floatRight = {
        marginLeft: 'auto',
        display: 'flex'
    }

    const buttonabsolute = {
        position: 'fixed',
        bottom : '6rem',
        right : '2rem',
        zIndex: '1000'
    }

    return (
        <Fragment>
            {responseMobile() && <Header title="" /> }
            <div className={responseMobile() ?`${style.bodymobileprofile} ${style.paddingTopBody}` : style.body}>
                <Row>
                    <Col span={20}>
                        <span className={style.titleH2}>ชื่อวิชา</span>
                    </Col>
                    {
                        screens.md ? (
                            <Col span={4}>
                                <Button className="buttonColor backgroundBlue" shape="round" size="middle" style={floatRight}>เพิ่มบทเรียน</Button>
                            </Col>
                        ):(
                            <Button className="buttonColor backgroundBlue" shape="circle" size="large" style={buttonabsolute}>
                                <FontAwesomeIcon icon={faPlus} /> 
                            </Button>
                        )
                    }
                </Row>
                <Row justify={!screens.md ? "space-around" : "space-between"}>
                    <Col lg={7} xl={7} md={11} sm={18} xs={24} className={style.marginCard}>
                        <CardOnlineCourse />
                    </Col>
                    <Col lg={7} xl={7} md={11} sm={18} xs={24} className={style.marginCard}>
                        <CardOnlineCourse />
                    </Col>
                    <Col lg={7} xl={7} md={11} sm={18} xs={24} className={style.marginCard}>
                        <CardOnlineCourse />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}