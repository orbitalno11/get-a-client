import React, { Fragment } from "react";
import { Col, Row, Button, Select, Image } from "antd";
import style from "../styles.module.scss";
import isMobile from "../../../../isMobile/isMobile"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseClipSchema } from "../../../../../validation/course/courseClipSchema";
import titleOnlineCourse from "../../../../images/titleOnlineCourse.webp"
import InputComponents from "../../../../input/InputComponets";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { modalAction, onlineCourseActions } from "../../../../../redux/actions";
import { sizeModal } from "../../../../modal/SizeModal";
import { typeModal } from "../../../../modal/TypeModal";
import ModalComponent from "../../../../modal/ModalComponent";
import Loading from "../../../../loading/Loading";
import { useSelector } from "react-redux";
import resizeImage from "../../../../defaultFunction/resizeImage";
import { defaultValue } from "../../../../defaultValue";
import Header from "../../../../headerMobile/Header";
import { useParams } from "react-router";
import findKeyObject from "../../../../defaultFunction/findKeyObject";

export default function CreateCourseOnline() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.loading)
  const dataCourse = useSelector(state => state.onlineCourse)
  const [image, setimage] = useState(titleOnlineCourse)
  const { id } = useParams()

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(courseClipSchema(id ? true : false)),
  });

  useEffect(() => {
    dispatch(onlineCourseActions.getOnlineCourse(id))
    return () => {
      dispatch(onlineCourseActions.clearListOnlineCourse())
    }
  }, [])

  useEffect(() => {
    if(id && dataCourse.data){
      reset({
        name: dataCourse.data.name,
        grade: findKeyObject(defaultValue.grade,dataCourse.data.grade.grade),
        subject: findKeyObject(defaultValue.subject,dataCourse.data.subject.id),
      })
      setimage({imageURL : dataCourse.data.coverUrl})
    }else{
      reset({
        name: "",
        grade: "ม.4",
        subject: "คณิตศาสตร์"
      })
    }
 
  }, [dataCourse])

  const onChange = async data => {
    const fileInput = data.target.files[0]
    if (fileInput) {
      try {
        const newImageFile = await resizeImage(fileInput, "file", 2480, 3508)
        const imageURL = URL.createObjectURL(newImageFile)
        setimage({ file: newImageFile, imageURL: imageURL })
      } catch {
        dispatch(modalAction.openModal({
          text: "เพื่มรูปไม่สำเร็จ",
          size: sizeModal.small,
          alert: typeModal.wrong,
        }))
      }
    }
  }
  
  const onSubmit = (data) => {
    if (data) {
      let formdata = new FormData()
      formdata.append("name", data.name)
      formdata.append("grade", defaultValue.grade[data.grade])
      formdata.append("subject", defaultValue.subject[data.subject])

      if (image.file) {
        formdata.append("image", image.file)
      }
      
      if (!id) {
        dispatch(onlineCourseActions.createOnlineCourse(formdata))
      } else {
        dispatch(onlineCourseActions.updateOnlineCourse(formdata, id))
      }
    }
  }

  return (
    <Fragment>
      {isMobile() && (<Header title={(id?"แก้ไข":"สร้าง")+"คอร์สเรียน"} pageBack="goback" />)}
      <ModalComponent />
      {
        loading && (
          <Loading />
        )
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className={style.container} justify="center">
          <Col span={24} align="center">
            {!isMobile() && (
              <span className={style.titleH2}>{id ? "แก้ไข" : "สร้าง"}คอร์สเรียน </span>
            )}
          </Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <Row justify="space-between" align="middle">
              <Col xl={24} md={24} sm={24} xs={24} className={style.subProfile}>
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
                <p className={style.textNormal}>ชั้นเรียน</p>
                <Controller
                  as={
                    <Select name="grade">
                      {defaultValue.grade &&
                        Object.entries(defaultValue.grade).map(([key, value]) => (
                          <Select.Option key={value} value={key}>
                            {key}
                          </Select.Option>
                        ))}
                    </Select>
                  }
                  name="grade"
                  control={control}
                  defaultValue=""
                />
                {errors.grade && (
                  <p className="error-input">{errors.grade.message}</p>
                )}
              </Col>
              <Col span={24} className={style.subProfile}>
                <p className={style.textNormal}>วิชา</p>
                <Controller
                  as={
                    <Select name="subject" disabled={id?true:false}>
                      {defaultValue.subject &&
                        Object.entries(defaultValue.subject).map(([key, value]) => (
                          <Select.Option key={value} value={key}>{key}
                          </Select.Option>
                        ))}
                    </Select>
                  }
                  name="subject"
                  control={control}
                  defaultValue=""
                />
                {errors.subject && (
                  <p className="error-input">{errors.subject.message}</p>
                )}
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={9} lg={9} xl={9} align="center" className={style.subProfile}>
            <p className={style.textNormal}>ภาพหน้าปกคอร์ส</p>
            <div className="imageUpload">
              <label htmlFor="file-input">
                <Image
                  className={`${style.a4Image} ${style.borderImage}`}
                  src={image.imageURL ? image.imageURL : titleOnlineCourse}
                  preview={false}
                />
              </label>
              <input id="file-input" type="file" name="image" ref={register} onChange={onChange} />
            </div>
            {errors.image && <p className="error-input">{errors.image.message}</p>}
          </Col>

          <Col span={24} align="center" className={style.subProfile}>
            <Button
              className="buttonColor backgroundOrange"
              size="large"
              shape="round"
              style={{ width: "7.5rem" }}
              htmlType="submit">
              บันทึก
          </Button>
          </Col>
        </Row>

      </form>
    </Fragment>
  );
}
