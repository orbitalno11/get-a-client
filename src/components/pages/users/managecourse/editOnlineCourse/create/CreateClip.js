import React, { Fragment } from "react";
import { Col, Row, Button, Select, Image } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import isMobile from "../../../../../isMobile/isMobile"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValue } from "../../../../../defaultValue/defaultValue";
import { courseClipSchema } from "../../../../../../validation/course/courseClipSchema";
import titleOnlineCourse from "../../../../../images/titleOnlineCourse.webp"
import InputComponents from "../../../../../input/InputComponets";
import { useEffect } from "react";
import { useState } from "react";
import resizeImage from "../../../../../defaultFunction/resizeImage";
import { useDispatch } from "react-redux";
import { modalAction, onlineCourseActions } from "../../../../../../redux/actions";
import { sizeModal } from "../../../../../modal/SizeModal";
import { typeModal } from "../../../../../modal/TypeModal";
import ModalComponent from "../../../../../modal/ModalComponent";
import Loading from "../../../../../loading/Loading";
import { useSelector } from "react-redux";

export default function CreateClip() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.loading)
  const [image, setimage] = useState(titleOnlineCourse)

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(courseClipSchema),
  });

  useEffect(() => {
    reset({
      name: "",
      grade: "ม.4",
      subject: "คณิตศาสตร์"
    })
  }, [])

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
      formdata.append("image", image.file)

      for (let [key, value] of formdata.entries()) {
        console.log(`${key}: ${value}`);
      }

      dispatch(onlineCourseActions.createOnlineCourse(formdata))
    }
  }


  return (
    <Fragment>
      {isMobile() && (<Header title="สร้างคอร์สเรียน" pageBack="/tutor/online" />)}
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
              <span className={style.titleH2}>สร้างคอร์สเรียน </span>
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
                    <Select name="subject">
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
