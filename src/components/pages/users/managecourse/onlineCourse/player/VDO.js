import React, { Fragment } from "react";
import { Row, Col, Tooltip, Button } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isMobile from "../../../../../isMobile/isMobile"
import { useHistory, useParams } from "react-router";
import { modalAction, onlineCourseActions } from "../../../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { SkeletonComponent } from "../../../../../loading/SkeletonComponent";
// import EmptyImage from "../../../../../loading/EmptyImage";
import { Link } from "react-router-dom";
import { useState } from "react";
import isEmpty from "../../../../../defaultFunction/checkEmptyObject";
import { color } from "../../../../../defaultValue";
import ReviewForm, { DeleteForm } from "../../../review/ReviewForm";
import { sizeModal } from "../../../../../modal/SizeModal";
import ModalComponent from "../../../../../modal/ModalComponent";
import Loading from "../../../../../loading/Loading";
import buttonFull from "../../../../../defaultFunction/style";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function ManageClip() {
  const { clip } = useSelector(state => state.onlineCourse)
  const { profile, isAuthenticated } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.loading)
  const [showMessage, setShowMessage] = useState(false)
  const { videoId, courseId } = useParams()
  const owner = (!isEmpty(clip) && profile) && (profile === clip.owner.id)
  const isBuyClip = !isEmpty(clip) && clip.cost === 0
  const dispatch = useDispatch()
  const history = useHistory()
  const screens = useBreakpoint();
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

  const handleActionClip = () => {
    if (!isAuthenticated) {
      history.push("/login")
    }
  }

  const handleReview = () => {
    dispatch(modalAction.openModal({
      body: <ReviewForm courseId={courseId} />,
      size: sizeModal.default,
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
      <div className="container">
        <Row className={style.bodyPaddingTopBottom} justify="space-around" align="center">
          <Col xl={15} lg={15} md={24} sm={24} xs={24}>
            <Col span={24} >

            </Col>
            <Col span={24} className={`${style.marginSection} ${style.scaleVideo} `} align="center">
              {
                clip && (
                  <Fragment>
                    <video className={style.video} src={"https://" + clip.clipUrl} width="560" height="315" controls controlsList="nodownload" type="video/mp4"></video>
                    <div className={style.setVdo} hidden={owner || (isBuyClip && (isAuthenticated === true))}>
                      <div className={style.centerInabs}>
                        <p style={{ color: color.white }}>คุณยังไม่ได้ซื้อบทเรียนนี้</p>
                        <Button className="buttonColor backgroundOrange" size="large" shape="round" onClick={() => handleActionClip()}>
                          {
                            isAuthenticated ? `ซื้อบทเรียนนี้ทันทีในราคา ${clip && clip.cost} เหรียญ` : "เข้าสู่ระบบเพื่อรับชมบทเรียน"
                          }
                        </Button>
                      </div>
                    </div>
                  </Fragment>
                )
              }
            </Col>
            <Col className={`${style.section} ${style.marginSection}`} span={24} onClick={() => setShowMessage(!showMessage)}>
              {
                clip ? (
                  <Fragment>
                    <Row align="middle" >
                      <Col span={20}>
                        <span className={style.textTwo25}>{clip.name}</span>
                      </Col>
                      <Col span={4} align="end">
                        <span className={style.textOne5}>
                          <FontAwesomeIcon icon={faBitcoin} style={{ color: color.yellow }} />
                        </span>
                        <span className={`${style.marginleftIcon} ${style.textOne25}`}>{clip && clip.cost}</span>
                      </Col>
                    </Row>

                    <span className={`${style.textThreeLine} ${style.textOne}`} style={showtext}>{clip.description}</span>
                    <u className={style.textOne}>{showMessage ? "ย่อรายละเอียดของบทเรียน" : "ดูรายละเอียดบทเรียนเพิ่มเติม"}</u>
                  </Fragment>
                ) : (
                  <Fragment>
                    <SkeletonComponent.SkeletonText />
                    <SkeletonComponent.SkeletonTextDetail />
                  </Fragment>
                )
              }
            </Col>

          </Col>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <Col className={`${style.section} ${style.marginSection}`} span={24}>
              <span className={style.headerOne75}>รีวิวจากผู้เรียนจริง</span>
            </Col>
            {
              (screens.lg && isBuyClip) && (
                <Col className={style.marginSection} span={24}>
                  <button className={`${style.buttonColor} ${style.textTwo}`} style={buttonFull(color.orange)} onClick={() => handleReview()}>ให้คะแนน</button>
                </Col>
              )
            }
          </Col>
        </Row>
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
      </div>
      {
        !screens.lg && (
          <div className={!screens.md ? style.navbarBottom : style.navbarBottomMD}>
            {
              isBuyClip ? (
                <button className={style.reviewbottom} onClick={() => handleReview()}>ให้คะแนน</button>
              ) : (
                <button className={style.reviewbottom} >ซื้อบทเรียนนี้</button>
              )
            }
          </div>
        )
      }
    </Fragment >
  );
}
