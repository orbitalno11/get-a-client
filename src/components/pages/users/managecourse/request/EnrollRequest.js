import React, { Fragment } from "react";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile"
// import { Divider } from "antd";
import Request from "./Request";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { offlineCourseAction } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
import { Col, Row } from "antd";
import DetailLeftCourse from "./DetailLeftCourse";
import TabHorizontal from "../../../../tab/TabHorizontal";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
// import DetailCourse from "../manageCourse/DetailCourse";
// import ModalComponent from "../../../../modal/ModalComponent";
// import EmptyImage from "../../../../loading/EmptyImage";
// import isEmpty from "../../../../defaultFunction/checkEmptyObject"

export default function EnrollRequest() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { offlineCourse, loading } = useSelector(state => state)
  const requestOfflineCourse = offlineCourse.enrollList && offlineCourse.enrollList.filter(item => item.status === 0)
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

  console.log(courseFocus, requestOfflineCourse)

  return (
    <Fragment>
      {isMobile() && (
        <Header title="คำขอเรียน" pageBack />
      )}
      {
        loading.loading && (
          <Loading />
        )
      }
      <div className="container">
        <Row className={style.bodyPaddingTopBottom} justify={'space-between'}>
          <Col span={24} className={`${!isMobile() && style.section}`}>
            <span className={style.headerFour}>รายชื่อนักเรียน</span>
          </Col>
          <Col lg={8} md={24} sm={24} xs={24}>
            <DetailLeftCourse isOffline />
          </Col>
          <Col lg={15} md={24} sm={24} xs={24}>
            <div className={`${screens.md && style.section} ${style.marginSection}`} >
              <TabHorizontal type="tab" tabStart={tabStart} tabDetail={tabDetail} style={screens.lg ? "TabPane" : ""} handleSetSelectTab={handleSetSelectTab} />
            </div>

            {
              !isEmpty(requestOfflineCourse) && (
                <Row className={`${screens.md && style.section} ${style.marginSection}`}>
                  {requestOfflineCourse.map((item, index) => (
                    <Request id={id} data={item} key={index} />
                  ))}
                </Row>
              )
            }
          </Col>
        </Row>
      </div>
      {/* <div className={style.container}>
        <ModalComponent />

        {!isMobile() && (
          <Fragment>
            <span className={style.titleH2}>คำขอเข้าเรียน</span>
            <Divider type="horizontal" className={style.dividerCourse} />
          </Fragment>
        )}
        {
          !isEmpty(requestOfflineCourse ) ? (
            requestOfflineCourse.map((item, index) => (
              <Request id={params.id} data={item} key={index} />
            ))
          ) : (
            !loading.loading && (
              <div align="center">
                <EmptyImage size="default" />
                <p className={style.textNormal}>ไม่มีคำขอเรียนจากนักเรียนในบทเรียนนี้ พรุ่งนี้ลองกลับมาดูใหม่นะ</p>
              </div>
            )
          )
        }
      </div> */}
    </Fragment>
  );
}