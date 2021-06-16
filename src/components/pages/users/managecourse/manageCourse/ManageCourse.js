import React, { Fragment } from "react";
import { Row, Col, Button, Badge } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile"
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { modalAction, tutorAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { useState } from "react";
import CardCourseTutor from "../../../../card/CardCourseTutor";
import CardLesson from "../../../../card/CardLesson";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { color } from "../../../../defaultValue";
import { styleComponent } from "../../../../defaultFunction/style";
import EmptyImage from "../../../../loading/EmptyImage";
import Loading from "../../../../loading/Loading";
import VerifyModal from "./VerifyModal";
import { sizeModal } from "../../../../modal/SizeModal";
import ModalComponent from "../../../../modal/ModalComponent";

export default function ManageCourse() {
  const { auth, tutor, loading } = useSelector(state => state)
  const [courseList, setCourseList] = useState([])
  const dispatch = useDispatch()
  const { type } = useParams()
  const isCourse = type === "course"
  const screens = useBreakpoint();

  useEffect(() => {
    if (isCourse) {
      dispatch(tutorAction.getListOfflineCourse(auth.profile))
    } else {
      dispatch(tutorAction.getListOnlineCourse(auth.profile))
    }

    if(!auth?.verified){
      dispatch(modalAction.openModal({
          body : <VerifyModal/>,
          size: sizeModal.default,
      }))
  }

    return () => {
      setCourseList([])
      dispatch(tutorAction.clearListOfflineCourse())
    }
  }, [type, auth.verified])

  useEffect(() => {
    let courseDetail = null
    if (isCourse) {
      courseDetail = !isEmpty(tutor.offlineCourse.data) ? tutor.offlineCourse.data : null
    } else {
      courseDetail = !isEmpty(tutor.onlineCourse.data) ? tutor.onlineCourse.data : null
    }
    if (!isEmpty(courseDetail)) {
      setCourseList(courseDetail)
    }
  }, [tutor.offlineCourse, tutor.onlineCourse])

  return (
    <Fragment>
      {isMobile() && (
        <Header title={`จัดการคอร์สเรียน${!isCourse ? "ออนไลน์" : ""}`} />
      )}
      {
        loading.loading && (
          <Loading />
        )
      }
       <ModalComponent />
      <div className="container">
        <div className={style.bodyPaddingTopBottom}>
          <Row justify={"space-between"}>
            {screens.md && (
              <Col className={style.section} span={24}>
                <span className={style.headerFour}>จัดการคอร์สเรียน{!isCourse ? "ออนไลน์" : ""}</span>
              </Col>
            )}
            <Col xl={16} lg={16} md={24} sm={24} xs={24} order={screens.lg ? 1 : 2}>
              <Row >
                {
                  !isEmpty(courseList) ? (
                    courseList.map((item) => {
                      return (

                        <Col id="listRequest" className={`${screens.md && style.section} ${style.marginSection} ${style.cursor}`} key={item.id} span={24}>
                          {
                            isCourse ? (
                              <Badge className={style.fullWidth} count={item.requestNumber}  offset={[!screens.md ? 0 : 15, !screens.md ? 0 : -10]}>
                                <CardCourseTutor data={item} />
                              </Badge>
                            ) : (<CardLesson data={item} isCourse={true} fullWidth />)
                          }
                        </Col>

                      )
                    })
                  ) : (
                    !loading.loading && (
                      <Col align="center" className={`${screens.md && style.section} ${style.marginSection}`} span={24}>
                        <EmptyImage size="default" />
                        <p className={style.textOne5}>คุณยังไม่มีคอร์สเรียน สร้างคอร์สเรียนเพื่อเริ่มการสอนสิ</p>
                      </Col>
                    )
                  )
                }
              </Row>
            </Col>
            {
              screens.md ? (
                <Col xl={7} lg={7} md={24} sm={24} xs={24} order={screens.lg ? 2 : 1} className={style.marginSection}>
                  <Link to={`/tutor/${type}/create`}>
                    <Button className={style.buttonColor} style={styleComponent.buttonFull(color.orange)} disabled={!auth.verified}>สร้างคอร์สเรียนใหม่</Button>
                  </Link>
                </Col>
              ) : (
                <Link to={`/tutor/${type}/create`}>
                  <button className={style.buttonfixbottom} >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Link>
              )
            }
          </Row>
        </div>
      </div>
    </Fragment>
  );
}