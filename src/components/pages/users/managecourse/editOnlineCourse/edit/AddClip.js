import React, { Fragment } from "react";
import { Row, Grid, Col, Button, Divider } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import { clipSchema } from "../../../../../../validation/course/clipSchema";
import AddClipVDO from "./AddClipVDO";
import isMobile from "../../../../../isMobile/isMobile"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const { useBreakpoint } = Grid;

export default function AddClip() {
  const screens = useBreakpoint();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(clipSchema),
  });

  const onSubmit = () => {
    // todo onSubmit
    // value
  } 

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>

        {isMobile() && (
          <Header title="เพิ่มบทเรียน" pageBack="/tutor/online" />
        )}
        <Row className={style.body}>
          <Col xs={24} sm={24} md={12} lg={13} xl={11}>
            {screens.md && (
              <Row>
                <span className={style.titleH2}>เพิ่มบทเรียน </span>
              </Row>
            )}
            <Row justify="space-between" align="middle">
              <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                <p>ชื่อคลิป</p>
                <input
                  className="input"
                  type="title"
                  name="title"
                  ref={register}
                />
                {errors.title && (
                  <p className="error-input">{errors.title.message}</p>
                )}
              </Col>
              <Col xl={24} md={24} sm={24} xs={24} className={style.marginTop}>
                <p>รายละเอียด</p>
                <input
                  className="input"
                  type="description"
                  name="description"
                  ref={register}
                  style={{ height: "15rem" }}
                />
                {errors.description && (
                  <p className="error-input">{errors.description.message}</p>
                )}
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
          <Col xs={24} sm={24} md={9} lg={8} xl={10}>
            <AddClipVDO />
          </Col>
          <Col xl={24} md={24} sm={20} xs={24} className={style.horizontalCenter}>
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
    </Fragment>
  );
}
