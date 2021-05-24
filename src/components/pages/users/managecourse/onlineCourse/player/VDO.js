import React, { Fragment } from "react";
import { Row, Col, Tooltip } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../../../../isMobile/isMobile"
import { useParams } from "react-router";
import { modalAction, onlineCourseActions } from "../../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SkeletonComponent } from "../../../../../loading/SkeletonComponent";
import EmptyImage from "../../../../../loading/EmptyImage";
import { Link } from "react-router-dom";
import { useState } from "react";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../../defaultValue";
import { DeleteForm } from "../../../review/ReviewForm";
import { sizeModal } from "../../../../../modal/SizeModal";
import ModalComponent from "../../../../../modal/ModalComponent";
import Loading from "../../../../../loading/Loading";

export default function ManageClip() {
  const { clip } = useSelector(state => state.onlineCourse)
  const { profile } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.loading)
  const [showMessage, setShowMessage] = useState(false)
  const { videoId, courseId } = useParams()
  const owner = (!isEmpty(clip) && profile) && (profile === clip.owner.id)
  const dispatch = useDispatch()
  const showtext = {
    display: showMessage ? "block" : "-webkit-box"
  }

  useEffect(() => {
    dispatch(onlineCourseActions.getClip(videoId))
    return () => {
      dispatch(onlineCourseActions.clearListOnlineCourse())
    }
  }, [])

  const buttonDelete = {
    bottom: "7.5rem",
    backgroundColor: color.red
  }

  const onHandleDeleteClip = () => {
    dispatch(modalAction.openModal({
      body: <DeleteForm type="clip" />,
      size: sizeModal.default
    }))
  }

  return (
    <Fragment>
      {isMobile() && (
        <Header pageBack={`/course/online/${courseId}/video`} />
      )}
      <ModalComponent />
      {
        loading && (
          <Loading />
        )
      }
      <Row className={`${style.paddingTopBody} ${style.paddingBottomBody}`} align="center">

        <Col xs={24} sm={24} md={20} lg={14} xl={14} className={style.paddingbody} >
          {
            clip ? (
              <Fragment>
                <span className={style.titleH2}>{clip.name}</span>
              </Fragment>
            ) : (
              <SkeletonComponent.SkeletonText />
            )
          }
        </Col>
        <Col xs={24} sm={24} md={20} lg={14} xl={14} align="center" className={!isMobile() ? style.paddingbody : null} >
          <div className={`${style.scaleVideo} ${style.subProfile}`}>
            {
              clip && (
                <video className={style.video} src={"https://"+clip.clipUrl} width="560" height="315" controls controlsList="nodownload"  type="video/mp4"></video>
              )
            }
          </div>

        </Col>

        <Col className={`${style.subProfile} ${style.paddingbody}`} xs={24} sm={24} md={20} lg={14} xl={14} onClick={() => setShowMessage(!showMessage)}>
          {
            clip ? (
              <Fragment>
                <span className={`${style.textThreeLine} ${style.textNormal}`} style={showtext}>{clip.description}</span>
                <u>{showMessage ? "ย่อรายละเอียดของบทเรียน" : "ดูรายละเอียดบทเรียนเพิ่มเติม"}</u>
              </Fragment>
            ) : (
              <SkeletonComponent.SkeletonText />
            )
          }
        </Col>

        <Col className={`${style.subProfile} ${style.paddingbody}`} xs={24} sm={24} md={20} lg={14} xl={14}>
          <span className={style.titleH3}>รีวิวจากผู้เรียนจริง</span>
          <div align="center">
            <EmptyImage size="default" />
            <p className={style.textNormal}>บทเรียนนี้ยังไม่มีผู้แสดงความคิดเห็น&nbsp;
            </p>
          </div>
        </Col>
        {
          owner && (
            <Fragment>
              <Col className={style.marginRigth} span={24} >
                <Tooltip placement="topLeft" title="ลบรายละเอียดของคลิปเรียนนี้">
                  <button onClick={() => onHandleDeleteClip()} className={style.buttonfixbottom} style={buttonDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </Tooltip>
              </Col>
              <Col className={style.marginRigth} span={24} >
                <Link to={`/tutor/online/${courseId}/video/${videoId}/edit`}>
                  <Tooltip placement="topLeft" title="แก้ไขรายละเอียดของคลิปเรียนนี้">
                    <button className={style.buttonfixbottom} >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </Tooltip>
                </Link>
              </Col>
            </Fragment>
          )
        }
      </Row>
    </Fragment >
  );
}
