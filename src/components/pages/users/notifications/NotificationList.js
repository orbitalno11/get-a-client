import React, { Fragment } from "react";
import { Typography, Grid, Col, Divider, Row } from "antd";
import style from "./styles.module.scss";
const { Link } = Typography;
const { useBreakpoint } = Grid;

export default function NotificationList() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div className={style.notify}>
          <Link to="/notification/0">
            <Row style={{ color: "black" }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <span className={style.titleH4}>การแจ้งเตือน</span>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                รายละเอียดการแจ้งเตือนคร่าวๆ
              </Col>
            </Row>
          </Link>
          <Divider type="horizontal" style={{ height: "100%" }} />
          <Link to="/notification/1">
            <Row style={{ color: "black" }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <span className={style.titleH4}>การแจ้งเตือน</span>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                รายละเอียดการแจ้งเตือนคร่าวๆ
              </Col>
            </Row>
          </Link>
          <Divider type="horizontal" style={{ height: "100%" }} />
        </div>
      ) : (
        <div className={style.notify}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className={style.titleH4}>การแจ้งเตือน</span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              รายละเอียดการแจ้งเตือนคร่าวๆ
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className={style.titleH4}>การแจ้งเตือน</span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              รายละเอียดการแจ้งเตือนคร่าวๆ
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className={style.titleH4}>การแจ้งเตือน</span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              รายละเอียดการแจ้งเตือนคร่าวๆ
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className={style.titleH4}>การแจ้งเตือน</span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              รายละเอียดการแจ้งเตือนคร่าวๆ
            </Col>
            <Divider type="horizontal" style={{ height: "100%" }} />
          </Row>
        </div>
      )}
    </Fragment>
  );
}
