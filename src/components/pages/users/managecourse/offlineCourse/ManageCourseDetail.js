import { Col, Row } from "antd";
import React from "react";
import CardCourse from "../../../../card/CardCourse";
import ListCourseTutor from "../../../../card/ListCourseTutor";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile"
import { useDispatch } from "react-redux";
import { tutorAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Loading from "../../../../loading/Loading";

export default function ManageCourseDetail() {
  const dispatch = useDispatch()
  const { tutor, auth, loading } = useSelector(state => state)
  const [offlineCourse, setOfflineCourse] = useState(null)

  useEffect(() => {
    dispatch(tutorAction.getListOfflineCourse(auth.profile))
    return () =>{
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
          {offlineCourse &&
            offlineCourse.map((item, index) => (
              <div key={index}>
                <Link to={`/tutor/course/${item.id}`}>
                  <ListCourseTutor data={item} />
                </Link>

              </div>
            ))}
         
        </div>
      ) : (
        <Row>
          {offlineCourse &&
            offlineCourse.map((item, index) => (
              <Col className={ style.paddingmange} key={index} xl={8} lg={12} md={12} sm={24} align="center">
                <Link to={`/tutor/course/${item.id}`}>
                  <CardCourse data={item} />
                </Link>
              </Col>
            ))}
        </Row>
      )}

    </Fragment>
  );
}
