import { Col, Row, Grid, Space, Button } from "antd";
import React, { Fragment, useEffect } from "react"
import PieChartComponent from "../../../../dashborad/PieChartComponent";
import style from "../styles.module.scss"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { color } from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style";
import { tutorAction } from "../../../../../redux/actions/tutor.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const { useBreakpoint } = Grid;

export default function Home() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { dashboard } = useSelector(state => state.tutor)

    useEffect(() => {
        dispatch(tutorAction.getDashboard())

        return () => {
            dispatch(tutorAction.clearListOfflineCourse())
        }
    }, [])

    console.log(dashboard)

    const data = {
        labels: [
            'ทั้งหมด',
            'นัดเจอ',
            'ออนไลน์'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                color.CHM,
                color.MTH,
                color.PHY
            ],
            hoverOffset: 4
        }]
    };

    const legendStyle = (colorIcon) => {
        return ({
            color: colorIcon,
        })
    }

    return (
        <Fragment>
            {isMobile() && <Header title="หน้าหลัก" />}
            <div className="container">
                <Row justify={"space-between"} className={style.bodyPaddingTopBottom}>
                    <Col span={24} className={`${!isMobile() && style.section}`} align={isMobile() ? "center" : "start"}>
                        <span className={style.headerFour}>ยินดีต้อนรับ</span>
                    </Col>
                    <Col className={`${!isMobile() && style.section} ${style.marginSection}`} lg={14} md={24} sm={24} xs={24} >
                        <Row justify={!screens.lg && "center"}>
                            <span className={style.headerTwo25}>สรุปการสอน</span>
                        </Row>
                        <Row className={screens.lg && style.marginSection} align="middle" justify={"space-between"}>
                            <Col order={!screens.lg ? 2 : 1} lg={14} md={24} sm={24} xs={24} className={!screens.lg && style.marginSection}>
                                <Row align="middle" justify={!screens.lg ? "center" : "start"}>
                                    <Col>
                                        <FontAwesomeIcon style={legendStyle(color.CHM)} icon={faCircle} />
                                    </Col>
                                    <Col className={style.marginLeftOneHalf}>
                                        <span className={`${style.textOne5} ${style.width10}`}>มีผู้เรียนกับคุณ </span>
                                        <span className={`${style.textOne5} ${style.width4}`}>5,0 </span>
                                        <span className={`${style.textOne5}`}>คน </span>
                                    </Col>
                                </Row>
                                <Row align="middle" justify={!screens.lg ? "center" : "start"}>
                                    <Col>
                                        <FontAwesomeIcon style={legendStyle(color.MTH)} icon={faCircle} />
                                    </Col>
                                    <Col className={style.marginLeftOneHalf}>
                                        <span className={`${style.textOne5} ${style.width10}`}>เรียนแบบนัดเจอ </span>
                                        <span className={`${style.textOne5} ${style.width4}`}>5,000 </span>
                                        <span className={`${style.textOne5}`}>คน </span>
                                    </Col>
                                </Row>
                                <Row align="middle" justify={!screens.lg ? "center" : "start"}>
                                    <Col>
                                        <FontAwesomeIcon style={legendStyle(color.PHY)} icon={faCircle} />
                                    </Col>
                                    <Col className={style.marginLeftOneHalf}>
                                        <span className={`${style.textOne5} ${style.width10}`}>เรียนแบบออนไลน์ </span>
                                        <span className={`${style.textOne5} ${style.width4}`}>5,000 </span>
                                        <span className={`${style.textOne5}`}>คน </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col order={!screens.lg ? 1 : 2} lg={9} md={24} sm={24} xs={24}>
                                <PieChartComponent data={data} radius={1} main="value" value="type" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className={`${!isMobile() && style.section} ${style.marginSection}`} lg={9} md={24} sm={24} xs={24}>
                        <Row className={`${style.fullHeight} ${!screens.lg && style.marginSection} `} align="middle" justify={!screens.lg && "space-around"} >
                            <Col span={24} align={!screens.lg ? "center" : "start"}>
                                <span className={style.headerTwo25}>ข้อมูลเหรียญ</span>
                            </Col>
                            <Col span={17} className={!screens.lg && style.marginSection}>
                                <Space align="center" direction="horizontal">
                                    <styleComponent.iconCoin size="medium" />
                                    <span className={`${!isMobile() ? style.textTwo : style.textOne5} ${style.marginLeftOneHalf}`}> {balanceCoin ? balanceCoin.amount : <SkeletonComponent.SkeletonText />} &nbsp;เหรียญ </span>
                                </Space>
                            </Col>
                            <Col span={screens.lg ? 24 : 7} className={style.marginSection} align="end">
                                <Button className={`${style.buttonColor} ${!screens.lg && style.textOne}`} style={styleComponent.buttonFull(color.yellow, (!screens.lg && "6.25rem"))}>จัดการเหรียญ</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}