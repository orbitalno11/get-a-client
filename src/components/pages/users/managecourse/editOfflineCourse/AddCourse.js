import React, { Fragment } from "react";
import style from "../styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Row, Select, Grid } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseSchema } from "../../../../../validation/course/courseSchema";
import Header from "../../../../headerMobile/Header";
import { defaultValue } from "../../../../defaultValue/defaultValue";
import isMobile from "../../../../isMobile/isMobile"
const { useBreakpoint } = Grid;

export default function AddCourse() {
  const screens = useBreakpoint();

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = () => {
    // todo onSubmit
    // value
  } 

  return (
    <Fragment>
      {isMobile() && (
        <Header title="สร้างคอร์ส" pageBack="/tutor/course" />
      )}
      <div className={style.body}>
        <form id="addCourse" onSubmit={handleSubmit(onSubmit)}>
          {screens.md && (
            <Row justify="center">
              <span className={style.titleH2}>สร้างคอร์สเรียน </span>
            </Row>
          )}
          <Row
            className={style.paddingbody}
            justify="space-around"
            align="middle"
          >
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>ชื่อคอร์ส</p>
              <input
                className="input"
                type="namecourse"
                name="namecourse"
                ref={register}
              />
              {errors.namecourse && (
                <p className="error-input">{errors.namecourse.message}</p>
              )}
            </Col>
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>วิชา</p>
              <Controller
                as={
                  <Select name="subject">
                    {defaultValue.subject &&
                      Object.entries(defaultValue.subject).map(
                        ([key, value]) => (
                          <Select.Option key={value} value={value}>
                            {key}
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>ระดับชั้น</p>
              <Controller
                as={
                  <Select name="grade">
                    {defaultValue.grade &&
                      Object.entries(defaultValue.grade).map(([key, value]) => (
                        <Select.Option key={value} value={value}>
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
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>ประเภท</p>
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
                defaultValue=""
              />
              {errors.type && (
                <p className="error-input">{errors.type.message}</p>
              )}
            </Col>
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>วันที่สอน</p>
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
                defaultValue=""
              />
              {errors.dateOfWeek && (
                <p className="error-input">{errors.dateOfWeek.message}</p>
              )}
            </Col>
            <Col xl={4} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>เวลา(เริ่ม)</p>
              <input
                className="input"
                type="start"
                name="start"
                ref={register}
              />
              {errors.start && (
                <p className="error-input">{errors.start.message}</p>
              )}
            </Col>
            <Col xl={4} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>เวลา(จบ)</p>
              <input className="input" type="end" name="end" ref={register} />
              {errors.end && (
                <p className="error-input">{errors.end.message}</p>
              )}
            </Col>
            <Col xl={10} md={20} sm={20} xs={24} className={style.marginTop}>
              <p>ราคา (ต่อ 1 ชั่วโมง)</p>
              <input
                className="input"
                type="price"
                name="price"
                ref={register}
              />
              {errors.price && (
                <p className="error-input">{errors.price.message}</p>
              )}
            </Col>
            <Col
              xl={10}
              md={20}
              sm={20}
              xs={24}
              className={style.marginTop}
            ></Col>
            <Col
              xl={24}
              md={24}
              sm={20}
              xs={24}
              className={`${style.alignCenter}`}
            >
              <Button
                className="buttonColor backgroundOrange"
                size="large"
                shape="round"
                style={{ width: "7.5rem", marginTop: "3.7rem" }}
                htmlType="submit"
              >
                บันทึก
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Fragment>
  );
}
