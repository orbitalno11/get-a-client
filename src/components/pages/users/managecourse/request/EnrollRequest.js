import React, { Fragment } from "react";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import isMobile from "../../../../isMobile/isMobile"
import { Divider } from "antd";
import Request from "./Request";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { offlineCourseAction } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
import ModalComponent from "../../../../modal/ModalComponent";

export default function EnrollRequest() {
  const dispatch = useDispatch()
  const params = useParams()
  const { offlineCourse,loading } = useSelector(state => state)
  const requestOfflineCourse = offlineCourse.enrollList && offlineCourse.enrollList.filter(item=>item.status === 0)

  useEffect(() => {
    dispatch(offlineCourseAction.getEnrollOfflineCourse(params.id))
    return ()=>{
      dispatch(offlineCourseAction.clearOfflineCourse())
    }
  }, [])

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
      <div className={style.body}>
      <ModalComponent />

        {!isMobile() && (
          <Fragment>
            <span className={style.titleH2}>คำขอเข้าเรียน</span>
            <Divider type="horizontal" className={style.dividerCourse} />
          </Fragment>
        )}
        {
          requestOfflineCourse && (
            requestOfflineCourse.map((item, index) => (
              <Request id={params.id} data={item} key={index} />
            ))
          )
        }
      </div>
    </Fragment>
  );
}