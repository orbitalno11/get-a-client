import React, { Fragment } from "react";
import { Grid, Col, Row } from "antd";
import style from "./styles.module.scss";
import Header from "../../../headerMobile/Header";
const { useBreakpoint } = Grid;

export default function NotificationDetail() {
  const screens = useBreakpoint();
  return (
    <Fragment>
      {screens.xs || (screens.sm && !screens.md) ? (
        <div>
            <Header pageBack="/notification" />
          <div className={style.body}>
            <div className={style.alignCennter}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <span className={style.titleH2}>การแจ้งเตือน</span>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
                  รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด{" "}
                  <br></br>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.alignCennter}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className={style.titleH2}>การแจ้งเตือน</span>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด รายละเอียด
              รายละเอียด รายละเอียด รายละเอียด รายละเอียด <br></br>
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
}
