import { Col, Row } from "antd";
import React from "react";
import CardCourse from "../../../../card/CardCourse";
import ListCourseTutor from "../../../../card/ListCourseTutor";
import isMobile from "../../../../isMobile/isMobile"
import { useDispatch } from "react-redux";
import { tutorAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";

export default function ManageCourseDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { tutor, auth, loading } = useSelector(state => state)
  const [offlineCourse, setOfflineCourse] = useState(null)
  const [onlineCourse, setOnlineCourse] = useState(null)
  const isOnline = location.pathname === "/tutor/online"

  useEffect(() => {
    if (!isOnline) {
      dispatch(tutorAction.getListOfflineCourse(auth.profile))
    }else {
      dispatch(tutorAction.getListOfflineCourse(auth.profile))
    }
    return () => {
      dispatch(tutorAction.clearListOfflineCourse())
    }
  }, [])

  useEffect(() => {
    if (!isOnline) {
      if (tutor.offlineCourse) {
        setOfflineCourse(tutor.offlineCourse.data)
      }
    } else {
      // setOnlineCourse(null)
      if (tutor.offlineCourse) {
        setOnlineCourse(tutor.offlineCourse.data)
      }
    }
  }, [tutor])

  return (
    <Fragment>
      {
        loading.loading && (
          <Loading />
        )
      }

      {isMobile() ? (
        <div>
          {(tutor.offlineCourse.success && !isOnline) && (
            offlineCourse ? (
              offlineCourse.map((item, index) => (
                <div key={index}>
                  <Link to={`/course/${item.id}`}>
                    <ListCourseTutor data={item} />
                  </Link>
                </div>
              ))
            ) : (
              <div align="center">
                <EmptyImage size="default" />
              </div>
            )
          )}
        </div>
      ) : (
        <Row >
          {(!loading.loading) && (

            (offlineCourse || onlineCourse) ? (
              <Fragment>

                {/* for offline course */}
                {
                  (!isOnline && offlineCourse) && offlineCourse.map((item, index) => (
                    <Col align="center" xl={8} lg={8} md={12} sm={24} key={index} style={{ padding: "0.5rem" }}>
                      <Link to={`/course/${item.id}`} >
                        <CardCourse data={item} />
                      </Link>
                    </Col>
                  ))
                }
                {/* for online course */}
                {
                  (isOnline && onlineCourse) && onlineCourse.map((item, index) => (
                    <Col align="center" xl={8} lg={8} md={12} sm={24} key={index} style={{ padding: "0.5rem" }}>
                      <Link to={`/online/${item.id}`} >
                        <CardCourse data={item} />
                       
                        {/* <CardLesson data={item} /> */}
                      </Link>
                    </Col>
                  ))
                }
              </Fragment>
            ) : (
              <div align="center">
                <EmptyImage size="default" />
              </div>
            )
          )}
        </Row>
      )
      }
    </Fragment >
  );
}