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
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";

export default function ManageCourseDetail() {
  const dispatch = useDispatch()
  const { tutor, auth, loading } = useSelector(state => state)
  const [offlineCourse, setOfflineCourse] = useState(null)

  useEffect(() => {
    dispatch(tutorAction.getListOfflineCourse(auth.profile))
    return () => {
      dispatch(tutorAction.clearListOfflineCourse())
    }
  }, [])

  useEffect(() => {
    if (tutor.offlineCourse) {
      setOfflineCourse(tutor.offlineCourse.data)
    }
  }, [tutor.offlineCourse])

  return (
    <Fragment>
      {
        loading.loading && (
          <Loading />
        )
      }

      {isMobile() ? (
        <div>
          {tutor.offlineCourse.success && (
            offlineCourse ? (
              offlineCourse.map((item, index) => (
                <div key={index}>
                  <Link to={`/tutor/course/${item.id}`}>
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
          {tutor.offlineCourse.success && (
            offlineCourse ? (
              offlineCourse.map((item, index) => (
                  <Col align="center" xl={8} lg={8} md={12} sm={24}  key={index} style={{padding:"0.5rem"}}>
                     <Link to={`/tutor/course/${item.id}`} >
                    <CardCourse data={item} />
                    </Link>
                  </Col>
              ))
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