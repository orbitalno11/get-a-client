import React, { Fragment } from "react";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile"
import Request from "./Request";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { offlineCourseAction } from "../../../../../redux/actions";
import { Col, Row } from "antd";
import DetailLeftCourse from "./DetailLeftCourse";
import TabHorizontal from "../../../../tab/TabHorizontal";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import ModalComponent from "../../../../modal/ModalComponent";
import EmptyImage from "../../../../loading/EmptyImage";

export default function EnrollRequest() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { offlineCourse, loading } = useSelector(state => state)
  const requestOfflineCourse = offlineCourse.enrollList && offlineCourse.enrollList.filter(item => item.status === 0)
  const learnerOfflineCourse = offlineCourse.enrollList && offlineCourse.enrollList.filter(item => item.status === 1)
  const screens = useBreakpoint();
  const [tabStart, setTabStart] = useState({
    key: "request",
    name: "คำขอเข้าเรียน"
  })

  const [courseFocus, setCourseFocus] = useState(tabStart.key)

  const tabDetail = [
    {
      key: "request",
      name: "คำขอเข้าเรียน",
    },
    {
      key: "allLearner",
      name: "นักเรียนในคอร์ส",
    },
  ]

  const handleSetSelectTab = (key) => {
    const tabActive = tabDetail.filter(value => value.key === key)[0]
    setTabStart(tabActive)
    setCourseFocus(key)
  }

  useEffect(() => {
    dispatch(offlineCourseAction.getEnrollOfflineCourse(id))
    dispatch(offlineCourseAction.getOfflineCourse(id))
    return () => {
      dispatch(offlineCourseAction.clearOfflineCourse())
    }
  }, [])

  const CardRequestFocus = () => {
    const dataFocus = courseFocus === "request" ? requestOfflineCourse : learnerOfflineCourse
    return (
      !isEmpty(dataFocus) ? (
        <div className={`${screens.md && style.section} ${style.marginSection}`}>
          {dataFocus.map((item, index) => (
            <Request id={id} data={item} key={index} line={dataFocus.length !== index + 1} request={courseFocus === "request"} />
          ))}
        </div>
      ) : (
        !loading.loading && (
          <div className={`${screens.md && style.section} ${style.marginSection}`} align="center">
            <EmptyImage size="default" />
            <p className={style.textNormal}>{
              courseFocus === "request" ? "ไม่มีคำขอเรียนจากนักเรียนในบทเรียนนี้ พรุ่งนี้ลองกลับมาดูใหม่นะ" : "ยังไม่มีผู้เรียน"
            }</p>
          </div>
        )
      )
    )
  }

  return (
    <Fragment>
      <ModalComponent />
      {isMobile() && (
        <Header title="คำขอเรียน" pageBack />
      )}
      <div className="container">
        <Row className={style.bodyPaddingTopBottom} justify={'space-between'}>
          <Col span={24} className={`${!isMobile() && style.section}`}>
            {
              !isMobile() && (
                <span className={style.headerFour}>รายชื่อนักเรียน</span>
              )
            }
          </Col>
          <Col lg={8} md={24} sm={24} xs={24}>
            {
              !isMobile() && (
                <DetailLeftCourse isOffline />
              )
            }
          </Col>
          <Col lg={15} md={24} sm={24} xs={24}>
            <div className={`${screens.md && style.section} ${style.marginSection}`} >
              <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={screens.md ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
            </div>
            <CardRequestFocus />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}