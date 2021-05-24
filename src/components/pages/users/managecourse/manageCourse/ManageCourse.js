import React, { Fragment } from "react";
import { Row, Col, Button, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import ManageCourseDetail from "./ManageCourseDetail";
import isMobile from "../../../../isMobile/isMobile"
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onlineCourseActions } from "../../../../../redux/actions";

export default function ManageCourse() {
  const location = useLocation()
  const { courseId } = useParams()
  const floatRight = {
    marginLeft: "auto",
    display: "flex",
    marginTop: "0.3rem"
  };
  const dispatch = useDispatch()
  const isOnline = location.pathname === "/tutor/online" || !isEmpty(courseId)
  const { auth, onlineCourse } = useSelector(state => state)
  const course = (courseId && onlineCourse) && onlineCourse.data
  const owner = (!isEmpty(course) && auth && courseId) && (auth.profile === course.owner.id)

  useEffect(() => {
    dispatch(onlineCourseActions.getOnlineCourse(courseId))
    return () => {
      dispatch(onlineCourseActions.clearListOnlineCourse())
    }
  }, [])

  return (
    <Fragment>
      {isMobile() && (
        <Header title={"จัดการคอร์สเรียน" + (isOnline ? "ออนไลน์" : "")} pageBack={courseId && `/online/${courseId}`} />
      )}
      <div className={style.container}>
        <div >
          {!isMobile() ? (
            <Row>
              <Col md={18} lg={19} xl={19}>
                <span className={style.titleH2}>{((owner && courseId )|| !courseId) ?  "จัดการคอร์สเรียน" : "คอร์สเรียน"}{isOnline && "ออนไลน์"}</span>
              </Col>
              <Col md={6} lg={5} xl={5}>
                {
                  ((owner && courseId )|| !courseId) && (
                    <Link to={courseId ? `/tutor/online/${courseId}/video/create` : `${location.pathname}/create`}>
                      <Button
                        className="buttonColor backgroundBlue"
                        shape="round"
                        size="middle"
                        style={floatRight}
                      >
                        เพิ่มบทเรียน
                    </Button>
                    </Link>
                  )
                }
              </Col>
              <Divider type="horizontal" className={style.dividerCourse} />
            </Row>
          ) : (
            (owner && courseId )|| !courseId) && (
            <Link to={courseId ? `/tutor/online/${courseId}/video/create` : `${location.pathname}/create`}>
              <button className={style.buttonfixbottom} >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
            )}
        </div>
        <ManageCourseDetail />
      </div>
    </Fragment>
  );
}