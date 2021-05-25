import { Col, Row } from "antd";
import React from "react";
import CardCourse from "../../../../card/CardCourse";
import CardLesson from "../../../../card/CardLesson";
import ListCourseTutor from "../../../../card/ListCourseTutor";
import isMobile from "../../../../isMobile/isMobile"
import { useDispatch } from "react-redux";
import { tutorAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment } from "react";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";
import { courseOnline, lesson } from "../../../../card/Constants";

export default function ManageCourseDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { courseId } = useParams()
  const { tutor, auth, loading } = useSelector(state => state)
  const [courseList, setCourseList] = useState(null)
  const [isOnline, setIsOnline1] = useState(location.pathname === "/tutor/online" || !isEmpty(courseId))

  useEffect(() => {
    setIsOnline1(location.pathname === "/tutor/online" || !isEmpty(courseId))
    if (!isOnline) {
      // get offline course
      dispatch(tutorAction.getListOfflineCourse(auth.profile))
    } else if (isOnline) {
      // get online course
      if (courseId) {
        // lesson page
        dispatch(tutorAction.getListOfflineCourse(auth.profile))
      } else {
        // get online course
        dispatch(tutorAction.getListOfflineCourse(auth.profile))
      }
    }
    return () => {
      dispatch(tutorAction.clearListOfflineCourse())
      setCourseList(null)
    }
  }, [location.pathname])

  useEffect(() => {
    let courseDetail = null
    if (!isOnline) {
      courseDetail = !isEmpty(tutor.offlineCourse) && tutor.offlineCourse.data
    } else if (isOnline) {
      if (courseId) {
        courseDetail = lesson
      } else {
        courseDetail = courseOnline
      }
    }
    setCourseList(courseDetail)

    return () => {
      setCourseList(null)
    }
  }, [tutor, location.pathname])

  return (
    <Fragment>
      {
        loading.loading && (
          <Loading />
        )
      }

      {isMobile() ? (
        <div>
          {(!loading.loading) && (
            courseList ? (
              courseList.map((item, index) => (
                <div key={index} style={{ padding: isOnline ? "0.5rem" : "0rem" }} >
                  <Link to={courseId ? `/tutor/online/1/video/create` : `/course/${item.id}`} >
                    {
                      isOnline ? (courseId ? <CardLesson data={item} /> : <ListCourseTutor data={item} isClip={true} />) : <ListCourseTutor data={item} isClip={false} />
                    }
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
        <Row align={"start"}>
          {(!loading.loading) && (
            courseList ? (
              <Fragment>
                {
                  courseList.map((item, index) => (
                    <Col align="center" xl={8} lg={12} md={isOnline ? 24 : 12} sm={24} key={index} style={{ padding: "0.5rem" }} >
                      <Link to={courseId ? `/tutor/online/1/video/create` : `/course/${item.id}`} >
                        {
                          !isOnline ? <CardCourse data={item} /> :
                            (
                              <CardLesson data={item} isCourse={courseId ? false : true} />
                            )
                        }
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