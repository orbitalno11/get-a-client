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
import TextArea from "antd/lib/input/TextArea";
import ModalComponent from "../../../../modal/ModalComponent"
import { useDispatch } from "react-redux";
import { offlineCourseAction } from "../../../../../redux/actions";
import { useSelector } from "react-redux";
import findKeyObject from "../../../../defaultFunction/findKeyObject";
import Loading from "../../../../loading/Loading";
import TimeField from 'react-simple-timefield';

const { useBreakpoint } = Grid;

export default function AddCourse() {
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const { offlineCourse, loading } = useSelector(state => state)
  const param = useParams();
  const { id } = param

  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(courseSchema),
  });
  const dataDetaill = offlineCourse.data && offlineCourse.data

  useEffect(() => {
    if (id) {
      dispatch(offlineCourseAction.getOfflineCourse(id))
    } else {
      reset({
        subject: "คณิตศาสตร์",
        grade: "ม.1",
        type: "กลุ่ม",
        dateOfWeek: "ไม่ระบุวัน",
      })
    }
    return () => {
      dispatch(offlineCourseAction.clearOfflineCourse())
    }
  }, [])

  useEffect(() => {
    if (dataDetaill) {
      console.log(dataDetaill.startTime)
      console.log(new Date(dataDetaill.startTime))
      reset({
        namecourse: dataDetaill.name,
        subject: dataDetaill.subject.title,
        grade: findKeyObject(defaultValue.grade, dataDetaill.grade.grade),
        type: "กลุ่ม",
        dateOfWeek: findKeyObject(defaultValue.dateOfWeek, dataDetaill.dayOfWeek),
        start: dataDetaill.startTime,
        end: dataDetaill.endTime,
        price: dataDetaill.cost,
        description: dataDetaill.description,
      })
    }
  }, [dataDetaill])

  console.log(dataDetaill)

  const onSubmit = (data) => {
    if (data) {
      const formData = {
        "name": data.namecourse,
        "subject": defaultValue.subject[data.subject],
        "description": data.description,
        "grade": defaultValue.grade[data.grade],
        "type": defaultValue.type[data.type],
        "dayOfWeek": defaultValue.dateOfWeek[data.dateOfWeek],
        "startTime": data.start,
        "endTime": data.end,
        "cost": data.price
      }

      if (id) {
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
        <Header title="สร้างคอร์ส" pageBack="/tutor/course" />
      )}
      {
        loading.loading && (
          <Loading />
        )
      }
      <div className={style.body}>
        <form id="addCourse" onSubmit={handleSubmit(onSubmit)}>
          {screens.md && (
            <Row justify="center">
              <span className={style.titleH2}>สร้างคอร์สเรียน </span>
            </Row>
          )}
          <Row
            className={`${style.paddingbody} ${style.margintop}`}
            justify="space-around"
          >
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <InputComponents
                title="ชื่อคอร์ส"
                type="text"
                name="namecourse"
                register={register}
                error={errors.namecourse}
                placeholder="ชื่อคอร์สเรียน"
              />
            </Col>
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>วิชา</p>
              <Controller
                as={
                  <Select name="subject">
                    {defaultValue.subject &&
                      Object.entries(defaultValue.subject).map(
                        ([value]) => (
                          <Select.Option key={value} value={value}>
                            {value}
                          </Select.Option>
                        )
                      )}
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>ระดับชั้น</p>
              <Controller
                as={
                  <Select name="grade">
                    {defaultValue.grade &&
                      Object.entries(defaultValue.grade).map(([value]) => (
                        <Select.Option key={value} value={value}>
                          {value}
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>ประเภท</p>
              <Controller
                as={
                  <Select name="type">
                    {defaultValue.type &&
                      Object.entries(defaultValue.type).map(([value]) => (
                        <Select.Option key={value} value={value}>
                          {value}
                        </Select.Option>
                      ))}
                  </Select>
                }
                name="type"
                control={control}
                defaultValue=""
              />
              {errors.type && (
                <p className="error-input">{errors.type.message}</p>
              )}
            </Col>
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>วันที่สอน</p>
              <Controller
                as={
                  <Select name="dateOfWeek">
                    {defaultValue.dateOfWeek &&
                      Object.entries(defaultValue.dateOfWeek).map(
                        ([value]) => (
                          <Select.Option key={value} value={value}>
                            {value}
                          </Select.Option>
                        )
                      )}
                  </Select>
                }
                name="dateOfWeek"
                control={control}
                defaultValue=""
              />
              {errors.dateOfWeek && (
                <p className="error-input">{errors.dateOfWeek.message}</p>
              )}
            </Col>
            <Col xl={4} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>เวลา(เริ่ม)</p>
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
            <Col xl={4} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>เวลา(จบ)</p>
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.subProfile}>
              <p>แนะนำคอร์ส</p>
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
          </Row>

          <Row align="center">
            <Button
              className="buttonColor backgroundOrange"
              size="large"
              shape="round"
              style={{ width: "7.5rem", marginTop: "3.7rem" }}
              htmlType="submit" >
              บันทึก
              </Button>
          </Row>
        </form>
      </div>
    </Fragment>
  );
}
