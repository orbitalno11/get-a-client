import React, { Fragment } from "react";
import { Col, Row } from "antd";
import style from "./styles.module.scss";
import Header from "../../../headerMobile/Header";
import responseMobile from "../../../response/responseMobile";

export default function NotificationDetail() {

  return (
    <Fragment>
      {responseMobile() ? (
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
