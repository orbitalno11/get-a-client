import { Col, Row, Grid, Space, Button, Divider } from "antd";
import React, { Fragment, useEffect } from "react"
import style from "../styles.module.scss"
import Header from "../../../../headerMobile/Header"
import isMobile from "../../../../isMobile/isMobile";
import { color } from "../../../../defaultValue"
import { styleComponent } from "../../../../defaultFunction/style";
import { tutorAction } from "../../../../../redux/actions/tutor.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { coinAction } from "../../../../../redux/actions";
const { useBreakpoint } = Grid;

export default function Home() {
    const screens = useBreakpoint();
    const dispatch = useDispatch()
    const { dashboard } = useSelector(state => state.tutor)
    const { balance } = useSelector(state => state.coin);

    useEffect(() => {
        dispatch(tutorAction.getDashboard())
        dispatch(coinAction.getCoinBalance());

        return () => {
            dispatch(tutorAction.clearListOfflineCourse())
        }
    }, [])

    const legendStyle = (colorIcon) => {
        return ({
            color: colorIcon,
        })
    }

    const dividerMobile = () => {
        return (isMobile() && <Divider />)
    }

    const alignInPage = () => {
        const align = !screens.lg ? "center" : "start"
        return align
    }

    return (
        <Fragment>
            {isMobile() && <Header title="หน้าหลัก" />}
            <div className="container">
                <div className={style.bodyPaddingTopBottom}>
                    <div span={24} className={`${!isMobile() ? style.section : null}`} align={alignInPage()}>
                        <span className={style.headerFour}>ยินดีต้อนรับ</span>
                    </div>
                    {dividerMobile()}
                    <Row align="middle" className={`${style.section}  ${style.marginSection}`} justify={alignInPage()}>
                        <span className={style.headerTwo5} >รีวิว</span>
                        <span className={`${style.headerTwo75} ${style.paddingbody}`} style={legendStyle(color.orange)}>{dashboard?.statistic ? dashboard?.statistic.rating : "-"}</span>
                        <span className={style.headerTwo75} >ดาว</span>
                    </Row>
                    {dividerMobile()}
                    <Row justify={"space-between"} gutter={[16, 0]}>
                        <Col lg={12} md={24} sm={24} xs={24} align="center">
                            <div className={`${style.section} ${!isMobile() && style.marginSection}`}>
                                <span className={style.headerThree}>{dashboard?.statistic ? dashboard?.statistic.numberOfOfflineCourse : "-"}</span>
                                <p className={style.headerOne5}>จำนวนคอร์สเรียนแบบนัดเจอ</p>
                            </div>
                        </Col>
                        {dividerMobile()}
                        <Col lg={12} md={24} sm={24} xs={24} align="center">
                            <div className={`${style.section} ${!isMobile() && style.marginSection}`}>
                                <span className={style.headerThree}>{dashboard?.statistic ? dashboard?.statistic.numberOfOnlineCourse : "-"}</span>
                                <p className={style.headerOne5}>จำนวนคอร์สเรียนแบบออนไลน์</p>
                            </div>
                        </Col>
                        {dividerMobile()}
                        <Col lg={12} md={24} sm={24} xs={24} align={alignInPage()}>
                            <div className={`${style.section} ${!isMobile() && style.marginSection} ${screens.lg && style.fullHeight}`}>
                                <span className={`${style.headerTwo25}`}>จำนวนคนที่กดถูกใจคุณ</span>
                                <Row justify="space-between" className={`${style.paddingTopOneHalf}`}>
                                    <Col lg={12} md={12} sm={24} xs={24} >
                                        <span className={`${style.textOne5} ${style.width7}`} align="start">ทั้งหมด</span>
                                        <span className={`${style.textOne5} ${style.width4}`} align="start">{dashboard?.statistic ? dashboard?.statistic.numberOfFavorite : "-"}</span>
                                        <span className={`${style.textOne5}`} align="start">คน </span>
                                    </Col>
                                    <Col lg={12} md={12} sm={24} xs={24}>
                                        <span className={`${style.textOne5} ${style.width7}`} align="start">ในอาทิตย์นี้</span>
                                        <span className={`${style.textOne5} ${style.width4}`} align="start">{dashboard?.statistic ? dashboard?.weekly.numberOfFavorite : "-"}</span>
                                        <span className={`${style.textOne5}`} align="start">คน </span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        {dividerMobile()}
                        <Col lg={12} md={24} sm={24} xs={24} >
                            <div className={`${style.section} ${!isMobile() && style.marginSection} ${style.fullHeight}`}>
                                <div align={alignInPage()}>
                                    <span className={style.headerTwo25}>ข้อมูลเหรียญ</span>
                                </div>
                                <div align={alignInPage()} className={!screens.lg ? style.marginSection : null}>
                                    <Space align="center" direction="horizontal">
                                        <styleComponent.iconCoin size={25} />
                                        <span className={`${style.textOne5} ${style.marginLeftOneHalf}`}>{balance ? balance.amount :"-"} เหรียญ </span>
                                    </Space>
                                </div>
                                <div className={style.marginSection}>
                                <Button className={`${style.buttonColor} ${style.textOne25}`} style={styleComponent.buttonFull(color.yellow)}>จัดการเหรียญ</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}