import { Col, Row, Grid } from "antd";
import React, { useEffect } from "react"
import TabHorizontal from "../../../../../tab/TabHorizontal"
import CardLearnerCourse from "../../../../../card/CardLearnerCourse"
import style from "../../styles.module.scss"
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myCourseAction } from "../../../../../../redux/actions";
import isMobile from "../../../../../isMobile/isMobile";
import Header from "../../../../../headerMobile/Header";
import Loading from "../../../../../loading/Loading";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

export default function ProfileCourse({ mainPage }) {
    const screens = useBreakpoint();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state);
    const offlineCourse = useSelector((state) => state.myCourse.offlineCourse);
    const onlineCourse= useSelector((state) => state.myCourse.onlineCourse);
  
    useEffect(() => {
      dispatch(myCourseAction.getMyOfflineCourse());
      dispatch(myCourseAction.getMyOnlineCourse());
    }, []);

    const TabTutor = () => {
        return (
            offlineCourse && offlineCourse.length > 0 ?
                (
                    <Row className={style.marginTop20} justify={!screens.xl && "space-around"} >
                        {
                            offlineCourse && offlineCourse.map((item, index) => (
                                <Col xs={24} sm={20} md={!mainPage ? 12 : 20} lg={!mainPage ? 8 : 20} xl={!mainPage ? 8 : 12} className={style.padding} key={index} >
                                    <Link to={`/course/${item.id}`}>
                                        <CardLearnerCourse data={item} type={"offline"} verizontal />
                                    </Link>
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
            onlineCourse && onlineCourse.length > 0 ?
                (
                    <Row className={style.marginTop20} justify={!screens.xl && "space-around"} >
                        {
                            onlineCourse && onlineCourse.map((data, index) => (
                                <Col xs={24} sm={20} md={!mainPage ? 12 : 20} lg={!mainPage ? 8 : 20} xl={!mainPage ? 8 : 12} className={style.padding} key={index} >
                                    <CardLearnerCourse data={data} type={"online"} verizontal/>  
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
            {loading.loading && <Loading />}
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
