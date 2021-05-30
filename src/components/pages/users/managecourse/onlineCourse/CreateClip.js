import React, { Fragment } from "react";
import { Row, Grid, Col, Button, Divider } from "antd";
import style from "../styles.module.scss";
import Header from "../../../../headerMobile/Header";
import { clipSchema } from "../../../../../validation/course/clipSchema";
import isMobile from "../../../../isMobile/isMobile"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import InputComponents from "../../../../input/InputComponets";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { onlineCourseActions } from "../../../../../redux/actions";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";
import ModalComponent from "../../../../modal/ModalComponent";
import { useEffect } from "react";
import {serverSocket} from "../../../../../utils/socket";

const { useBreakpoint } = Grid;

export default function AddClip() {
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const { clip } = useSelector(state => state.onlineCourse)
  const { courseId, videoId } = useParams()
  const { loading } = useSelector(state => state.loading)
  const [vdo, setVdo] = useState(null)

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(clipSchema(videoId ? true : false)),
  });

  useEffect(() => {
    dispatch(onlineCourseActions.getClip(videoId))
    serverSocket.on("uploadProgress", () => {
      // TODO Uploading progress or check upload status
    })
    return () => {
      dispatch(onlineCourseActions.clearListOnlineCourse())
    }
  }, [])

  useEffect(() => {
    if (videoId) {
      reset({
        name: clip && clip.name,
        description: clip && clip.description,
        cost: clip && clip.cost,
      })
      if (clip) {
        setVdo({ VDOURL :clip.clipUrl,  name: clip.clipUrl })
      }
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.container}>

          {screens.md && (
            <Row>
              <span className={style.titleH2}>{videoId ? "แก้ไข" : "เพิ่ม"}บทเรียน</span>
            </Row>
          )}
          <Row >

            <Col xs={24} sm={24} md={24} lg={13} xl={11}>

              <Row justify="space-between" align="middle">
                <Col span={24} className={style.subProfile}>
                  <InputComponents
                    title="ชื่อคอร์ส"
                    type="text"
                    name="name"
                    register={register}
                    error={errors.name}
                    placeholder="ชื่อคอร์ส"
                  />
                </Col>
                <Col span={24} className={style.subProfile}>
                  <p className={style.textNormal}>รายละเอียด</p>
                  <Controller
                    as={
                      <TextArea className="input" name="description" size="large" />
                    }
                    name="description"
                    control={control}
                    defaultValue={""}
                    placeholder="คำอธิบายคอร์สเพิ่มเติม"
                  />
                  {errors.description && (
                    <p className="error-input">{errors.description.message}</p>
                  )}
                </Col>
                <Col span={24} className={style.subProfile}>
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

                <Col span={24} className={style.subProfile} >
                  <p className={style.textNormal}>คลิปการสอน</p>
                  <div className="imageUpload" >
                    <label htmlFor="file-input">
                      <span className={style.buttonInputFile}>{vdo ? "เพิ่มคลิปการสอน" : "แก้ไขคลิปการสอน"}</span>
                      <span className={style.textNormal}>{vdo && vdo.name}</span>
                    </label>
                    <input id="file-input" type="file" name="video" accept="video/mp4" ref={register} onChange={(data) => onChangeVDO(data)} />
                  </div>
                  {errors.video && <p className="error-input">{errors.video.message}</p>}
                </Col>
              </Row>
            </Col>
            {screens.md && (
              <Col md={3} lg={2} xl={2}>
                <Divider
                  type="vertical"
                  style={{ height: "100%", marginLeft: "3rem" }}
                />
              </Col>
            )}
            {
              vdo?.VDOURL && (
                <Col xs={24} sm={24} md={24} lg={8} xl={10} className={!screens.lg ? style.subProfile : null} align={!screens.lg ? "start" : "center"}>
                  <p className={style.textNormal}>ตัวอย่างคลิป</p>
                  <div className={style.scaleVideo}>
                    <video className={style.video}  src={(!vdo.file ? "https://" : "")+vdo.VDOURL}  width={"100%"} height="396" controls controlsList="nodownload" type="video/mp4" ></video>
                  </div>
                </Col>
              )
            }
            <Col xl={24} md={24} sm={24} xs={24} align="center" className={style.subProfile}>
              <Button
                className="buttonColor backgroundOrange"
                size="large"
                shape="round"
                style={{ width: "7.5rem" }}
                htmlType="submit"
              >
                บันทึก
          </Button>
            </Col>
          </Row>
        </div>

      </form>
    </Fragment>
  );
}
