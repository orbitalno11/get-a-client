import React, { Fragment } from "react";
import style from "../../styles.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Col, Row, Select, Grid } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseClipSchema } from "../../../../../../validation/course/courseClipSchema";
import { defaultValue } from "../../../../../defaultValue/defaultValue";
const { useBreakpoint } = Grid;

export default function CreateClipDetail() {
  const screens = useBreakpoint();

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(courseClipSchema),
  });

  const onSubmit = () => {
    // todo onSubmit
    // value
  } 
  
  return (
    <Fragment>
      <div>
        <form id="createOnlineCourse" onSubmit={handleSubmit(onSubmit)}>
          {screens.md && (
            <Row>
              <span className={style.titleH2}>สร้างคอร์สเรียน </span>
            </Row>
          )}
          <Row justify="space-between" align="middle">
            <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
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
            <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
              <p>ชั้นเรียน</p>
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
            <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
              <p>วิชา</p>
              <Controller
                as={
                  <Select name="subject">
                    {defaultValue.subject &&
                      Object.entries(defaultValue.subject).map(([key, value]) => (
                        <Select.Option key={value} value={value}>{key}
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
        </form>
      </div>
    </Fragment>
  );
}
