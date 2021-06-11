import React, { Fragment } from "react";
import style from "../styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Row, Select, Grid } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../../../../validation/course/courseSchema";
import Header from "../../../../headerMobile/Header";
import { defaultValue } from "../../../../defaultValue/defaultValue";
import isMobile from "../../../../isMobile/isMobile"
import { useParams } from "react-router";
import { useEffect } from "react";
import InputComponents from "../../../../input/InputComponets";
import ModalComponent from "../../../../modal/ModalComponent"
import { useDispatch } from "react-redux";
import { offlineCourseAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import Loading from "../../../../loading/Loading";
import TimeField from 'react-simple-timefield';
import { styleComponent } from "../../../../defaultFunction/style";
import { color } from "../../../../defaultValue";
import { useHistory } from "react-router-dom";
const { useBreakpoint } = Grid;

export default function AddCourse() {
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const { offlineCourse, loading } = useSelector(state => state)
  const dataDetaill = offlineCourse.data && offlineCourse.data
  const param = useParams();
  const { id } = param
  const history = useHistory()

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(courseSchema),
  });

  useEffect(() => {
    if (id?.isSafeNotBlank()) {
      dispatch(offlineCourseAction.getOfflineCourse(id))
    }
    return () => {
      dispatch(offlineCourseAction.clearOfflineCourse())
    }
  }, [])

  const resetEditInput = () => {
    if (dataDetaill) {
      reset({
        namecourse: dataDetaill.name,
        subject: dataDetaill.subject.id,
        grade: dataDetaill.grade.grade,
        type: dataDetaill.type,
        dateOfWeek: dataDetaill.dayOfWeek,
        start: dataDetaill.startTime,
        end: dataDetaill.endTime,
        price: dataDetaill.cost,
        description: dataDetaill.description,
      })
    }
  }

  useEffect(() => {
    resetEditInput()
  }, [dataDetaill])

  const onSubmit = (data) => {
    if (data) {
      const formData = {
        "name": data.namecourse,
        "subject": id ? dataDetaill.subject.id : data.subject,
        "description": data.description,
        "grade": data.grade,
        "type": data.type,
        "dayOfWeek": Number(data.dateOfWeek),
        "startTime": data.start,
        "endTime": data.end,
        "cost": data.price
      }

      if (id?.isSafeNotBlank()) {
        dispatch(offlineCourseAction.updatefflineCourse(id, formData))
      } else {
        dispatch(offlineCourseAction.createOfflineCourse(formData))
      }
    }
  }

  return (
    <Fragment>
      <ModalComponent />
      {isMobile() && (
        <Header title={(id ? "แก้ไข" : "สร้าง") + "คอร์ส"} pageBack="/tutor/course" />
      )}
      {
        loading.loading && (
          <Loading />
        )
      }
      <div className="container">
        <form id="addCourse" onSubmit={handleSubmit(onSubmit)}>
          <div className={style.bodyPaddingTopBottom}>
            <div className={`${!isMobile() && style.section}`}>
              {screens.md && (
                <span className={`${style.headerFour}`}>{id ? "แก้ไข" : "สร้าง"}คอร์สเรียน </span>
              )}
            </div>
            <Row
              className={`${!isMobile() && style.section} ${!isMobile() && style.marginSection}`}
              justify="space-between"
            >
              <Col xl={11} md={20} sm={20} xs={24} className={!isMobile() && style.marginTopOne5}>
                <InputComponents
                  title="ชื่อคอร์ส"
                  type="text"
                  name="namecourse"
                  register={register}
                  error={errors.namecourse}
                  placeholder="ชื่อคอร์สเรียน"
                />
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <p className={style.textOne5}>วิชา</p>
                <Controller
                  as={
                    <Select name="subject" disabled={id ? true : false}>
                      {
                        defaultValue.subject && Object.entries(defaultValue.subject).map(([key, value]) => (
                          <Select.Option key={value} value={value}>{key}</Select.Option>
                        ))
                      }
                    </Select>
                  }
                  name="subject"
                  control={control}
                  placeholder="วิชา"
                  defaultValue={null}
                />
                {errors.subject && (
                  <p className="error-input">{errors.subject.message}</p>
                )}
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <p className={style.textOne5}>ระดับชั้น</p>
                <Controller
                  as={
                    <Select name="grade">
                      {
                        defaultValue.grade && Object.entries(defaultValue.grade).map(([key, value]) => (
                          <Select.Option key={value} value={value}>{key}</Select.Option>
                        ))
                      }
                    </Select>
                  }
                  name="grade"
                  control={control}
                  placeholder="ระดับชั้น"
                  defaultValue={null}
                />
                {errors.grade && (
                  <p className="error-input">{errors.grade.message}</p>
                )}
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <p className={style.textOne5}>ประเภท</p>
                <Controller
                  as={
                    <Select name="type">
                      {defaultValue.type &&
                        Object.entries(defaultValue.type).map(([key, value]) => (
                          <Select.Option key={value} value={value}>
                            {key}
                          </Select.Option>
                        ))}
                    </Select>
                  }
                  name="type"
                  control={control}
                  placeholder="ประเภทการสอน"
                  defaultValue={null}
                />
                {errors.type && (
                  <p className="error-input">{errors.type.message}</p>
                )}
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <p className={style.textOne5}>วันที่สอน</p>
                <Controller
                  as={
                    <Select name="dateOfWeek">
                      {defaultValue.dateOfWeek &&
                        Object.entries(defaultValue.dateOfWeek).map(
                          ([key, value]) => (
                            <Select.Option key={value} value={value}>
                              {key}
                            </Select.Option>
                          )
                        )}
                    </Select>
                  }
                  name="dateOfWeek"
                  control={control}
                  placeholder="วันที่สอน"
                  defaultValue={null}
                />
                {errors.dateOfWeek && (
                  <p className="error-input">{errors.dateOfWeek.message}</p>
                )}
              </Col>
              <Col xl={11} md={20} sm={20} xs={24}>
                <Row justify="space-between">
                  <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                    <p className={style.textOne5}>เวลา(เริ่ม)</p>
                    <Controller
                      as={
                        <TimeField className="input" style={{ width: "100%" }} />
                      }
                      name="start"
                      control={control}
                      defaultValue={""}
                    />
                    {errors.start && (
                      <p className="error-input">{errors.start.message}</p>
                    )}
                  </Col>
                  <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                    <p className={style.textOne5}>เวลา(จบ)</p>
                    <Controller
                      as={
                        <TimeField className="input" style={{ width: "100%" }} />
                      }
                      name="end"
                      control={control}
                      defaultValue={""}
                    />
                    {errors.end && (
                      <p className="error-input">{errors.end.message}</p>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <InputComponents
                  title="ราคา (ต่อ 1 ชั่วโมง)"
                  type="number"
                  name="price"
                  min="0"
                  register={register}
                  error={errors.price}
                  placeholder="ราคาต่อ 1 ชั่วโมง"
                />
              </Col>
              <Col xl={11} md={20} sm={20} xs={24} className={style.marginTopOne5}>
                <p className={style.textOne5}>แนะนำคอร์ส</p>
                <textarea name="description" className="input" rows="3" ref={register} placeholder="คำอธิบายคอร์สเพิ่มเติม" />
                {errors.description && (
                  <p className="error-input">{errors.description.message}</p>
                )}
              </Col>
              <Col className={style.marginSection} span={24} align="center">
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