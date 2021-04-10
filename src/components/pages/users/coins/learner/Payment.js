import React, { Fragment } from "react";
import { Col, Row, Grid, Divider } from "antd";
import style from "../styles.module.scss";
import PaymentDetail from "./PaymentDetail";
import Header from "../../../../headerMobile/Header";
import Aboutcoin from "../learner/AboutCoin";
const { useBreakpoint } = Grid;

export default function Payment() {
  const screens = useBreakpoint();

  return (
    <Fragment>
      {(screens.xs || (screens.sm && !screens.md)) && (
        <Header pageBack="/coin" />
      )}
      {screens.xs || (screens.sm && !screens.md) ? (
        <Row className={style.body}>
          <Col xs={24} sm={24} md={11} lg={9} xl={8}>
            <PaymentDetail />
          </Col>
        </Row>
      ) : (
        <Row className={style.body}>
          <Col xs={24} sm={24} md={10} lg={9} xl={8}>
            <PaymentDetail />
          </Col>
          {screens.md && (
            <Col md={3} lg={2} xl={2}>
              <Divider
                type="vertical"
                style={{ height: "100%", marginLeft: "3rem" }}
              />
            </Col>
          )}
          <Col xs={24} sm={24} md={11} lg={13} xl={14}>
            <Aboutcoin />
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
