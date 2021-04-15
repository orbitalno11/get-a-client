import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "./styles.module.scss";
import Header from "../../../headerMobile/Header";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
const { useBreakpoint } = Grid;

export default function Notification() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header title="การแจ้งเตือน" />
      )}
      {screens.xs || (screens.sm && !screens.md) ? (
        <Row className={style.body}>
          <Col xs={24} sm={24} md={11} lg={9} xl={8}>
            <NotificationList />
          </Col>
        </Row>
      ) : (
        <Row className={style.body}>
          <Col xs={24} sm={24} md={11} lg={9} xl={8}>
            <NotificationList />
          </Col>
          {screens.md && (
            <Col lg={1} xl={2} md={1}>
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
          )}
          <Col xs={24} sm={24} md={12} lg={14} xl={14}>
            <NotificationDetail />
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
