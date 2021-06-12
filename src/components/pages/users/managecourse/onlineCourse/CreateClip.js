import React, { Fragment } from "react";
import { Row, Grid, Col, Button } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import { clipSchema } from "../../../../../validation/course/clipSchema";
import isMobile from "../../../../isMobile/isMobile"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import InputComponents from "../../../../input/InputComponets";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { onlineCourseActions } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";
import ModalComponent from "../../../../modal/ModalComponent";
import { useEffect } from "react";
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import { useHistory } from "react-router-dom";
const { useBreakpoint } = Grid;

export default function AddClip() {
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const { clip } = useSelector(state => state.onlineCourse)
  const { courseId, videoId } = useParams()
  const { loading } = useSelector(state => state.loading)
  const [vdo, setVdo] = useState(null)
  const history = useHistory()

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(clipSchema(videoId ? true : false)),
  });

  useEffect(() => {
    if(videoId?.isSafeNotBlank()){
      dispatch(onlineCourseActions.getClip(videoId))
    }
    return () => {
      dispatch(onlineCourseActions.clearListOnlineCourse())
    }
  }, [])

  const resetEditInput = () => {
    if (videoId?.isSafeNotBlank()) {
      reset({
        name: clip && clip.name,
        description: clip && clip.description,
        cost: clip && clip.cost,
      })
      if (clip) {
        setVdo({ VDOURL: clip.clipUrl, name: clip.clipUrl })
      }
    } else {
      setVdo(null)
    }
  }

  useEffect(() => {
    if (videoId?.isSafeNotBlank()) {
      resetEditInput()
    }
  }, [clip])

  const onChangeVDO = data => {
    const fileInput = data.target.files[0]
    if (fileInput) {
      const vdoURL = URL.createObjectURL(fileInput)
      setVdo({ file: fileInput, VDOURL: vdoURL, name: fileInput.name })
    }
  }

  const onSubmit = (data) => {
    if (data) {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("courseId", courseId)
      formData.append("description", data.description)
      formData.append("cost", data.cost)
      if (vdo?.file) {
        formData.append("video", vdo.file)
      }
      if (!videoId) {
        dispatch(onlineCourseActions.createClipOnlineCourse(formData, courseId))
      } else {
        dispatch(onlineCourseActions.updateClipOnlineCourse(formData, courseId, videoId))
      }
    }
  }

  return (
    <Fragment>
      {isMobile() && (
        <Header title={(videoId ? "แก้ไข" : "เพิ่ม") + "บทเรียน"} pageBack="goback" />
      )}
      {loading && <Loading />}
      <ModalComponent />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.bodyPaddingTopBottom}>
            <div className={`${!isMobile() && style.section}`}>
              {!isMobile() && (
                <span className={`${style.headerFour}`}>{videoId ? "แก้ไข" : "เพิ่ม"}บทเรียน  </span>
              )}
            </div>
            <Row className={`${!isMobile() && style.section} ${!isMobile() && style.marginSection}`} justify="space-between">
              <Col xs={24} sm={24} md={24} lg={13} xl={11}>
                <Row justify="space-between" align="middle">
                  <Col span={24} className={!isMobile() && style.marginTopOne5}>
                    <InputComponents
                      title="ชื่อคอร์ส"
                      type="text"
                      name="name"
                      register={register}
                      error={errors.name}
                      placeholder="ชื่อคอร์ส"
                    />
                  </Col>
                  <Col span={24} className={style.marginTopOne5}>
                    <p className={style.textOne5}>รายละเอียด</p>
                    <textarea className="input" name="description" ref={register} placeholder="คำอธิบายคอร์สเพิ่มเติม" />
                    {errors.description && (
                      <p className="error-input">{errors.description.message}</p>
                    )}
                  </Col>
                  <Col span={24} className={style.marginTopOne5}>
                    <InputComponents
                      title="ราคาคลิปการสอน (เหรียญ)"
                      type="number"
                      name="cost"
                      min={0}
                      register={register}
                      error={errors.cost}
                      placeholder="ราคาของผู้เข้าชม"
                    />
                  </Col>
                  <Col span={24} className={style.marginTopOne5} >
                    <p className={style.textOne5}>คลิปการสอน</p>
                    <div className="imageUpload" >
                      <label htmlFor="file-input">
                        <span className={style.buttonInputFile}>{!vdo ? "อัปโหลดวิดิโอการสอน" : "แก้ไขวิดิโอการสอน"}</span>
                        {
                          isMobile() && (<br />)
                        }
                        {
                          vdo?.file && (
                            <span className={style.textOne5}>{vdo && vdo.name}</span>
                          )
                        }
                      </label>
                      <input id="file-input" type="file" name="video" accept="video/mp4" ref={register} onChange={(data) => onChangeVDO(data)} />
                    </div>
                    {errors.video && <p className="error-input">{errors.video.message}</p>}
                  </Col>
                </Row>
              </Col>
              {
                vdo?.VDOURL && (
                  <Col xs={24} sm={24} md={24} lg={8} xl={10} className={!screens.lg ? style.marginTopOne5 : null} align={!screens.lg ? "start" : "center"}>
                    <p className={style.textOne5}>ตัวอย่างคลิป</p>
                    <div className={style.scaleVideo}>
                      <video className={style.video} src={(!vdo.file ? "https://" : "") + vdo.VDOURL} width={"100%"} height="396" controls controlsList="nodownload" type="video/mp4" ></video>
                    </div>
                  </Col>
                )
              }
              <Col className={style.marginTopOne5} span={24} align="center">
                <Button
                  className={`${style.buttonColor} ${style.textOne25}`}
                  style={styleComponent.buttonFull(color.orange, "5rem")}
                  htmlType="submit">
                  บันทึก
              </Button>
                <Button
                  className={`${style.buttonColor} ${style.textOne25} ${style.marginLeftOne}`}
                  style={styleComponent.buttonFull(color.blue, "5rem")}
                  onClick={()=> history.goBack()}>
                  ยกเลิก
              </Button>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </Fragment>
  );
}