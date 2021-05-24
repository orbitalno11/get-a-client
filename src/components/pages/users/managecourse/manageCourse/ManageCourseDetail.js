import { Col, Row, Grid } from "antd";
import React from "react";
import CardCourse from "../../../../card/CardCourse";
import CardLesson from "../../../../card/CardLesson";
import ListCourseTutor from "../../../../card/ListCourseTutor";
import { useDispatch } from "react-redux";
import { onlineCourseActions, tutorAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fragment } from "react";
import Loading from "../../../../loading/Loading";
import EmptyImage from "../../../../loading/EmptyImage";
import isEmpty from "../../../../defaultFunction/checkEmptyObject";

const { useBreakpoint } = Grid;

export default function ManageCourseDetail() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { courseId } = useParams()
  const { tutor, auth, loading, onlineCourse } = useSelector(state => state)
  const [courseList, setCourseList] = useState([])
  const [clipList, setClipList] = useState([])
  const [isOnline, setIsOnline1] = useState(location.pathname === "/tutor/online" || !isEmpty(courseId))
  const screens = useBreakpoint();

  useEffect(() => {
    setIsOnline1(location.pathname === "/tutor/online" || !isEmpty(courseId))
    if (!isOnline) {
      // get offline course
      dispatch(tutorAction.getListOfflineCourse(auth.profile))
    } else if (isOnline) {
      if (courseId) {
        // lesson page
        dispatch(onlineCourseActions.getClipOnlineCourse(courseId))
      } else {
        // get online course
        dispatch(onlineCourseActions.getTutorOnlineCourse(auth.profile))
      }
    }

    return () => {
      dispatch(tutorAction.clearListOfflineCourse())
      dispatch(onlineCourseActions.clearListOnlineCourse())
      setCourseList([])
      setClipList([])
    }
  }, [location.pathname, isOnline, courseId])

  useEffect(() => {
    let courseDetail = null
    if (!isOnline) {
      courseDetail = !isEmpty(tutor.offlineCourse.data) ? tutor.offlineCourse.data : null
    } else if (isOnline) {
      if (courseId) {
        setClipList(!isEmpty(onlineCourse.listClip) ? onlineCourse.listClip : null)
      } else {
        courseDetail = !isEmpty(onlineCourse.listOnlineTutor) ? onlineCourse.listOnlineTutor : null
      }
    }

    if (courseDetail && !courseId) {
      setCourseList(courseDetail)
    }
  }, [tutor, onlineCourse, isOnline, courseId])

  return (
    <Fragment>
      {
        loading.loading && (
          <Loading />
        )
      }
      {
        !courseId ? (
          !screens.md ? (
            <div>
              {(!loading.loading && !isEmpty(courseList)) && (
                courseList.map((item, index) => (
                  <div key={index} style={{ padding: isOnline ? "0.5rem" : "0rem" }} >
                    <Link to={isOnline ? `/online/${item.id}` : `/course/${item.id}`} >
                      {
                        <ListCourseTutor data={item} isClip={isOnline ? true : false} />
                      }
                    </Link>
                  </div>
                ))
              )}
            </div>
          ) : (
            <Row align={"start"}>
              {(!loading.loading && !isEmpty(courseList)) && (
                courseList.map((item, index) => (
                  <Col align="center" xl={8} lg={12} md={isOnline ? 24 : 12} sm={24} key={index} style={{ padding: "0.5rem" }} >
                    <Link to={isOnline ? `/online/${item.id}` : `/course/${item.id}`} >
                      {
                        !isOnline ? <CardCourse data={item} /> : <CardLesson data={item} isCourse={true} />
                      }
                    </Link>
                  </Col>
                ))
              )}
            </Row>
          )
        ) : (
          <Row align={"start"}>
            {(!loading.loading && !isEmpty(clipList)) && (
              clipList.map((item, index) => (
                <Col align="center" xl={8} lg={12} md={24} sm={24} xs={24} key={index} style={{ padding: "0.5rem" }} >
                  <Link to={`/tutor/online/${courseId}/video/${item.id}`}>
                    {
                      <CardLesson data={item} />
                    }
                  </Link>
                </Col>
              ))
            )}
          </Row>
        )
      }

      {
        (!loading.loading && (isEmpty(clipList) && isEmpty(courseList))) && (
          <div align="center"><EmptyImage  size="default"/></div>
        )
      }
    </Fragment >
  );
}