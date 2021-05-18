import React, { Fragment } from "react";
import { Row, Grid, Col, Button,Divider } from "antd";
import style from "../../styles.module.scss";
import Header from "../../../../../headerMobile/Header";
import EditClipDeail from "./EditClipDeail";
import EditClipVDO from "./EditClipVDO";
import isMobile from "../../../../../isMobile/isMobile"

const { useBreakpoint } = Grid;

export default function EditClip() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {isMobile() && (
        <Header title="แก้ไขบทเรียน" pageBack="/tutor/online/{courseId}/video/{videoId}" />
      )}
      <Row className={style.body}>
        <Col xs={24} sm={24} md={12} lg={13} xl={11}>
          <EditClipDeail />
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
            <EditClipVDO/>
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
    </Fragment>
  );
}
